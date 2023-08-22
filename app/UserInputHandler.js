"use strict"

class UserInputHandler {
	
	constructor(mapRenderer) {
		this.mapRenderer = null;
		if (mapRenderer !== undefined) this.mapRenderer = mapRenderer;
	}

	mouseClick(event) {
		const renderer = this.mapRenderer;
		const viewport = renderer.viewport;

		const mx = event.offsetX;
		const my = event.offsetY;
		const mp = new Point(mx, my);
		
		const quests = renderer.map.quests;
		const maxDist = viewport.getFramebufferWidth() / 100;
		for (const q of quests) {
			const qp = viewport.toPixels(q.position);
			const dist = (new Point(qp)).sub(mp).mag();
			if (dist < maxDist && q.isActive()) {
				q.completed = true;
				break;
			}
		}
		
		renderer.draw();
		
		// debug
		const mw = renderer.viewport.toWorldCoordinates(new Point(mx, my));
		console.log('Click: (' + mw.x + '; ' + mw.y + ')');
	}
	
}