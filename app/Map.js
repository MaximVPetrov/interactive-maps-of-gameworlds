class Map {
	
	constructor() {
		this.clear();
	}
	
	clear () {
		this.points = [];
		this.lines = [];
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
	
	addLine(line) {
		this.lines.push(line);
	}
	
	removeLine(line) {
		const i = this.lines.indexOf(line);
		if (i > -1) {
			this.lines.splice(i, 1);
		}
	}
	
	addConvexHull(h) {
		this.convexHulls.push(h);
	}

	removeConvexHull(h) {
		const i = this.convexHulls.indexOf(h);
		if (i > -1) {
			this.convexHulls.splice(i, 1);
		}
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
	
	removeQuest(q) {
		const i = this.quests.indexOf(q);
		if (i > -1) {
			this.quests.splice(i, 1);
		}
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