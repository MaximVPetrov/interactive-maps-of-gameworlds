class MapRenderer {
	
	constructor(map, canvas) {
		this.canvas = canvas;
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
		this.canvas.width = this.canvas.clientWidth;
		this.canvas.height = this.canvas.clientHeight;
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
		this.drawQuests();
	}
}