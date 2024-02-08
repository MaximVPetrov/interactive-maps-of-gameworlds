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
		
		this.locationMarkSize = 1.0; // world units
		
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

	drawLine(line) {
		const ctx = this.context2d;
		ctx.strokeStyle = line.colour;
		ctx.lineWidth = 2;
		let fp = this.viewport.toPixels(line.firstPoint);
		let sp = this.viewport.toPixels(line.secondPoint);
		ctx.beginPath();
		ctx.moveTo(fp.x, fp.y);
		ctx.lineTo(sp.x, sp.y);
		ctx.stroke();
	}
	
	drawLines() {
		for (let line of this.map.lines) {
			if (this.isBoxInView(line.getTopLeft(), line.getBottomRight())) {
				this.drawLine(line);
			}
		}		
	}

	drawConvexHull(h) {
		if (h.points < 3 || (!this.editorMode && !h.isActive())) return;
		// is hull in view
		let tl = new Point(Infinity, -Infinity);
		let br = new Point(-Infinity, Infinity);
		for (let p of h.points) {
			if (tl.x > p.x) {
				tl.x = p.x;
			}
			if (br.x < p.x) {
				br.x = p.x;
			}
			if (tl.y < p.y) {
				tl.y = p.y;
			}
			if (br.y > p.y) {
				br.y = p.y;
			}
		}
		if (this.isBoxInView(tl, br)) {
			const ctx = this.context2d;
			ctx.fillStyle = h.colour;
			let vpc = this.viewport.toPixels(h.points[0]);
			ctx.beginPath();
			ctx.moveTo(vpc.x, vpc.y);
			for (let i = 1; i < h.points.length; i++) {
				vpc = this.viewport.toPixels(h.points[i]);
				ctx.lineTo(vpc.x, vpc.y);
			}
			ctx.closePath();
			ctx.fill();
		}
	}
	
	drawConvexHulls() {
		this.context2d.globalAlpha = 0.5;
		for (let hull of this.map.convexHulls) {
			this.drawConvexHull(hull);
		}
		this.context2d.globalAlpha = 1.0;
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
				if (this.editorMode) {
					for (let tf of this.map.tileFields) {
						if (isAABBIntersects(imgtl, imgbr, tf.getTopLeft(), tf.getBottomRight())) {
							ctx.fillStyle = 'rgba(128, 128, 128, 0.5)';
							ctx.fillRect(imgtlpx.x, imgtlpx.y, imgbrpx.x - imgtlpx.x, imgbrpx.y - imgtlpx.y);
							break;
						}
					}
				}
			}
		
		}
	}

	drawTileField(tf) {
		if (this.editorMode || tf.isActive() || tf.quests.length == 0) {
			const cam = this.camera;
			const viewport = this.viewport;
			const ctx = this.context2d;
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
			const ptl = tf.getTopLeft();
			const pbr = tf.getBottomRight();
			if (this.isBoxInView(ptl, pbr)) {
				if (this.editorMode) {
					for (let sub of this.map.substrates) {
						if (isAABBIntersects(ptl, pbr, sub.getTopLeft(), sub.getBottomRight())) {
							this.context2d.globalAlpha = 0.62;
							break;
						}
					}
				}
				this.drawTileField(tf);
			}
		}
		this.context2d.globalAlpha = 1.0;
	}
	
	drawQuest(q) {
		const p = this.viewport.toPixels(q.position);
		const ctx = this.context2d;
		ctx.beginPath();
		ctx.arc(p.x, p.y, this.questMarkRadius, 0, 2 * Math.PI);
		ctx.fill();
		ctx.fillText(this.editorMode ? q.id : q.description, p.x, p.y - this.questTextOffset);
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
			// test section
			if ((!isNumberInRange(q.position.x, this.camera.getLeft(), this.camera.getRight()) || !isNumberInRange(q.position.y, this.camera.getBottom(), this.camera.getTop())) && !q.isLocked() && !q.completed) {
				let dir = q.position.clone().sub(this.camera.position);
				let edgePos = new Point();
				if (dir.x == 0) {
					edgePos.y = dir.y > 0 ? this.camera.halfHeight : -this.camera.halfHeight;
				} else {
					let a = dir.y / dir.x;
					if (dir.x > 0) {
						edgePos.y = a * this.camera.halfWidth;
					} else {
						edgePos.y = a * -this.camera.halfWidth;
					}
					if (dir.y > 0 && this.camera.halfHeight < edgePos.y) {
						edgePos.y = this.camera.halfHeight;
					}
					if (dir.y < 0 && -this.camera.halfHeight > edgePos.y) {
						edgePos.y = -this.camera.halfHeight;
					}
					if (dir.y > 0) {
						edgePos.x = this.camera.halfHeight / a;
					} else {
						edgePos.x = -this.camera.halfHeight / a;
					}
					if (dir.x > 0 && this.camera.halfWidth < edgePos.x) {
						edgePos.x = this.camera.halfWidth;
					}
					if (dir.x < 0 && -this.camera.halfWidth > edgePos.x) {
						edgePos.x = -this.camera.halfWidth;
					}
				}
				const p = this.viewport.toPixels(edgePos.clone().add(this.camera.position));
				ctx.fillStyle =  '#000000';
				ctx.beginPath();
				ctx.arc(p.x, p.y, this.viewport.getFramebufferWidth() / 100, 0, 2 * Math.PI);
				ctx.fill();
				//ctx.fillText(this.editorMode ? q.id : q.description, p.x, p.y - this.questTextOffset);
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
	
	drawLocation(loc, r) {
		const vp = this.viewport;
		const pos = vp.toPixels(loc.position);
		const ctx = this.context2d;
		ctx.beginPath();
		ctx.arc(pos.x, pos.y, r * vp.getPixelsPerUnit(), 0, 2 * Math.PI);
		ctx.stroke();
		ctx.fillText(loc.id, pos.x, pos.y);
	}
	
	drawLocations() {
		const ctx = this.context2d;
		ctx.fillStyle = '#000000';
		ctx.strokeStyle = '#ff0000';
		ctx.lineWidth = 2;
		ctx.font = '14px serif';
		ctx.textAlign = 'center';
		const locs = this.map.getLocations();
		const hs = this.locationMarkSize * 0.5;
		for (let loc of locs) {
			// locations
			if (this.isBoxInView(new Point(loc.position.x - hs, loc.position.y + hs), new Point(loc.position.x + hs, loc.position.y - hs))) {
				this.drawLocation(loc, hs);
			}
		}
	}
	
	drawPaths() {
		const vp = this.viewport;
		const ctx = this.context2d;
		const dirBothStyle = '#A0A0A0';
		const dirFromStyle = '#606060';
		const dirToStyle = '#E0E0E0';
		ctx.lineWidth = 2;
		const locs = this.map.getLocations();
		for (let loc of locs) {
			for (let p of loc.pathsTo) {
				if (this.isLineInView(p.from.position, p.to.position)) {
					const posFrom = vp.toPixels(p.from.position);
					const posTo = vp.toPixels(p.to.position);
					if (p.to.hasPathTo(loc)) {
						ctx.strokeStyle = dirBothStyle;
					} else {
						const grad = ctx.createLinearGradient(posFrom.x, posFrom.y, posTo.x, posTo.y);
						grad.addColorStop(0.0, dirFromStyle);
						grad.addColorStop(1.0, dirToStyle);
						ctx.strokeStyle = grad;
					}
					ctx.beginPath();
					ctx.moveTo(posFrom.x, posFrom.y);
					ctx.lineTo(posTo.x, posTo.y);
					ctx.stroke();
				}
			}
		}
	}
	
	#drawArea(area) {
		if (!this.isBoxInView(area.getTopLeft(), area.getBottomRight)) return;
		const pos = this.viewport.toPixels(area.getTopLeft());
		const width = this.viewport.getPixelsPerUnits(area.getWidth());
		const height = this.viewport.getPixelsPerUnits(area.getHeight());
		const ctx = this.context2d;
		if (!this.editorMode) {
			this.context2d.clearRect(pos.x, pos.y, width, height);
		} else {
			ctx.fillRect(pos.x, pos.y, width, height);
			ctx.strokeRect(pos.x, pos.y, width, height);
		}
	}
	
	#drawAreas() {
		const ctx = this.context2d;
		if (this.editorMode) {
			ctx.fillStyle = "gold";
			ctx.strokeStyle = "black";
		}
		for (const area of this.map.areas) {
			this.#drawArea(area);
		}
	}
	
	#drawNote(note) {
		const vp = this.viewport;
		const pos = vp.toPixels(note.getPosition());
		const ctx = this.context2d;
		ctx.beginPath();
		ctx.arc(pos.x, pos.y, note.getWidth() * 0.5 * vp.getPixelsPerUnit(), 0, 2 * Math.PI);
		ctx.stroke();
		ctx.fillText(note.title, pos.x, pos.y);
	}
	
	#drawNotes() {
		const ctx = this.context2d;
		ctx.fillStyle = 'black';
		ctx.strokeStyle = 'red';
		for (const note of this.map.notes) {
			this.#drawNote(note);
		}
	}
	
	draw() {
		this.context2d.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.drawSubstrates();
		this.drawTileFields();
		this.drawConvexHulls();
		this.drawLines();
		this.drawPoints();
		this.drawQuests();
		this.#drawAreas();
		if (this.editorMode) {
			this.drawChainOfQuests();
		}
		this.#drawNotes();
	}
}