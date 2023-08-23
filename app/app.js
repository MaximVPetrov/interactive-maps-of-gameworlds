"use strict";

const cnv = document.getElementById('canvas');

const mapBuilder = new DragonWarriorMapBuilder();
const map = mapBuilder.generateDragonWarriorMap();
const mapRenderer = new MapRenderer(map, cnv);
const gui = new GraphicalInterface(cnv);
const userInputHandler = new UserInputHandler(mapRenderer, gui, draw);

run();

function run() {
	gui.addButton('Editor', onEditorButtonPress);
	
	const names = [
		'brick',
		'bridge',
		'castle',
		'chest',
		'desert',
		'door',
		'grass',
		'hill',
		'king',
		'mountain',
		'stairs',
		'table',
		'trees',
		'village',
		'wall',
		'water'
	]
	const images = [];
	for (let n of names) {
		const img = new Image();
		img.src = 'img/tilesets/dw/' + n + '.png';
		images.push(img);
	}
	gui.addImageList(images, 200, 10);

	window.addEventListener('keydown', onKeyDown);
	window.addEventListener('keypress', onKeyPress);
	window.addEventListener('mousedown', onMouseDown);
	window.addEventListener('mouseup', onMouseUp);
	cnv.addEventListener('click', onMouseClick);
	window.addEventListener('mousemove', onMouseMove);
	window.addEventListener('wheel', onMouseWheel);
	window.addEventListener("resize", onResizeWindow);
	window.addEventListener("load", onLoadPage);
}

function resize() {
	mapRenderer.resizeViewport();
	gui.resize();
	draw();
}

function draw() {
	mapRenderer.draw();
	gui.draw();
}

function onLoadPage(event) {
	resize();
}

function onResizeWindow(event) {
	resize();
}

function onMouseDown(event) {
	userInputHandler.mouseDown(event);
}

function onMouseUp(event) {
	userInputHandler.mouseUp(event);
}

function onMouseClick(event) {
	userInputHandler.mouseClick(event);
}

function onMouseMove(event) {
	userInputHandler.mouseMove(event);
}

function onMouseWheel(event) {
	userInputHandler.mouseWheel(event);
}

function onKeyDown(event) {
	userInputHandler.keyDown(event);
}

function onKeyPress(event) {
	userInputHandler.keyPress(event);
}

function onEditorButtonPress() {
	console.log('editor button is pressed!');
}