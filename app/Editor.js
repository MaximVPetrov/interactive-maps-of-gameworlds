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
	
	select(p, add) {
		if (!this.active) return false;
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
		// quests
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
				// tileSelector
				const tileSize = this.selected.tileSize * vp.getPixelsPerUnit();
				const ts = this.tileSelector;
				ctx.strokeRect(pos.x + tileSize * ts.x, pos.y + tileSize * ts.y, tileSize * ts.w, tileSize * ts.h); // selected tile contur
			}
		}
	}
	
}
