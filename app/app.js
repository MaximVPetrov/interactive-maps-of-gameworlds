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
	showTextInNewWindow(JSON.stringify(mapToContainer(map), undefined, '\t'));
}

// Editor testing
function showTextInNewWindow(t) {
	let win = window.open("", "Title", "toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=640,height=480,top="+(screen.height-100)+",left="+(screen.width-100));
	win.document.body.innerHTML = '<pre>' + t + '</pre>';
}


function pointToContainer(p) {
	return {
		type: 'point',
		position: {
			x: p.position.x,
			y: p.position.y
		}
	}
}

function tileSetToContainer(ts) {
	const c = {
		type: 'tileset',
		tiles: new Object()
	};
	for (let t of ts.tiles) {
		c.tiles[t.description] = t.img.src;
	}
	return c;
}

function tileFieldToContainer(tf) {
	const tiles = [];
	for (let t of tf.tiles) {
		tiles.push(t.description);
	}
	return {
		type: 'tilefield',
		size: {
			x: tf.numOfTilesX,
			y: tf.numOfTilesY
		},
		tileSize: {
			x: tf.tileSize,
			y: tf.tileSize
		},
		position: {
			x: tf.position.x,
			y: tf.position.y,
		},
		tiles
	}
}

function questToContainer(q, qList) {
	const quests = [];
	for (let uq of q.questsToUnlock) {
		quests.push(qList.indexOf(uq));
	}
	return {
		type: 'quest',
		position: {
			x: q.position.x,
			y: q.position.y
		},
		description: q.description,
		action: q.action,
		quests: quests
	}
}

function mapToContainer(m) {
	for (let p of m.points) {
		list.push(pointToContainer(p));
	}
	const list = [];
	list.push(tileSetToContainer(editor.tileSet));
	for (let tf of m.tileFields) {
		list.push(tileFieldToContainer(tf));
	}
	for (let q of m.quests) {
		list.push(questToContainer(q, m.quests));
	}
	return {
		objects: list,
	}
}


function createPointFromContainer(c) {
	return new Point(c.position.x, c.position.y);
}

function createTileSetFromContainer(c) {
	const tileSet = new TileSet();
	const tiles = tileSet.tiles;
	for (let p in c.tiles) {
		tiles.push(new Tile(c.tiles[p], p));
	}
	return tileSet;	
}

function createTileFieldFromContainer(c, tileSet) {
	const tf = new TileField();
	tf.numOfTilesX = c.size.x;
	tf.numOfTilesY = c.size.y;
	tf.tileSize = c.tileSize.x;
	tf.position.x = c.position.x;
	tf.position.y = c.position.y;
	for (let t of c.tiles) {
		tf.addTile(tileSet.getTile(t));
	}
	return tf;
}

function createQuestFromContainer(c, quests) {
	const q = new Quest();
	q.action = c.action;
	q.description = c.description;
	q.position.x = c.position.x;
	q.position.y = c.position.y;
	for (let i of c.quests) {
		q.addPreviousQuests(quests[i]);
	}
	return q;
}

function createMapFromContainer(c) {
	let m = new Map();
	let ts = new TileSet();
	for (let i of c.objects) {
		switch (i.type) {
			case 'tileset':
				ts = createTileSetFromContainer(i);
				break;
			case 'tilefield':
				m.addTileField(createTileFieldFromContainer(i, ts));
				break;
			case 'quest':
				m.addQuest(createQuestFromContainer(i, m.quests));
				break;
		}
	}
	return m;
}

let testMap = createMapFromContainer(generateDragonWarriorMapContainer());