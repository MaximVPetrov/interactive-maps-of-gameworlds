const EditorModes = {
	MAIN: 'main',
	LOCATION_ADDING: 'locatoin adding',
	QUEST_ADDING: 'quest adding',
	SELECTED_EDIT: 'properties editor'
}

class Grid {
	constructor() {
		this.offset = new Point(0, 0);
		this.step = 1;
	}
	
	getNearestNode(p) {
		const cellsX = Math.round((p.x - this.offset.x) / this.step);
		const cellsY = Math.round((p.y - this.offset.y) / this.step);
		return new Point(this.offset.x + cellsX * this.step, this.offset.y + cellsY * this.step);
	}
	
	draw(mapRenderer) {
		const cam = mapRenderer.camera;
		const vp = mapRenderer.viewport;
		const ppu = vp.getPixelsPerUnit();
		// debug
		const cellDistX = (cam.getLeft() - this.offset.x) / this.step;
		const cellDistY = (cam.getTop() - this.offset.y) / this.step;
		let x = (Math.ceil(cellDistX) - cellDistX) * ppu;
		let y = (cellDistY - Math.floor(cellDistY)) * ppu;
		const step = this.step * ppu;
		const ctx = mapRenderer.context2d;
		ctx.strokeStyle = '#a0a0a0';
		ctx.lineWidth = 1;
		const width = vp.getFramebufferWidth();
		const height = vp.getFramebufferHeight();
		while (x < width) {
			ctx.beginPath();
			ctx.moveTo(x, 0);
			ctx.lineTo(x, height);
			ctx.stroke();
			x += step;
		}
		while (y < height) {
			ctx.beginPath();
			ctx.moveTo(0, y);
			ctx.lineTo(width, y);
			ctx.stroke();
			y += step;
		}
	}
}

class Editor {

	constructor(renderer) {
		this.active = false;
		this.renderer = renderer;
		this.selected = null;
		this.tileSelector = {
			tf: null,
			x: 0,
			y: 0,
			w: 1,
			h: 1
		};
		this.tileSet = this.createAndLoadTileSet();
		this.mode = EditorModes.MAIN;
		this.grid = new Grid();
		this.grid.offset.x = 0.5;
		this.grid.offset.y = 0.5;
		this.baseName = '';
		this.counter = 0;
	}

    createAndLoadTileSet() {
		const dir = 'img/tilesets/dw/';
		const ext = '.png'
		const tileNames = [
			'barrier',
			'brick',
			'bridge',
			'castle',
			'cave',
			'chest',
			'desert',
			'door',
			'dungeon',
			'grass',
			'hill',
			'king',
			'mountain',
			'seller',
			'stairs_down',
			'stairs_up',
			'swamp',
			'table',
			'trees',
			'village',
			'wall',
			'water'
		]
		const tileSet = new TileSet();
		const tiles = tileSet.tiles;
		for (const name of tileNames) {
			tiles.push(new Tile(dir + name + ext, name));
		}
		return tileSet;
	}
	
	activate() {
		this.active = true;
	}
	
	deactivate() {
		this.active = false;
	}
	
	setActive(v) {
		if (v) {
			this.activate();
		} else {
			this.deactivate();
		}
	}
	
	isActive() {
		return this.active;
	}
	
	changeMode(m) {
		if (this.isActive) {
			this.mode = m;
			if (m == EditorModes.SELECTED_EDIT) {
				if (this.selected instanceof Quest) {
					this.editQuest(this.selected);
				}
				this.changeMode(EditorModes.MAIN);
			}
		}
	}
	
	createQuest(pos) {
		const q = new Quest();
		q.id = prompt('id');
		q.description = prompt('description');
		q.position.set(this.grid.getNearestNode(pos));
		this.renderer.map.addQuest(q);
		this.selected = q;
	}
	
	editQuest(q) {
		q.id = prompt('id', q.id);
		q.description = prompt('description', q.description);
	}
	
	select(p, add) {
		if (!this.active) return false;
		// quests
		const qhs = this.renderer.camera.getWidth() / 100;
		for (let q of this.renderer.map.quests) {
			if (isNumberInRange(p.x, q.position.x - qhs, q.position.x + qhs) && isNumberInRange(p.y, q.position.y - qhs, q.position.y + qhs)) {
				this.selected = q;
				return true;
			}
		}
		// tile fields
		for (let tf of this.renderer.map.tileFields) {
			if (isNumberInRange(p.x, tf.getLeft(), tf.getRight()) && isNumberInRange(p.y, tf.getBottom(), tf.getTop())) {
				const ts = this.tileSelector;
				const relCur = (new Point(p)).sub(tf.getTopLeft());
				if (add && this.selected == tf) {
					const x = Math.floor(relCur.x / tf.tileSize);
					const y = Math.floor(-relCur.y / tf.tileSize);
					if (x < ts.x) {
						ts.w = ts.x - x + 1;
						ts.x = x;
					} else {
						ts.w = x - ts.x + 1;
					}
					if (y < ts.y) {
						ts.h = ts.y - y + 1;
						ts.y = y;
					} else {
						ts.h = y - ts.y + 1;
					}
				} else {
					this.selected = tf;
					ts.x = Math.floor(relCur.x / tf.tileSize);
					ts.y = Math.floor(-relCur.y / tf.tileSize);
					ts.w = 1;
					ts.h = 1;
				}
				return true;
			}
		}
		this.selected = null;
		return false;
	}
	
	move(v) {
	}
	
	setTile(ind) {
		const ts = this.tileSelector;
		if (this.selected instanceof TileField) {
			for (let i = ts.x; i < ts.x + ts.w; i++) {
				for (let j = ts.y; j < ts.y + ts.h; j++) {
					this.selected.setTile(i, j, this.tileSet.tiles[ind]);
				}
			}
		}
	}
	
	click(pos, mod) {
		if (this.isActive()) {
			switch (this.mode) {
				case EditorModes.MAIN:
					this.select(pos, mod);
					break;
				case EditorModes.LOCATION_ADDING:
					this.counter++;
					let loc = new Location();
					loc.id = this.baseName + this.counter;
					loc.position.set(this.grid.getNearestNode(pos));
					if (this.selected instanceof Location) {
						let p = new Path();
						p.from = this.selected;
						p.to = loc;
						p.distance = this.selected.position.clone().sub(loc.position).mag();
						this.selected.addPath(p);
						p = new Path();
						p.from = loc;
						p.to = this.selected;
						p.distance = this.selected.position.clone().sub(loc.position).mag();
						loc.addPath(p);
					}
					this.renderer.map.addLocation(loc);
					this.selected = loc;
					break;
				case EditorModes.QUEST_ADDING:
					this.createQuest(pos);
					break;
			}
		}
	}
	
	draw() {
		if (this.active) {
			const vp = this.renderer.viewport;
			const ctx = vp.canvas.getContext('2d');
			this.grid.draw(this.renderer);
			this.renderer.drawPaths();
			this.renderer.drawLocations();
			// selector
			if (this.selected && this.selected instanceof TileField) {
				ctx.fillStyle = 'rgba(0, 0, 255, 0.3)';
				ctx.strokeStyle = '#000';
				const pos = vp.toPixels(this.selected.getTopLeft());
				const width = this.selected.getWidth() * vp.getPixelsPerUnit();
				const height = this.selected.getHeight() * vp.getPixelsPerUnit();
				ctx.fillRect(pos.x, pos.y, width, height);
				ctx.strokeRect(pos.x, pos.y, width, height);
				// tileSelector
				const tileSize = this.selected.tileSize * vp.getPixelsPerUnit();
				const ts = this.tileSelector;
				ctx.strokeRect(pos.x + tileSize * ts.x, pos.y + tileSize * ts.y, tileSize * ts.w, tileSize * ts.h); // selected tile contur
			}
			// instruction and mode
			ctx.color = '#000000';
			ctx.font = '18px serif';
			ctx.textAlign = 'left';
			ctx.fillText('Mode: ' + this.mode, 10, 50);
			ctx.fillText('1 - quest', 10, this.renderer.viewport.getFramebufferHeight() - 40);
		}
	}
	
}
