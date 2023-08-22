"use strict"

class Map {
	
	constructor() {
		this.clear();
	}
	
	clear () {
		this.points = [];
		this.tileFields = [];
		this.quests = [];
	}
	
	addPoint(p) {
		this.points.push(p);
	}
	
	addTileField(tf) {
		this.tileFields.push(tf);
	}
	
	addQuest(q) {
		this.quests.push(q);
	}
}