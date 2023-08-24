class Label {
	draw() {
	}
}

class Button {
	constructor(text, onPress) {
		this.background = '#c0c0c0';
		this.color = '#000000';
		this.font = '12px serif';
		this.padding = 1;
		this.x = 0;
		this.y = 0;
		this.width = 100;
		this.height = 25;
		this.text = text === undefined ? '' : text;
		this.visible = true;
		this.onPress = onPress;
	}
	
	click(x, y) {
		this.onPress();
	}
	
	draw(context) {
		if (this.visible) {
			context.fillStyle = this.background;
			context.fillRect(this.x, this.y, this.width, this.height);
			context.strokeStyle = this.color;
			context.strokeRect(this.x, this.y, this.width, this.height);
			context.font = this.font;
			context.textAlign = 'left';
			context.fillStyle = this.color;
			const meas = context.measureText(this.text);
			context.fillText(this.text, this.x + this.padding, this.y + this.height - meas.fontBoundingBoxDescent - this.padding);
		}
	}
}

class ImageList {
	constructor(images, onPress, x, y) {
		this.color = '#ffffff';
		this.x = x === undefined ? 0 : x;
		this.y = y === undefined ? 0 : y;
		this.width = 100;
		this.imgHeight = this.width;
		this.height = 250;
		this.offset = 0;
		this.images = images;
		this.visible = true;
		this.onPress = onPress;
	}

	getFullHeight() {
		return this.images.length * this.imgHeight;
	}
	
	click(x, y) {
		let ind = Math.floor((y - this.y + this.offset) / this.imgHeight);
		this.onPress(ind);
	}
	
	drag(x, y, dx, dy) {
		this.offset -= dy;
		if (this.offset < 0 ) {
			this.offset = 0;
		} else {
			const maxOffset = this.getFullHeight() - this.height + this.imgHeight;
			if (this.offset > maxOffset) {
				this.offset = maxOffset;
			}
		}
	}
	
	draw(context) {
		if (this.visible) {
			context.save();
			context.fillStyle = this.color;
			context.beginPath();
			context.moveTo(this.x, this.y);
			context.lineTo(this.x + this.width, this.y);
			context.lineTo(this.x + this.width, this.y + this.height);
			context.lineTo(this.x, this.y + this.height);
			context.lineTo(this.x, this.y);
			context.clip();
			for (let i = 0; i < this.images.length; i++) {
				const relY = i * this.imgHeight - this.offset;
				if (isRangesIntersects(relY, relY + this.imgHeight, 0, this.height)) {
					const img = this.images[i];
					context.drawImage(img, this.x, this.y + relY, this.width, this.imgHeight);
				}
			}
			context.strokeStyle = '#000000';
			context.strokeRect(this.x, this.y, this.width, this.height);
			context.restore();
		}
	}
}

class LayoutManager {
	constructor(canvas) {
		this.font = '16px serif';
		this.padding = 3;
		this.canvas = canvas;
		this.topButtons = [];
		this.bottomButtons = [];
		this.imageList = null;
	}
	
	addButton(b, bottom) {
		if (bottom) {
			this.bottomButtons.push(b);
		} else {
			this.topButtons.push(b);
		}
	}
	
	addImageList(il) {
		this.imageList = il;
	}
	
	updateLayout() {
		const ctx = this.canvas.getContext('2d');
		ctx.font = this.font;
		ctx.textAlign = 'left';
		let x = 0;
		for (let b of this.topButtons) {
			b.font = this.font;
			b.padding = this.padding;
			b.x = 0;
			b.y = 0;
			const meas = ctx.measureText(b.text);
			b.width = meas.width + this.padding * 2;
			b.height = meas.fontBoundingBoxAscent + meas.fontBoundingBoxDescent + this.padding * 2;
			x += b.width + this.padding;
		}
		for (let b of this.bottomButtons) {
			b.font = this.font;
			b.padding = this.padding;
			const meas = ctx.measureText(b.text);
			b.width = meas.width + this.padding * 2;
			b.height = meas.fontBoundingBoxAscent + meas.fontBoundingBoxDescent + this.padding * 2;
			b.x = 0;
			b.y = ctx.canvas.height - b.height;
			x += b.width + this.padding;
		}
		if (this.imageList != null) {
			const il = this.imageList;
			il.width = this.canvas.width / 20;
			il.x = this.canvas.width - il.width;
			il.y = 0;
			il.height = this.canvas.height;
			il.imgHeight = il.width;
		}
	}
	
}

class GraphicalInterface {
	
	constructor(canvas) {
		this.canvas = canvas;
		this.context = canvas.getContext('2d');
		this.drawables = [];
		this.clickables = [];
		this.dragables = [];
		this.manager = new LayoutManager(canvas);
	}
	
	addButton(text, onPress, bottom) {
		const b = new Button(text, onPress);
		this.drawables.push(b);
		this.clickables.push(b);
		this.manager.addButton(b, bottom);
	}
	
	addImageList(images, x, y) {
		const il = new ImageList(images, x, y);
		this.drawables.push(il);
		this.clickables.push(il);
		this.dragables.push(il);
		this.manager.addImageList(il);
	}
	
	click(x, y) {
		for (let c of this.clickables) {
			if (isNumberInRange(x, c.x, c.x + c.width) && isNumberInRange(y, c.y, c.y + c.height)) {
				c.click(x, y);
				return true;
			}
		}
		return false;
	}
	
	drag(x, y, dx, dy) {
		for (let d of this.dragables) {
			if (isNumberInRange(x, d.x, d.x + d.width) && isNumberInRange(y, d.y, d.y + d.height)) {
				d.drag(x, y, dx, dy);
				return true;
			}
		}
		return false;
	}
	
	resize() {
		this.manager.updateLayout();
	}
	
	draw() {
		for (let d of this.drawables) {
			d.draw(this.context);
		}
	}
}