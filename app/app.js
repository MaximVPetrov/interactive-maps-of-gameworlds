"use strict";

const cnv = document.getElementById('canvas');

const mapBuilder = new DragonWarriorMapBuilder();
const map = mapBuilder.generateDragonWarriorMap();
const mapRenderer = new MapRenderer(map, cnv);
const editor = new Editor(mapRenderer);
const gui = new GraphicalInterface(cnv);
const userInputHandler = new UserInputHandler(mapRenderer, editor, gui, draw);

run();

function run() {
	gui.addButton('Editor', onEditorButtonPress);
	gui.addButton('Save', onSaveButtonPress, true);
	
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
	gui.addImageList(images, onTileSelectorPress, 200, 10);

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
	editor.draw();
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
	editor.setActive(!editor.active);
}

function onTileSelectorPress(ind) {
	editor.setTile(ind);
}

function onSaveButtonPress() {
	if (editor.selected) {
	}
	showTextInNewWindow(JSON.stringify(saveTileSetToContainer(editor.tileSet), undefined, '\t'));
}

// Editor testing
function showTextInNewWindow(t) {
	//let win = window.open("", "Title", "toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=780,height=200,top="+(screen.height-400)+",left="+(screen.width-840));
	let win = window.open("", "Title", "toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=640,height=480,top="+(screen.height-100)+",left="+(screen.width-100));
	win.document.body.innerHTML = '<pre>' + t + '</pre>';
}

function saveTileSetToContainer(ts) {
	const c = new Object();
	for (let t of ts.tiles) {
		c[t.description] = t.img.src;
	}
	return c;
}

function tileFieldToText(tf) {
	let res = '{\n';
	res += '\ttype: "tilefield",\n';
	res += '\tsizeX: ' + tf.numOfTilesX + ',\n';
	res += '\tsizeY: ' + tf.numOfTilesY + ',\n';
	res += '\tposX: ' + tf.position.x + ',\n';
	res += '\tposY: ' + tf.position.y + ',\n';
	res += '\ttiles: [\n'
	for (let t of tf.tiles) {
		res += '\t\t' + t.description + ',\n';
	}
	res += '\t]\n'
	res += '}';
	return res;
}

function createTileSetFromContainer(c) {
	const tileSet = new TileSet();
	const tiles = tileSet.tiles;
	for (let p in c) {
		tiles.push(new Tile(c[p], p));
	}
	return tileSet;	
}

function createMapFromContainer(c) {
}

function createTileSetContainer() {
	let c = new Object();
	const dir = 'img/tilesets/dw/';
	const ext = '.png'
	const tileNames = [
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
	for (let name of tileNames) {
		c[name] = dir + name + ext;
	}
	return c;
}

let ts = createTileSetFromContainer(createTileSetContainer());

let ts2 = {
	"brick": "file:///C:/Users/mvp17/Desktop/interactive-maps-of-game-worlds/app/img/tilesets/dw/brick.png",
	"bridge": "file:///C:/Users/mvp17/Desktop/interactive-maps-of-game-worlds/app/img/tilesets/dw/bridge.png",
	"castle": "file:///C:/Users/mvp17/Desktop/interactive-maps-of-game-worlds/app/img/tilesets/dw/castle.png",
	"chest": "file:///C:/Users/mvp17/Desktop/interactive-maps-of-game-worlds/app/img/tilesets/dw/chest.png",
	"desert": "file:///C:/Users/mvp17/Desktop/interactive-maps-of-game-worlds/app/img/tilesets/dw/desert.png",
	"door": "file:///C:/Users/mvp17/Desktop/interactive-maps-of-game-worlds/app/img/tilesets/dw/door.png",
	"grass": "file:///C:/Users/mvp17/Desktop/interactive-maps-of-game-worlds/app/img/tilesets/dw/grass.png",
	"hill": "file:///C:/Users/mvp17/Desktop/interactive-maps-of-game-worlds/app/img/tilesets/dw/hill.png",
	"king": "file:///C:/Users/mvp17/Desktop/interactive-maps-of-game-worlds/app/img/tilesets/dw/king.png",
	"mountain": "file:///C:/Users/mvp17/Desktop/interactive-maps-of-game-worlds/app/img/tilesets/dw/mountain.png",
	"stairs": "file:///C:/Users/mvp17/Desktop/interactive-maps-of-game-worlds/app/img/tilesets/dw/stairs.png",
	"table": "file:///C:/Users/mvp17/Desktop/interactive-maps-of-game-worlds/app/img/tilesets/dw/table.png",
	"trees": "file:///C:/Users/mvp17/Desktop/interactive-maps-of-game-worlds/app/img/tilesets/dw/trees.png",
	"village": "file:///C:/Users/mvp17/Desktop/interactive-maps-of-game-worlds/app/img/tilesets/dw/village.png",
	"wall": "file:///C:/Users/mvp17/Desktop/interactive-maps-of-game-worlds/app/img/tilesets/dw/wall.png",
	"water": "file:///C:/Users/mvp17/Desktop/interactive-maps-of-game-worlds/app/img/tilesets/dw/water.png"
};

createTileSetFromContainer(ts2);