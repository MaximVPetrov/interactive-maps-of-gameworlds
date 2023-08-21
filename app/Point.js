class Point {
	
	constructor(x, y) {
		this.x = x === undefined ? 0 : x;
		this.y = y === undefined ? 0 : y;
	}

	set(point) {
		this.x = point.x;
		this.y = point.y;
	}

	add(point) {
		this.x += point.x;
		this.y += point.y;
		return this;
	}

	sub(point) {
		this.x -= point.x;
		this.y -= point.y;
		return this;
	}

	mag() {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}

	nor() {
		const mag = this.mag();
		this.x /= mag;
		this.y /= mag;
		return this;
	}
	
	dot(vectorB) {
		return this.x * vectorB.x + this.y * vectorB.y;
	}
	
	ortho() {
		var x = this.x;
		this.x = -this.y;
		this.y = x;
		return this;
	}
	
	rev() {
		this.x = -this.x;
		this.y = -this.y;
		return this;
	}
	
	move(point) {
		this.add(point);
	}
	
	snapToGrid(gridStep) {
		this.x = Math.round(this.x / gridStep) * gridStep;
		this.y = Math.round(this.y / gridStep) * gridStep;
	}
}