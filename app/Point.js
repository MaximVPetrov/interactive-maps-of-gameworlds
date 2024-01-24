"use strict";

class Point {
	
	constructor(x, y) {
		if (y === undefined) {
			if (x === undefined) {
				this.x = 0;
				this.y = 0;
			} else {
				this.x = x.x;
				this.y = x.y;
			}
		} else {
			this.x = x;
			this.y = y;
		}
	}
	
	clone() {
		return new Point(this);
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
	
	magSq() {
		return this.x * this.x + this.y * this.y;
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
	
	dist(point) {
		return this.clone().sub(point).mag();
	}

	distSq(point) {
		return this.clone().sub(point).magSq();
	}
	
	snapToGrid(gridStep) {
		this.x = Math.round(this.x / gridStep) * gridStep;
		this.y = Math.round(this.y / gridStep) * gridStep;
	}
}