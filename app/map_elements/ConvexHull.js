class ConvexHull {

	constructor() {
		this.points = [];
		this.colour = 'black';
	}

	getTopLeft() {
		let tl = new Point(Infinity, -Infinity);
		for (let p of this.points) {
			if (tl.x > p.x) {
				tl.x = p.x;
			}
			if (tl.y < p.y) {
				tl.y = p.y;
			}
		}
		return tl;
	}
	
	getBottomRight() {
		let br = new Point(-Infinity, Infinity);
		for (let p of this.points) {
			if (br.x < p.x) {
				br.x = p.x;
			}
			if (br.y > p.y) {
				br.y = p.y;
			}
		}
		return br;
	}

	move(point) {
		for (let p of this.points) {
			p.move(point);
		}
	}
	
	clone() {
		let hull = new ConvexHull;
		hull.colour = this.colour;
		for (let p of this.points) {
			hull.points.push(p.clone());
		}
		return hull;
	}

}