class UserInputHandler {
	
	constructor(mapRenderer, guide, editor, gui, draw) {
		this.mapRenderer = null;
		if (mapRenderer !== undefined) this.mapRenderer = mapRenderer;
		this.guide = guide;
		this.editor = editor;
		this.gui = gui;
		this.draw = draw;
		this.mouseButtonPressed = -1;
	}

	mouseClick(event) {
	}
	
	mouseDown(event) {
		this.mouseButtonPressed = event.button;

		const renderer = this.mapRenderer;
		const viewport = renderer.viewport;

		const mx = event.offsetX;
		const my = event.offsetY;
		const mp = new Point(mx, my);
		const mwp = viewport.toWorldCoordinates(mp);
		
		if (!this.gui.click(mx, my)) {
			if (!editor.active) {
				guide.click(mwp);
			}
		}
		editor.click(mwp, event.shiftKey);
				
		this.draw();
		
		// TODO: debug
		console.log('Mouse Down: (' + mwp.x + '; ' + mwp.y + ')');
	}
	
	mouseUp(event) {
		this.mouseButtonPressed = -1;

		const renderer = this.mapRenderer;
		const viewport = renderer.viewport;

		const mx = event.offsetX;
		const my = event.offsetY;
		const mp = new Point(mx, my);
		const mwp = viewport.toWorldCoordinates(mp);

		editor.pointerUp(mwp);
		
		this.draw();
		console.log("Mouse Up");
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
				if (!this.editor.move(new Point(mx, -my))) {
					cam.move(new Point(-mx, my));
				}
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
			case 'Digit1':
				this.editor.changeMode(EditorModes.QUEST_ADDING);
				break;
			case 'Digit2':
				this.editor.createConvexHull();
				break;
			case 'Escape':
				this.editor.changeMode(EditorModes.MAIN);
				break;
			case 'KeyA':
				this.editor.createArea();
				break;
			case 'KeyE':
				this.editor.editSelected();
				this.editor.changeMode(EditorModes.SELECTED_EDIT);
				break;
			case 'KeyC':
				this.editor.cloneSelected();
				break;
			case 'KeyD':
				this.editor.deleteSelected();
				break;
			case 'KeyL':
				this.editor.createLine();
				break;
			case 'KeyM':
				this.editor.setMultipleSelection(!this.editor.multipleSelection);
				break;
			case 'KeyN':
				this.editor.createNote();
				break;
			case 'KeyQ':
				this.editor.createQuest();
				break;
		}
		
		this.draw();
		// debug
		console.log('Key is pressed; Code: ' + event.code);
	}

	keyUp(event) {
	}
	
	keyPress(event) {
		const cam = this.mapRenderer.camera;
		
		// debug
		console.log('Key pressed: ' + event.code + ' : ' + event.key);
	}
	
}