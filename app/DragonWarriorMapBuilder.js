class DragonWarriorMapBuilder {
	
	constructor() {
		this.map = null;

		this.quests = {};
		

		this.tgPos = new Point(-1.0, 1.0);
		this.rmdPos = new Point(3, -1);
		this.scPos = new Point(3, 1);
		this.ghPos = new Point(-4, 4.0);
		this.rsPos = new Point(2, 4);
		this.tokenPos = new Point(2, -4);

		this.ccPos = new Point(-0.5, 0);

		this.ccBridgePos = new Point(0.5, 0);
	}

	addTileField(tf) {
		this.map.addTileField(tf);
	}
	
	addQuest(quest, key) {
		if (this.quests[key] !== undefined) {
			console.log('Warning! Quest "' + key + '" is already in the list!');
		}
		this.quests[key] = quest;
		this.map.addQuest(quest);
	}

    createAndLoadTileSet() {
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
		const tileSet = new TileSet();
		const tiles = tileSet.tiles;
		for (const name of tileNames) {
			tiles.push(new Tile(dir + name + ext, name));
		}
		return tileSet;
	}
	
	createTestTileField() {
		const ts = this.createAndLoadTileSet();
		const castle = ts.getTile('castle');
		const grass = ts.getTile('grass');
		const tf = new TileField(3, 3);
		tf.tiles.push(
			grass, grass, grass,
			grass, castle, grass,
			grass, grass, grass
		);
		this.addTileField(tf);
	}

	createQuests() {
		const quests = this.quests;
		
		let q = new Quest('King Loric', Actions.TALK, this.tgPos);
		this.addQuest(q, 'loric');

		q = new Quest('Magic Keys', Actions.TAKE, this.rmdPos);
		q.questsToUnlock.push(quests['loric']);
		this.addQuest(q, 'magic-keys');

		q = new Quest("Green Dragon", Actions.DEFEAT, this.scPos);
		q.questsToUnlock.push(quests['loric']);
		this.addQuest(q, 'dragon');

		q = new Quest("Silver Harp", Actions.TAKE, this.ghPos);
		q.questsToUnlock.push(quests['magic-keys']);
		this.addQuest(q, 'harp');

		q = new Quest("Staff of Rain", Actions.TAKE, this.rsPos);
		q.questsToUnlock.push(quests['harp']);
		this.addQuest(q, 'staff');

		q = new Quest("Stones of Sunlight", Actions.TAKE, this.tgPos.x, this.tgPos.y + 0.2);
		q.questsToUnlock.push(quests['magic-keys']);
		this.addQuest(q, 'sunstone');

		q = new Quest("Erdrick's Token", Actions.TAKE, this.tokenPos);
		q.questsToUnlock.push(quests['loric']);
		this.addQuest(q, 'token');

		q = new Quest('Rainbow Drop', Actions.USE, this.ccBridgePos);
		q.questsToUnlock.push(quests['staff'], quests['sunstone'], quests['token']);
		this.addQuest(q, 'bridge-creation');

		q = new Quest('Dragonlord', Actions.DEFEAT, this.ccPos);
		q.questsToUnlock.push(quests['bridge-creation']);
		this.addQuest(q, 'dragonlord');

		q = new Quest('King Lorik', Actions.TALK, this.tgPos.x, this.tgPos.y + 0.4);
		q.questsToUnlock.push(quests['dragonlord']);
		this.addQuest(q, 'ending');
	}

	generateDragonWarriorMap() {
		this.map = new Map();
		this.createQuests();
		this.createTestTileField();
		return this.map;
	}
}

function generateDragonWarriorMapContainer() {
	return {
		objects: [
			{
				"type": "tileset",
				"tiles": {
					"brick": "img/tilesets/dw/brick.png",
					"bridge": "img/tilesets/dw/bridge.png",
					"castle": "img/tilesets/dw/castle.png",
					"chest": "img/tilesets/dw/chest.png",
					"desert": "img/tilesets/dw/desert.png",
					"door": "img/tilesets/dw/door.png",
					"grass": "img/tilesets/dw/grass.png",
					"hill": "img/tilesets/dw/hill.png",
					"king": "img/tilesets/dw/king.png",
					"mountain": "img/tilesets/dw/mountain.png",
					"stairs": "img/tilesets/dw/stairs.png",
					"table": "img/tilesets/dw/table.png",
					"trees": "img/tilesets/dw/trees.png",
					"village": "img/tilesets/dw/village.png",
					"wall": "img/tilesets/dw/wall.png",
					"water": "img/tilesets/dw/water.png"
				}
			},
			{
				"type": "tilefield",
				"size": {
					"x": 3,
					"y": 3
				},
				"tileSize": {
					"x": 0.5,
					"y": 0.5
				},
				"position": {
					"x": 10,
					"y": -1
				},
				"tiles": [
					"grass",
					"grass",
					"hill",
					"grass",
					"castle",
					"trees",
					"grass",
					"grass",
					"village"
				]
			},
			{
				"type": "quest",
				"position": {
					"x": -1,
					"y": 1
				},
				"description": "King Loric",
				"action": "Talk to",
				"quests": []
			},
			{
				"type": "quest",
				"position": {
					"x": 3,
					"y": -1
				},
				"description": "Magic Keys",
				"action": "Pick up",
				"quests": [
					0
				]
			},
			{
				"type": "quest",
				"position": {
					"x": 3,
					"y": 1
				},
				"description": "Green Dragon",
				"action": "Defeat",
				"quests": [
					0
				]
			},
			{
				"type": "quest",
				"position": {
					"x": -4,
					"y": 4
				},
				"description": "Silver Harp",
				"action": "Pick up",
				"quests": [
					1
				]
			},
			{
				"type": "quest",
				"position": {
					"x": 2,
					"y": 4
				},
				"description": "Staff of Rain",
				"action": "Pick up",
				"quests": [
					3
				]
			},
			{
				"type": "quest",
				"position": {
					"x": -1,
					"y": 1.2
				},
				"description": "Stones of Sunlight",
				"action": "Pick up",
				"quests": [
					1
				]
			},
			{
				"type": "quest",
				"position": {
					"x": 2,
					"y": -4
				},
				"description": "Erdrick's Token",
				"action": "Pick up",
				"quests": [
					0
				]
			},
			{
				"type": "quest",
				"position": {
					"x": 0.5,
					"y": 0
				},
				"description": "Rainbow Drop",
				"action": "Use",
				"quests": [
					4,
					5,
					6
				]
			},
			{
				"type": "quest",
				"position": {
					"x": -0.5,
					"y": 0
				},
				"description": "Dragonlord",
				"action": "Defeat",
				"quests": [
					7
				]
			},
			{
				"type": "quest",
				"position": {
					"x": -1,
					"y": 1.4
				},
				"description": "King Lorik",
				"action": "Talk to",
				"quests": [
					8
				]
			}
		]
	}
}