class Area {}

	#position;	
	#halfWidth;
	#halfHeight;
	#visible;
	
	constructor() {
		this.#position = new Point();
		this.#halfWidth = 1;
		this.#halfHeight = 1;
		this.#visible = false;
		this.quests = [];
	}
	
	clone() {
		let area = new Area();
		area.position = this.#position.clone();
		area.#halfWidth = this.#halfWidth;
		area.#halfHeight = this.#halfHeight;
		for (const q of this.quests) {
			area.quests.push(q);
		}
		return area;
	}

	getPosition() {
		return this.#position;
	}

	setPosition(pos) {
		this.#position.set(pos);
	}
	
	move(v) {
		this.#position.move(v);
	}

	getTop() {
		return this.#position.y + this.#halfHeight;
	}

	getBottom() {
		return this.#position.y - this.#halfHeight;
	}

	getLeft() {
		return this.#position.x - this.#halfWidth;
	}
	
	getRight() {
		return this.#position.x + this.#halfWidth;
	}
	
	getWidth() {
		return this.#halfWidth * 2;
	}
	
	setWidth(w) {
		this.#halfWidth = w * 0.5;
	}

	getHeight() {
		return this.#halfHeight * 2;
	}
	
	setHeight(h) {
		this.#halfHeight = h * 0.5;
	}

	getTopLeft() {
		return new Point(this.getLeft(), this.getTop());
	}

	getBottomRight() {
		return new Point(this.getRight(), this.getBottom());
	}

	isActive() {
		return this.isActive(this.quests);
	}
	
	isVisible() {
		return this.#visible;
	}

	setVisible(b) {
		this.#visible = b;
	}
	
	addQuest(q) {
		let ind = this.quests.indexOf(q);
		if (ind < 0) return;
		this.quests.push(q);
	}
	
	removeQuest(q) {
		let ind = this.quests.indexOf(q);
		if (ind < 0) return;
		this.quests.splice(ind, 1);
	}
}