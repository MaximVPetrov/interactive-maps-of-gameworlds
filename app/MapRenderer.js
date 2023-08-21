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
	}
	
	setMap(newMap) {
		this.map = newMap;
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
	
	drawQuest(quest) {
	}
	
	drawQuests() {
		const ctx = this.context2d;
		ctx.font = '12px Serif';
		const quests = this.map.quests;
		for (let i = 0; i < quests.length; i++) {
			const q = quests[i];
			if (q.isLocked()) {
				ctx.fillStyle = '#a0a0a0';
			} else if (q.completed) {
				ctx.fillStyle =  '#40b040';
			} else {
				ctx.fillStyle =  '#000000';
			}
			ctx.fillText(q.description, 0, (i + 1) * this.textHeight);
		}
	}
	
	draw() {
		this.context2d.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.drawPoints();
		this.drawQuests();
	}
}