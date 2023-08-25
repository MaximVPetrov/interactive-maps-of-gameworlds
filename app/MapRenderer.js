class MapRenderer {
	
	constructor(map, canvas) {
		this.canvas = canvas;
		this.camera = new Camera();
		this.viewport = new Viewport(canvas, this.camera);
		this.context2d = this.canvas.getContext("2d");
		this.map = map;
		
		this.context2d.font = '12px Serif';
		
		let metrics = this.context2d.measureText('Tg');
		this.textHeight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
		
		this.questMarkRadius = 4; // px
		this.questFont = '18px Serif'; 
		this.questTextOffset = 8;
		
		this.editorMode = false;
	}
	
	setMap(newMap) {
		this.map = newMap;
	}

	isLineInView(p1, p2) {
		let lxmin, lxmax;
		if (p1.x < p2.x) {
			lxmin = p1.x;
			lxmax = p2.x;
		} else {
			lxmin = p2.x;
			lxmax = p1.x;
		}
		let lymin, lymax;
		if (p1.y < p2.y) {
			lymin = p1.y;
			lymax = p2.y;
		} else {
			lymin = p2.y;
			lymax = p1.y;
		}
		let c = this.camera;
		return (isRangesIntersects(lxmin, lxmax, c.getLeft(), c.getRight()) && isRangesIntersects(lymin, lymax, c.getBottom(), c.getTop()));
	}

	isBoxInView(tl, br) {
		const c = this.camera;
		return (isRangesIntersects(tl.x, br.x, c.getLeft(), c.getRight()) && isRangesIntersects(br.y, tl.y, c.getBottom(), c.getTop()));
	}

	resizeViewport() {
		this.viewport.resize();
		this.draw();
	}

	drawPoint(p) {
		const halfSize = 8 * 0.5; // pixels
		const ppx = this.viewport.toPixels(p);
		this.context2d.fillRect(ppx.x - halfSize, ppx.y - halfSize, halfSize * 2, halfSize * 2);
	}
	
	drawPoints() {
		const color = "#00FF00";
		const ctx = this.context2d;
		ctx.fillStyle = color;
		const points = this.map.points;
		const cl = this.camera.getLeft();
		const cr = this.camera.getRight();
		const ct = this.camera.getTop();
		const cb = this.camera.getBottom();
		for (let p of points) {
			if (isNumberInRange(p.x, cl, cr) && isNumberInRange(p.y, cb, ct)) {
				this.drawPoint(p);
			}
		}
	}

	drawSubstrates() {
		const ctx = this.context2d;
		for (let substrate of this.map.substrates) {
			let imgtl = substrate.getTopLeft();
			let imgbr = substrate.getBottomRight();
			if (this.isBoxInView(imgtl, imgbr)) {
				let imgtlpx = this.viewport.toPixels(imgtl);
				let imgbrpx = this.viewport.toPixels(imgbr);
				ctx.drawImage(substrate.img, imgtlpx.x, imgtlpx.y, imgbrpx.x - imgtlpx.x, imgbrpx.y - imgtlpx.y);
				// debug
				ctx.fillStyle = 'rgba(128, 128, 128, 0.5)';
				ctx.fillRect(imgtlpx.x, imgtlpx.y, imgbrpx.x - imgtlpx.x, imgbrpx.y - imgtlpx.y);
			}
		
		}
	}

	drawTileField(tf) {
		if (this.editorMode || tf.isActive() || tf.quests.length == 0) {
			const cam = this.camera;
			const viewport = this.viewport;
			const ctx = this.context2d;
			ctx.globalAlpha = 0.7;
			const origin = viewport.toPixels(tf.getTopLeft());
			const size = tf.tileSize * viewport.getPixelsPerUnit();
			for (let i = 0; i < tf.numOfTilesY; i++) {
				for (let j = 0; j < tf.numOfTilesX; j++) {
					const tile = tf.getTile(j, i);
					if (tile !== undefined) {
						const left = origin.x + size * j;
						const top = origin.y + size * i;
						if (isRangesIntersects(left, left + size, 0, viewport.getFramebufferWidth) && isRangesIntersects(top, top + size, 0, viewport.getFramebufferHeight)) {
							ctx.drawImage(tile.img, left, top, size, size);
						}
					}
				}
			}
			ctx.globalAlpha = 1.0;
		}
	}
	
	drawTileFields() {
		for (const tf of this.map.tileFields) {
			if (this.isBoxInView(tf.getTopLeft(), tf.getBottomRight())) {
				this.drawTileField(tf);
			}
		}
	}
	
	drawQuest(q) {
		const p = this.viewport.toPixels(q.position);
		const ctx = this.context2d;
		ctx.beginPath();
		ctx.arc(p.x, p.y, this.questMarkRadius, 0, 2 * Math.PI);
		ctx.fill();
		ctx.fillText(q.description, p.x, p.y - this.questTextOffset);
	}
	
	drawQuests() {
		const ctx = this.context2d;
		ctx.textAlign = "center";
		ctx.font = this.questFont;
		const quests = this.map.quests;
		for (let i = 0; i < quests.length; i++) {
			const q = quests[i];
			const qPos = this.viewport.toPixels(q.position);
			
			const m = ctx.measureText(q.description);
			const halfWidth = m.width * 0.5;
			
			const left = qPos.x - halfWidth;
			const right = qPos.x + halfWidth;
			const top = qPos.y - this.questTextOffset - m.actualBoundingBoxAscent;
			const bottom = qPos.y + this.questMarkRadius;
			
			// y axis of framebuffer is opposite to y axis of world coordinates
			// in isAABBIntersects top should be bigger than bottom
			const qtl = new Point(left, bottom);
			const qbr = new Point(right, top);
			const vtl = new Point(0, this.viewport.getFramebufferHeight());
			const vbr = new Point(this.viewport.getFramebufferWidth(), 0);
			
			if (isAABBIntersects(qtl, qbr, vtl, vbr)) {
				if (this.editorMode) {
					ctx.fillStyle =  '#000000';
				} else if (q.isLocked()) {
					ctx.fillStyle = '#a0a0a0';
				} else if (q.completed) {
					ctx.fillStyle =  '#40b040';
				} else {
					ctx.fillStyle =  '#000000';
				}
				this.drawQuest(q);
			}
		}
	}
	
	drawChainOfQuests() {
		const cam = this.camera;
		const vp = this.viewport;
		const ctx = this.context2d;
		ctx.strokeStyle = 'rgba(0, 0, 200, 0.55)';
		ctx.lineWidth = 3;
		for (let tf of this.map.tileFields) {
			for (let q of tf.quests) {
				if (this.isLineInView(tf.position, q.position)) {
					ctx.beginPath();
					let tfPos = vp.toPixels(tf.position);
					let qPos = vp.toPixels(q.position);
					ctx.moveTo(tfPos.x, tfPos.y);
					ctx.lineTo(qPos.x, qPos.y);
					ctx.stroke();
				}
			}
		}
		const fromColor = 'rgba(50, 200, 50, 0.55)';
		const toColor = 'rgba(0, 50, 0, 0.55)';
		for (let q of this.map.quests) {
			for (let pq of q.questsToUnlock) {
				if (this.isLineInView(q.position, pq.position)) {
					let qPos = vp.toPixels(q.position);
					let pqPos = vp.toPixels(pq.position);
					const grad = ctx.createLinearGradient(pqPos.x, pqPos.y, qPos.x, qPos.y);
					grad.addColorStop(0.0, fromColor);
					grad.addColorStop(1.0, toColor);
					ctx.strokeStyle = grad;
					ctx.beginPath();
					ctx.moveTo(qPos.x, qPos.y);
					ctx.lineTo(pqPos.x, pqPos.y);
					ctx.stroke();
				}
			}
		}
	}
	
	draw() {
		this.context2d.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.drawPoints();
		this.drawSubstrates();
		this.drawTileFields();
		this.drawQuests();
		if (this.editorMode) {
			this.drawChainOfQuests();
		}
	}
}