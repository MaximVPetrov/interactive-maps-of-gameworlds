class Editor {
	
	constructor(renderer) {
		this.active = false;
		this.renderer = renderer;
		this.selected = null;
		this.tileSelector = {
			tf: null,
			x: 0,
			y: 0,
			w: 0,
			h: 0
		};
		this.tileSet = this.createAndLoadTileSet();
	}

    createAndLoadTileSet() {
		const dir = 'img/tilesets/dw/';
		const ext = '.png'
		const tileNames = [
			'brick',
			'bridge',
			'castle',
			'chest',
			'desert',
			'door',
			'grass',
			'hill',
			'king',
			'mountain',
			'stairs',
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
	
	select(p) {
		if (!this.active) return false;
		// tile fields
		for (let tf of this.renderer.map.tileFields) {
			if (isNumberInRange(p.x, tf.getLeft(), tf.getRight()) && isNumberInRange(p.y, tf.getBottom(), tf.getTop())) {
				this.selected = tf;
				const ts = this.tileSelector;
				const relCur = (new Point(p)).sub(tf.getTopLeft());
				ts.x = Math.floor(relCur.x / tf.tileSize);
				ts.y = Math.floor(-relCur.y / tf.tileSize);
				return true;
			}
		}
		// quests
		this.selected = null;
		return false;
	}
	
	move(v) {
	}
	
	setTile(ind) {
		if (this.selected instanceof TileField) {
			this.selected.setTile(this.tileSelector.x, this.tileSelector.y, this.tileSet.tiles[ind]);
		}
	}
	
	draw() {
		if (this.active) {
			const vp = this.renderer.viewport;
			const ctx = vp.canvas.getContext('2d');
			if (this.selected) {
				ctx.fillStyle = 'rgba(0, 0, 255, 0.3)';
				ctx.strokeStyle = '#000';
				const pos = vp.toPixels(this.selected.getTopLeft());
				const width = this.selected.getWidth() * vp.getPixelsPerUnit();
				const height = this.selected.getHeight() * vp.getPixelsPerUnit();
				ctx.fillRect(pos.x, pos.y, width, height);
				ctx.strokeRect(pos.x, pos.y, width, height);
				const tileSize = this.selected.tileSize * vp.getPixelsPerUnit();
				ctx.strokeRect(pos.x + tileSize * this.tileSelector.x, pos.y + tileSize * this.tileSelector.y, tileSize, tileSize); // selected tile contur
			}
		}
	}
	
}
