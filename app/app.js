"use strict";

const cnv = document.getElementById('canvas');

const mapBuilder = new DragonWarriorMapBuilder();
const map = mapBuilder.generateDragonWarriorMap();
const mapRenderer = new MapRenderer(map, cnv);
const userInputHandler = new UserInputHandler(mapRenderer);

// Events handling
let mouseClickHandler = function (event) {
	userInputHandler.mouseClick(event);
}
cnv.addEventListener('click', mouseClickHandler);

const keyDownHandler = function (event) {
	userInputHandler.keyDown(event);
}
window.addEventListener('keydown', keyDownHandler);

const keyPressHandler = function (event) {
	userInputHandler.keyPress(event);
}
window.addEventListener('keypress', keyPressHandler);

window.addEventListener('mousedown', function (event) { userInputHandler.mouseDown(event) });
window.addEventListener('mouseup', function (event) { userInputHandler.mouseUp(event) });
window.addEventListener('mousemove', function (event) { userInputHandler.mouseMove(event) });
window.addEventListener('wheel', function (event) { userInputHandler.mouseWheel(event) });


window.addEventListener("resize", function (event) { mapRenderer.resizeViewport(); });
window.addEventListener("load", function (event) { mapRenderer.resizeViewport(); });