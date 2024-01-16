class ConvexHull {

	constructor() {
		this.points = [];
		this.colour = 'black';
		// TODO:
		this.points.push(new Point(-0.5, 0.5));
		this.points.push(new Point(-0.5, -0.5));
		this.points.push(new Point(0.5, -0.5));
		this.points.push(new Point(0.5, 0.5));
		this.move(new Point(-2, 15));
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

}