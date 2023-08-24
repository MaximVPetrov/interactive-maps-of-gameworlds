"use strict"

class Map {
	
	constructor() {
		this.clear();
	}
	
	clear () {
		this.points = [];
		this.substrates = [];
		this.tileFields = [];
		this.quests = [];
	}
	
	addPoint(p) {
		this.points.push(p);
	}
	
	addSubstrate(s) {
		this.substrates.push(s);
	}
	
	addTileField(tf) {
		this.tileFields.push(tf);
	}
	
	addQuest(q) {
		this.quests.push(q);
	}
}