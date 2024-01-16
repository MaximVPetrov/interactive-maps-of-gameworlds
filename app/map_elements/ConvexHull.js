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

	move(point) {
		for (let p of this.points) {
			p.move(point);
		}
	}

}