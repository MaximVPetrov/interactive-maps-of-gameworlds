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
		
	}
}