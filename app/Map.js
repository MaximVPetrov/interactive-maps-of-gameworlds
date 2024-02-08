function addObjectToList(list, obj) {
	if (list.indexOf(obj) != -1) return;
	list.push(obj);	
}

function removeObjectFromList(list, obj) {
	const ind = list.indexOf(obj);
	if (ind < 0) return;
	list.splice(ind, 1);
}

class Map {
	
	notes;
		
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
		this.areas = [];
		this.notes = [];
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
	
	addArea(a) {
		if (this.areas.indexOf(a) != -1) return;
		this.areas.push(a);
	}
	
	removeArea(a) {
		const ind = this.areas.indexOf(a);
		if (ind < 0) return;
		this.areas.splice(ind, 1);
	}
	
	addNote(n) {
		addObjectToList(this.notes, n);
	}
	
	removeNote(n) {
		removeObjectFromList(this.notes, n);
	}
}