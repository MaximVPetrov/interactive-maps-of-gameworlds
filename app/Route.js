class Location {
	constructor() {
		this.id = '';
		this.position = new Point();
		this.pathsTo = [];
	}
	
	addPath(p) {
		if (p.from != this) {
			console.error('Incorrect path: location - "' + this.id + '"; path from - "' + p.from.id + '"');
			return;
		}
		if (this.hasPathTo(p.to)) {
			console.error('Duplicate path from "' + this.id + '" to "' + p.to.id + '"');
			return;
		}
		this.pathsTo.push(p);
	}
	
	hasPathTo(loc) {
		for (let path of this.pathsTo) {
			if (path.to === loc) {
				return true;
			}
		}
		return false;
	}
}

class Path {
	constructor() {
		this.from = null;
		this.to = null;
		this.distance = -1;
	}
}

class Scout {
	constructor(route) {
		this.route = route;
		
		this.minDist = Infinity;
		this.curDist = 0;
		this.depLoc = null;
		this.destLoc = null;
		this.curPath = null;
		this.minTrail = null;
		this.curTrail = null;
	}
	
	getAlternativePath() {
		const loc = this.curPath.from;
		for (let i = 0; i < loc.pathsTo.length - 1; i++) {
			if (loc.pathsTo[i] === this.curPath) {
				return loc.pathsTo[i + 1];
			}
		}
		return null;
	}
	
	isPreviouslyVisited() {
		for (let p of this.curTrail) {
			if (p.from == this.curPath.to) {
				return true;
			}
		}
		return false;
	}
		
	moveForward() {
		this.curPath = this.curPath.to.pathsTo[0];
		this.curTrail.push(this.curPath);
		this.curDist += this.curPath.distance;
	}
	
	moveBackward() {
		if (this.curPath != null) {
			this.curDist -= this.curPath.distance;
			this.curTrail.pop();
		}
		this.curPath = this.curTrail[this.curTrail.length - 1];
	}
	
	moveAlternative() {
		this.curDist -= this.curPath.distance;
		this.curTrail.pop();
		this.curPath = this.getAlternativePath();
		if (this.curPath != null) {
			this.curTrail.push(this.curPath);
			this.curDist += this.curPath.distance;
		}
	}
	
	findTrail(locFrom, locTo) {
		if (locFrom == null || locTo == null) {
			return [];
		}
		if (locFrom.pathsTo.length == 0 || locFrom === locTo) {
			return [ locFrom ];
		}
		this.depLoc = locFrom;
		this.destLoc = locTo;
		this.curPath = locFrom.pathsTo[0];
		this.minTrail = [];
		this.curTrail = [ this.curPath ];
		this.minDist = Infinity;
		this.curDist = this.curPath.distance;
		while (true) {
			if (this.curPath == null) {
				if (this.curTrail.length == 0) {
					break;
				} else {
					this.moveBackward();
					this.moveAlternative();
					continue;
				}
			}
			if (this.curDist > this.minDist) {
				//this.moveBackward();
				this.moveAlternative();
				continue;
			}
			if (this.curPath.to == this.destLoc) {
				this.minDist = this.curDist;
				this.minTrail = this.curTrail.slice();
				//this.moveBackward();
				this.moveAlternative();
				continue;
			}
			if (this.curPath.to.pathsTo.length == 0) {
				this.moveAlternative();
				continue;
			}
			if (this.isPreviouslyVisited()) {
				this.moveAlternative();
				continue;
			}
			this.moveForward();
		}
		const res = [ this.depLoc ];
		for (let p of this.minTrail) {
			res.push(p.to);
		}
		return res;
	}
}

class RouteMesh {
	constructor() {
		this.locations = [];
		this.scout = new Scout(this);
	}
	
	getLocations() {
		return this.locations;
	}
	
	getLocation(id) {
		for (let loc of this.locations) {
			if (loc.id == id) {
				return loc;
			}
		}
		console.error('Unable to find location "' + id + '"');
		return null;
	}
	
	addLocation(loc) {
		for (let pl of this.locations) {
			if (pl.id == loc.id) {
				console.error('Duplicate location idetifiers: ' + loc.id);
				break;
			}
		}
		this.locations.push(loc);
	}
	
	addPath() {
	}
	
	getNearestLocation(point) {
		let minDist = Infinity;
		let nearLoc = null;
		for (let loc of this.locations) {
			const dist = point.clone().sub(loc.position).magSq();
			if (dist < minDist) {
				minDist = dist;
				nearLoc = loc;
			}
		}
		return nearLoc;
	}
	
	step(trail, currentLocation, distance, destination) {
	}
	
	getTrail(from, to) {
		let locFrom = this.getNearestLocation(from);
		let locTo = this.getNearestLocation(to);
		return this.scout.findTrail(locFrom, locTo);
	}
}