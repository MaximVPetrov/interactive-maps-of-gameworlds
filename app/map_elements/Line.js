class Line {

	constructor() {
		this.firstPoint = new Point(0, 0);
		this.secondPoint = new Point(1, 1);
		this.colour = 'black';
		this.quests = [];
	}

	clone() {
		let line = new Line();
		line.colour = this.colour;
		line.firstPoint = this.firstPoint.clone();
		line.secondPoint = this.secondPoint.clone();
		for (let q of this.quests) {
			line.quests.push(q);
		}
		return line;
	}
	
	getPosition() {
		return this.firstPoint;
	}
	
	setPosition(newPos) {
		let v = newPos.clone().sub(this.firstPoint);
		this.move(v);
	}
	
	move(v) {
		this.firstPoint.move(v);
		this.secondPoint.move(v);
	}
	
	getTop() {
		return this.firstPoint.y > this.secondPoint.y ? this.firstPoint.y : this.secondPoint.y;
	}

	getBottom() {
		return this.firstPoint.y < this.secondPoint.y ? this.firstPoint.y : this.secondPoint.y;
	}

	getLeft() {
		return this.firstPoint.x < this.secondPoint.x ? this.firstPoint.x : this.secondPoint.x;
	}

	getRight() {
		return this.firstPoint.x > this.secondPoint.x ? this.firstPoint.x : this.secondPoint.x;
	}

	getWidth() {
		return this.getRight() - this.getLeft();
	}
	
	getHeight() {
		return this.getTop() - this.getBottom();
	}
	
	getTopLeft() {
		return new Point(this.getLeft(), this.getTop());
	}

	getBottomRight() {
		return new Point(this.getRight(), this.getBottom());
	}
	
	isActive() {
		return isActive(this.quests);
	}
	
	
	getLength() {
		return this.secondPoint.clone().sub(this.firstPoint).mag();
	}
	
	getLengthSq() {
		return this.secondPoint.clone().sub(this.firstPoint).magSq();
	}
}