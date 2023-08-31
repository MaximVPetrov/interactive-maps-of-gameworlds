class Guide {
	constructor(mapRenderer) {
		this.renderer = mapRenderer;
		this.navFrom = new Point();
		this.navTo = new Point();
		this.target = null;
	}

	drawTrail() {
		const vp = this.renderer.viewport;
		const ctx = this.renderer.context2d;
		ctx.strokeStyle = '#2020C0';
		ctx.lineWidth = 5;
		const locs = this.renderer.map.routeMesh.getTrail(this.navFrom, this.navTo);
		if (locs.length == 0) {
			return;
		}
		ctx.beginPath();
		let pos = vp.toPixels(locs[0].position);
		ctx.moveTo(pos.x, pos.y);
		for (let p of locs) {
			pos = vp.toPixels(p.position);
			ctx.lineTo(pos.x, pos.y);
		}
		ctx.stroke();
	}
	
	draw() {
		/*this.drawPoints();
		this.drawSubstrates();
		this.drawTileFields();
		this.drawQuests();*/
		this.drawTrail();
	}
	
	click(mp) {
		const renderer = this.renderer;
		const viewport = renderer.viewport;
		const quests = renderer.map.quests;
		const maxDist = renderer.camera.getWidth() / 100;
		for (const q of quests) {
			const dist = q.position.clone().sub(mp).mag();
			if (dist < maxDist && q.isActive()) {
				if (this.target != q) {
					this.target = q;
					this.navTo = q.position;
				} else {
					q.completed = true;
					this.navFrom = this.navTo;
					this.target = null;
					break;
				}
			}
		}		
	}
}