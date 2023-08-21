// TODO: Отвязать от холста

class Camera {
	
	constructor(scale, aspectRatio) {
		this.aspectRatio = aspectRatio === undefined ? 16.0 / 9.0 : aspectRatio;
		this.position = new Point();
		this.halfWidth = scale === undefined ? 5.0 : scale * 0.5;
		this.halfHeight = this.halfWidth / this.aspectRatio;
	}

	setAspectRatio(aspectRatio) {
		this.aspectRatio = aspectRatio;
		this.halfHeight = this.halfWidth / this.aspectRatio;
	}

	getWidth() {
		return this.halfWidth * 2.0;
	}
	
	getHeight() {
		return this.halfHeight * 2.0;
	}
	
	getLeft() {
		return this.position.x - this.halfWidth;
	}

	getRight() {
		return this.position.x + this.halfWidth;
	}

	getTop() {
		return this.position.y + this.halfHeight;
	}
	
	getBottom() {
		return this.position.y - this.halfHeight;
	}

	getTopLeft() {
		return new Point(this.getLeft(), this.getTop());
	}
	
	getTopRight() {
		return new Point(this.getRight(), this.getTop());
	}

	getBottomLeft() {
		return new Point(this.getLeft(), this.getBottom());
	}

	getBottomRight() {
		return new Point(this.getRight(), this.getBottom());
	}
	
	getPosition() {
		return this.position;
	}
	
	setPosition(point) {
		this.position.x = point.x;
		this.position.y = point.y;
	}
	
	move(point) {
		this.position.add(point);
	}
	
	moveTo(point) {
		this.position.x = point.x;
		this.position.y = point.y;
	}

	setScale(value) {
		this.halfWidth = value / 2.0;
		this.halfHeight = this.halfWidth / this.aspectRatio;
	}
}