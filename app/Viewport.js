"use strict"

class Viewport {
	
	constructor(canvas, camera) {
		this.canvas = canvas;
		this.camera = camera;
		this.resize();
	}

	toPixels(point) {
		return new Point(this.canvas.width * (point.x - this.camera.getLeft()) / this.camera.getWidth(), 
			(this.camera.getTop() - point.y) * this.canvas.height / this.camera.getHeight());
	}
	
	toWorldCoordinates(point) {
		return new Point(this.camera.getLeft() + point.x / this.canvas.width * this.camera.getWidth(), 
			this.camera.getTop() - point.y / this.canvas.height * this.camera.getHeight());
	}

	resize() {
		this.canvas.width = this.canvas.clientWidth;
		this.canvas.height = this.canvas.clientHeight;
		this.camera.setAspectRatio(this.canvas.width / this.canvas.height);
	}
	
	getFramebufferWidth() {
		return this.canvas.width;
	}
	
	getFramebufferHeight() {
		return this.canvas.height;
	}
	
	getPixelsPerUnit() {
		return this.canvas.width / this.camera.getWidth();
	}
	
	getPixelsPerUnits(v) {
		this.getPixelsPerUnit() * v;
	}
}