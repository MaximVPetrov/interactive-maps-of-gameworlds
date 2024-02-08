class Substrate {

	constructor(img, w, h, pos, posy) {
		this.position = new Point();
		if (posy !== undefined) {
			this.position.x = pos;
			this.position.y = posy;
		} else if (pos !== undefined) {
			this.position.set(pos);
		}
		this.halfWidth = w !== undefined ? w * 0.5 : 1.0;
		this.halfHeight = h !== undefined ? h * 0.5 : 1.0;
		this.img = new Image();
		this.img.src = img !== undefined ? img : '';
	}

	getWidth () {
		return this.halfWidth * 2.0;
	}
	
	setWidth(value) {
		this.halfWidth = value * 0.5;
	}

	getHeight () {
		return this.halfHeight * 2.0;
	}
	
	setHeight(value) {
		this.halfHeight = value * 0.5;
	}

	getLeft () {
		return this.position.x - this.halfWidth;
	}
	
	getRight () {
		return this.position.x + this.halfWidth;
	}
	
	getTop () {
		return this.position.y + this.halfHeight;
	}
	
	getBottom () {
		return this.position.y - this.halfHeight;
	}
	
	getTopLeft () {
		return new Point(this.getLeft(), this.getTop());
	}
	
	getTopRight () {
		return new Point(this.getRight(), this.getTop());
	}
	
	getBottomLeft () {
		return new Point(this.getLeft(), this.getBottom());
	}
	
	getBottomRight () {
		return new Point(this.getRight(), this.getBottom());
	}
	
	getPosition () {
		return this.position;
	}

	setPosition (point) {
		this.position.x = point.x;
		this.position.y = point.y;
	}
	
	move (point) {
		this.position.add(point);
	}
	
	moveTo (point) {
		this.position.x = point.x;
		this.position.y = point.y;
	}
}