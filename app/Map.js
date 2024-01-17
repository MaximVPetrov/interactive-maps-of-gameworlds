class Map {
	
	constructor() {
		this.clear();
	}
	
	clear () {
		this.points = [];
		this.convexHulls = [];
		this.substrates = [];
		this.tileFields = [];
		this.quests = [];
		this.routeMesh = new RouteMesh();
	}
	
	getLocations() {
		return this.routeMesh.getLocations();
	}
	
	addPoint(p) {
		this.points.push(p);
	}
	
	addConvexHull(h) {
		this.convexHulls.push(h);
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

	getQuest(id) {
		for (let q of this.quests) {
			if (q.id == id) {
				return q;
			}
		}
		return null;
	}
	
	addLocation(loc) {
		this.routeMesh.addLocation(loc);
	}
	
	addPath(p) {
		p.from.addPath(p);
	}
}