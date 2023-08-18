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

window.addEventListener("resize", function (event) { mapRenderer.resizeViewport(); mapRenderer.draw(); });
window.addEventListener("load", function (event) { mapRenderer.resizeViewport(); mapRenderer.draw(); });