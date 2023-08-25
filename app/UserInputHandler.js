"use strict";

class UserInputHandler {
	
	constructor(mapRenderer, editor, gui, draw) {
		this.mapRenderer = null;
		if (mapRenderer !== undefined) this.mapRenderer = mapRenderer;
		this.editor = editor;
		this.gui = gui;
		this.draw = draw;
		this.mouseButtonPressed = -1;
	}

	mouseClick(event) {
		const renderer = this.mapRenderer;
		const viewport = renderer.viewport;

		const mx = event.offsetX;
		const my = event.offsetY;
		const mp = new Point(mx, my);
		
		if (!this.gui.click(mx, my)) editor.select(viewport.toWorldCoordinates(mp), event.shiftKey);
		
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
		
		
		
		this.draw();
		
		// debug
		const mw = renderer.viewport.toWorldCoordinates(new Point(mx, my));
		console.log('Click: (' + mw.x + '; ' + mw.y + ')');
	}
	
	mouseDown(event) {
		this.mouseButtonPressed = event.button;
	}
	
	mouseUp(event) {
		this.mouseButtonPressed = -1;
	}
	
	mouseMove(event) {
		if (this.mouseButtonPressed == 0) {
			if (this.gui.drag(event.offsetX, event.offsetY, event.movementX, event.movementY)) {
				this.draw();
			} else {
				const renderer = this.mapRenderer;
				const vp = renderer.viewport;
				const cam = renderer.camera;
				const mx = event.movementX / vp.getPixelsPerUnit();
				const my = event.movementY / vp.getPixelsPerUnit();
				cam.move(new Point(-mx, my));
				this.draw();
			}
		}
	}
	
	mouseWheel(event) {
		const renderer = this.mapRenderer;
		const cam = renderer.camera;
		const mx = event.offsetX;
		const my = event.offsetY;
		const mp = new Point(mx, my);
		const wp = renderer.viewport.toWorldCoordinates(mp);
		const relx = (wp.x - cam.position.x) / cam.getWidth();
		const rely = (wp.y - cam.position.y) / cam.getHeight();
		if (event.deltaY > 0) {
			cam.zoomOut();
		} else {
			cam.zoomIn();
		}
		const newx = relx * cam.getWidth() + cam.position.x;
		const newy = rely * cam.getHeight() + cam.position.y;
		cam.move(new Point(wp.x - newx, wp.y - newy));
		this.draw();
	}

	keyDown(event) {
		const cam = this.mapRenderer.camera;
		switch (event.code) {
			case 'ArrowLeft':
				cam.move(new Point(-1, 0));
				break;
			case 'ArrowRight':
				cam.move(new Point(1, 0));
				break;
			case 'ArrowUp':
				cam.move(new Point(0, 1));
				break;
			case 'ArrowDown':
				cam.move(new Point(0, -1));
				break;
		}
		
		this.draw();
	}

	keyUp(event) {
	}
	
	keyPress(event) {
		const cam = this.mapRenderer.camera;
		
		// debug
		console.log('Key pressed: ' + event.code + ' : ' + event.key);
	}
	
}