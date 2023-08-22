"use strict"

class Map {
	
	constructor() {
		this.clear();
	}
	
	clear () {
		this.points = [];
		this.quests = [];
	}
	
	addPoint(p) {
		this.points.push(p);
	}
	
	addQuest(q) {
		this.quests.push(q);
	}
}