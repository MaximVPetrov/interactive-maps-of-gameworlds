"use strict";

const cnv = document.getElementById('canvas');

const mapBuilder = new DragonWarriorMapBuilder();
//const map = mapBuilder.generateDragonWarriorMap();
const map = createMapFromContainer(generateDragonWarriorMapContainer());
const mapRenderer = new MapRenderer(map, cnv);
const editor = new Editor(mapRenderer);
const guide = new Guide(mapRenderer);
const gui = new GraphicalInterface(cnv);
const userInputHandler = new UserInputHandler(mapRenderer, guide, editor, gui, draw);

const editorButtonId = 0;
const guideButtonId = editorButtonId + 1;
const selectorButtonId = guideButtonId + 1
const addLocationButtonId = selectorButtonId + 1;

run();

function run() {
	gui.addButton('Editor', onEditorButtonPress);
	gui.addButton('Guide', onGuideButtonPress);
	gui.addButton('Selector', onSelectorButtonPress);
	gui.addButton('Location', onAddLocationButtonPress);
	gui.addButton('Save (text)', onSaveButtonPress, true);
	gui.addButton('Save (storage)', onSaveToStorageButtonPress, true);
	gui.addButton('Load (storage)', onLoadFromStorageButtonPress, true);
	
	gui.manager.topButtons[guideButtonId].visible = false;
	gui.manager.topButtons[selectorButtonId].visible = false;
	gui.manager.topButtons[addLocationButtonId].visible = false;
	
	const names = [
		'barrier',
		'brick',
		'bridge',
		'castle',
		'cave',
		'chest',
		'desert',
		'door',
		'dungeon',
		'grass',
		'hill',
		'king',
		'mountain',
		'seller',
		'stairs_down',
		'stairs_up',
		'swamp',
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
	if (editor.isActive()) {
		editor.draw();
	} else {
		guide.draw();
	}
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

function onGuideButtonPress() {
	editor.setActive(false);
	mapRenderer.editorMode = false;
	gui.manager.topButtons[editorButtonId].visible = true;
	gui.manager.topButtons[guideButtonId].visible = false;
	gui.manager.topButtons[selectorButtonId].visible = false;
	gui.manager.topButtons[addLocationButtonId].visible = false;
}

function onEditorButtonPress() {
	editor.setActive(true);
	mapRenderer.editorMode = true;
	gui.manager.topButtons[editorButtonId].visible = false;
	gui.manager.topButtons[guideButtonId].visible = true;
	gui.manager.topButtons[selectorButtonId].visible = true;
	gui.manager.topButtons[addLocationButtonId].visible = true;
	gui.resize();
}

function onSelectorButtonPress() {
	editor.changeMode(EditorModes.MAIN);
}

function onAddLocationButtonPress() {
	editor.baseName = prompt('Enter base name...', editor.baseName);
	editor.counter = 0;
	editor.changeMode(EditorModes.LOCATION_ADDING);
}

function onTileSelectorPress(ind) {
	editor.setTile(ind);
}

function onSaveButtonPress() {
	showTextInNewWindow(JSON.stringify(mapToContainer(map), undefined, '\t'));
}

function onSaveToStorageButtonPress() {
	localStorage.setItem("map", JSON.stringify(mapToContainer(map)));
}

function onLoadFromStorageButtonPress() {
	const text = localStorage.getItem('map');
	const obj = JSON.parse(text);
	map = createMapFromContainer(obj);
}

// Editor testing
function showTextInNewWindow(t) {
	let win = window.open("", "Title", "toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=640,height=480,top="+(screen.height-100)+",left="+(screen.width-100));
	win.document.body.innerHTML = '<pre>' + t + '</pre>';
}

function findQuest(quests, id) {
	for (let q of quests) {
		if (q.id == id) {
			return q;
		}
	}
	console.error('Unable to find quest "' + id + '"');
	return null;
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

function tileFieldToContainer(tf, qList) {
	const tiles = [];
	for (let t of tf.tiles) {
		tiles.push(t === undefined ? '' : t.description);
	}
	const quests = [];
	for (let uq of tf.quests) {
		quests.push(uq.id);
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
		tiles: tiles,
		quests: quests
	}
}

function questToContainer(q, qList) {
	const quests = [];
	for (let uq of q.questsToUnlock) {
		quests.push(uq.id);
	}
	return {
		type: 'quest',
		id: q.id,
		description: q.description,
		action: q.action,
		position: {
			x: q.position.x,
			y: q.position.y
		},
		quests: quests
	}
}

function substrateToContainer(s) {
	return {
		type: 'substrate',
		position: {
			x: s.position.x,
			y: s.position.y
		},
		width: s.width,
		height: s.height,
		image: s.img.src
	}
}

function locationToContainer(loc) {
	return {
		type: 'location',
		id: loc.id,
		position: {
			x: loc.position.x,
			y: loc.position.y
		}
	}
}

function pathToContainer(p) {
	return {
		type: 'path',
		from: p.from.id,
		to: p.to.id,
		distance: p.distance
	}
}

function mapToContainer(m) {
	const list = [];
	for (let q of m.quests) {
		list.push(questToContainer(q, m.quests));
	}
	for (let sub of m.substrates) {
		list.push(substrateToContainer(sub));
	}
	list.push(tileSetToContainer(editor.tileSet));
	for (let tf of m.tileFields) {
		list.push(tileFieldToContainer(tf, m.quests));
	}
	for (let p of m.points) {
		list.push(pointToContainer(p));
	}
	for (let loc of m.getLocations()) {
		list.push(locationToContainer(loc));
	}
	for (let loc of m.getLocations()) {
		for (let p of loc.pathsTo) {
			list.push(pathToContainer(p));
		}
	}
	return {
		objects: list,
	}
}


function createPointFromContainer(c) {
	return new Point(c.position.x, c.position.y);
}

function createSubstrateFromContainer(c) {
	return new Substrate(c.image, c.width, c.height, c.position.x, c.position.y);
}

function createTileSetFromContainer(c) {
	const tileSet = new TileSet();
	const tiles = tileSet.tiles;
	for (let p in c.tiles) {
		tiles.push(new Tile(c.tiles[p], p));
	}
	return tileSet;	
}

function createTileFieldFromContainer(c, tileSet, quests) {
	const tf = new TileField();
	tf.numOfTilesX = c.size.x;
	tf.numOfTilesY = c.size.y;
	tf.tileSize = c.tileSize.x;
	tf.position.x = c.position.x;
	tf.position.y = c.position.y;
	for (let t of c.tiles) {
		tf.addTile(tileSet.getTile(t));
	}
	for (let i of c.quests) {
		const q = findQuest(quests, i);
		if (q) {
			tf.addQuest(q);
		}
	}
	return tf;
}

function createQuestFromContainer(c, quests) {
	const q = new Quest();
	q.id = c.id;
	q.description = c.description;
	q.action = c.action;
	q.position.x = c.position.x;
	q.position.y = c.position.y;
	for (let i of c.quests) {
		const pq = findQuest(quests, i);
		if (pq) {
			q.addPreviousQuests(pq);
		}
	}
	return q;
}

function createLocation(c) {
	const loc = new Location();
	loc.id = c.id;
	loc.position.x = c.position.x;
	loc.position.y = c.position.y;
	return loc;
}

function createPath(c, routeMesh, rev) {
	const locTo = routeMesh.getLocation(c.to);
	const locFrom = routeMesh.getLocation(c.from);
	const path = new Path();
	if (!rev) {
		path.to = locTo;
		path.from = locFrom;
	} else {
		path.to = locFrom;
		path.from = locTo;
	}
	if (!c.distance) {
		path.distance = locFrom.position.clone().sub(locTo.position).mag();
	} else {
		path.distance = c.distance;
	}
	return path;
}

function createMapFromContainer(c) {
	let m = new Map();
	let ts = new TileSet();
	for (let i of c.objects) {
		switch (i.type) {
			case 'substrate':
				m.addSubstrate(createSubstrateFromContainer(i));
			case 'tileset':
				ts = createTileSetFromContainer(i);
				break;
			case 'tilefield':
				m.addTileField(createTileFieldFromContainer(i, ts, m.quests));
				break;
			case 'quest':
				m.addQuest(createQuestFromContainer(i, m.quests));
				break;
			case 'location':
				m.addLocation(createLocation(i));
				break;
			case 'path':
				m.addPath(createPath(i, m.routeMesh));
				if (i.hasReversed) {
					m.addPath(createPath(i, m.routeMesh, true));
				}
				break;
		}
	}
	return m;
}

let testMap = createMapFromContainer(generateDragonWarriorMapContainer());