"use strict";

class Tile {

	constructor(imgUrl, description) {
		this.img = new Image();
		this.img.src = imgUrl;
		this.description = description;
	}
}

class TileSet {

	constructor() {
		this.tiles = [];
	}
	
	getTile(description) {
		for (let tile of this.tiles) {
			if (tile.description == description) {
				return tile;
			}
		}
	}
}

class TileField {

	constructor(x, y, pos, posy) {
		this.tiles = [];
		this.tileSize = 1.0;
		this.numOfTilesX = x === undefined ? 10 : x;
		this.numOfTilesY = y === undefined ? 10 : y;
		this.position = new Point();
		if (posy !== undefined) {
			this.position.x = pos;
			this.position.y = posy;
		} else if (pos !== undefined) {
			this.position.set(pos);
		}
		this.quests = [];
	}

	getWidth() {
		return this.tileSize * this.numOfTilesX;
	}

	getHalfWidth() {
		return this.getWidth() * 0.5;
	}
	
	getLeft() {
		return this.position.x - this.getHalfWidth();
	}
	
	getRight() {
		return this.position.x + this.getHalfWidth();
	}

	getHeight() {
		return this.tileSize * this.numOfTilesY;
	}

	getHalfHeight() {
		return this.getHeight() * 0.5;
	}
	
	getTop() {
		return this.position.y + this.getHalfHeight();
	}

	getBottom() {
		return this.position.y - this.getHalfHeight();
	}

	getTopLeft() {
		return new Point(this.getLeft(), this.getTop());
	}
	
	getBottomRight() {
		return new Point(this.getRight(), this.getBottom());
	}

	getTile(x, y) {
		return this.tiles[y * this.numOfTilesX + x];
	}
	
	setTile(x, y, tile) {
		this.tiles[y * this.numOfTilesX + x] = tile;
	}
	
	addTile(tile, times, x, y) {
		if (times === undefined) {
			this.tiles.push(tile);
			return;
		}
		if (y !== undefined) {
			this.setTile(x, y, tile);
		}
		for (let i = y !== undefined? 1 : 0; i < times; i++) {
			this.tiles.push(tile);
		}
	}
}