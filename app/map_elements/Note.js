class Note {
	
	#radius;
	
	constructor() {
		this.title = "";
		this.message = "";
		this.position = new Point();
		this.#radius = 0.5;
	}
	
	clone() {
		const note = new Note();
		note.title = this.title;
		note.message = this.message;
		note.position.set(this.position);
		return note;
	}

	getPosition() {
		return this.position;
	}

	setPosition(p) {
		this.position.set(p);
	}
	
	move(v) {
		this.position.move(v);
	}

	getTop() {
		return this.position.y + this.#radius;
	}

	getBottom() {
		return this.position.y - this.#radius;
	}
	
	getLeft() {
		return this.position.x - this.#radius;
	}

	getRight() {
		return this.position.x + this.#radius;
	}

	getWidth() {
		return this.#radius * 2;
	}
	
	getHeight() {
		return this.#radius * 2;
	}

	getTopLeft() {
		return new Point(this.getLeft(), this.getTop());
	}

	getBottomRight() {
		return new Point(this.getRight(), this.getBottom());
	}

	isActive() {
		return true;
	}
}