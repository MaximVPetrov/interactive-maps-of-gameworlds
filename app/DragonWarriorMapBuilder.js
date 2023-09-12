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
	
	addSubstrate(s) {
		this.map.addSubstrate(s);
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
		const tileSet = new TileSet();
		const tiles = tileSet.tiles;
		for (const name of tileNames) {
			tiles.push(new Tile(dir + name + ext, name));
		}
		return tileSet;
	}

	generateDragonWarriorMap() {
		this.map = new Map();
		return this.map;
	}
}

function generateDragonWarriorMapContainer() {
	const tgF2 = new Point(0, 0);
	const tgF2Room = new Point(tgF2.x, tgF2.y + 1.0);
	const tgF2Passage = new Point(tgF2.x, tgF2.y - 4.0);
	const lorik = new Point(tgF2.x - 1.5, tgF2.y + 1.5);
	const tgF2Key = new Point(tgF2.x + 1.5, tgF2.y + 3.5);
	const tgF2Gold = new Point(lorik.x + 1, lorik.y - 1);
	const tgF2Torch = new Point(lorik.x + 2, lorik.y - 1);
	const tgF2Door = new Point(lorik.x + 1, lorik.y - 4);
	const tgF2Stairs = new Point(tgF2Door.x + 4, tgF2Door.y - 1);
	const tgF1 = new Point(tgF2.x + 10, tgF2.y - 21);
	const tgExit = new Point(tgF1.x - 4, tgF1.y - 14.5);
	const tgStorageDoor = new Point(tgF1.x - 10.5, tgF1.y + 1.5);
	const tgB1 = new Point(tgF1.x + 9, tgF1.y + 22);
	const stones = new Point(tgB1.x - 0.5, tgB1.y - 0.5);

	const alefgard = new Point(tgF1.x + 13, tgF1.y - 79);
	const tantegel = new Point(alefgard.x - 16.5, alefgard.y + 16.5);
	const brecconary = new Point(tantegel.x + 5, tantegel.y + 2);
	const erdricksCave = new Point(tantegel.x - 15, tantegel.y + 31);
	const swampCaveEntrance = new Point(brecconary.x + 56, brecconary.y - 3);
	const swampCaveExit = new Point(swampCaveEntrance.x, swampCaveEntrance.y - 5);
	const rimuldar = new Point(swampCaveExit.x - 2, swampCaveExit.y - 23);
	const cantlin = new Point(rimuldar.x - 29, rimuldar.y - 30);
	const token = new Point(cantlin.x + 10, cantlin.y - 11);
	const charlock = new Point(brecconary.x, brecconary.y - 7);
	const garinham = new Point(erdricksCave.x - 26, erdricksCave.y + 10);
	const mountainCave = new Point(tantegel.x - 14, tantegel.y - 14);
	const hauksness = new Point(mountainCave.x - 4, mountainCave.y - 32);
	const rainShrine = new Point(brecconary.x + 33, brecconary.y + 40);
	const kol = new Point(rainShrine.x + 23, rainShrine.y - 9);
	const sanctum = new Point(token.x + 25, token.y + 4);
	
	const bnF1 = new Point(tgF1.x + 31, tgF1.y + 0);
	
	const rdF1 = new Point(rimuldar.x + 36.5, rimuldar.y - 0.5);
	const rdKeys = new Point(rdF1.x - 10.5, rdF1.y + 7.5);
	
	const clB1 = new Point(charlock.x - 62.5, charlock.y + 5.5);
	const clB2 = new Point(clB1.x - 22, clB1.y);
	const clB3 = new Point(clB2.x - 18, clB2.y);
	const clB4 = new Point(clB3.x - 13, clB3.y);
	const clB5 = new Point(clB4.x - 13, clB4.y);
	const clB6 = new Point(clB5.x - 13, clB5.y);
	const clB7 = new Point(clB6.x - 13, clB6.y);
	const clB8 = new Point(clB7.x - 22, clB7.y);

	const ctF1 = new Point(cantlin.x - 0.5, cantlin.y - 36.5);

	const ecB1 = new Point(erdricksCave.x - 3.5, erdricksCave.y + 22.5);
	const ecB2 = new Point(ecB1.x, ecB1.y + 13);
	
	const ghF1 = new Point(garinham.x - 16.5, garinham.y + 2.5);
	const ghB1 = new Point(ghF1.x - 22, ghF1.y);
	const ghB2 = new Point(ghB1.x - 20, ghB1.y);
	const ghB3 = new Point(ghB2.x - 20, ghB2.y);
	const ghB4 = new Point(ghB3.x - 18, ghB3.y);
	const harp = new Point(ghB3.x + 3.5, ghB3.y + 3.5);
	
	const hnF1 = new Point(hauksness.x - 39.5, hauksness.y + 0.5);
	
	const kolF1 = new Point(kol.x + 31.5, kol.y + 0.5);
	
	const mcB1 = new Point(mountainCave.x - 41.5, mountainCave.y - 5.5);
	const mcB2 = new Point(mcB1.x - 17, mcB1.y);
	
	const rsB1 = new Point(rainShrine.x + 18.5, rainShrine.y + 11.5);
	const staff = new Point(rsB1.x - 1.5, rsB1.y + 0.5);
	
	const scB1 = new Point(swampCaveEntrance.x + 23.5, swampCaveEntrance.y + 4);
	const dragon = new Point(scB1.x + 1.5, scB1.y + 1);
	
	const stB1 = new Point(sanctum.x + 0.5, sanctum.y - 20.5);
	
	return {
		objects: [
			// Quests
			{
				type: "quest",
				id: 'lorik',
				description: "King Lorik",
				action: "Talk to",
				position: {
					"x": lorik.x,
					"y": lorik.y
				},
				quests: []
			},
			{
				type: "quest",
				id: 'first-gold',
				description: "120G",
				action: "Pick up",
				position: {
					"x": tgF2Gold.x,
					"y": tgF2Gold.y
				},
				quests: [ 'lorik' ]
			},
			{
				type: "quest",
				id: 'first-torch',
				description: "Torch",
				action: "Pick up",
				position: {
					"x": tgF2Torch.x,
					"y": tgF2Torch.y
				},
				quests: [ 'first-gold' ]
			},
			{
				type: "quest",
				id: 'first-key',
				description: "Magic Key",
				action: "Pick up",
				position: {
					"x": tgF2Key.x,
					"y": tgF2Key.y
				},
				"quests": [ 'first-torch' ]
			},
			{
				"type": "quest",
				'id': 'first-door',
				"description": "Door",
				"action": "Use",
				"position": {
					"x": tgF2Door.x,
					"y": tgF2Door.y
				},
				"quests": [ 'first-key' ]
			},
			{
				"type": "quest",
				'id': 'tg-first-floor',
				"description": "First floor",
				"action": Actions.WALK,
				"position": {
					"x": tgF2Stairs.x,
					"y": tgF2Stairs.y
				},
				"quests": [ 'first-door' ]
			},
			{
				"type": "quest",
				'id': 'tg-exit',
				"description": "Alefgard",
				"action": Actions.WALK,
				"position": {
					"x": tgExit.x,
					"y": tgExit.y
				},
				"quests": [	'tg-first-floor' ]
			},
			{
				"type": "quest",
				'id': 'brecconary',
				"description": "Brecconary",
				"action": Actions.WALK,
				"position": {
					"x": brecconary.x,
					"y": brecconary.y
				},
				"quests": [	'tg-exit' ]
			},
			{
				type: "quest",
				id: 'bn-torch',
				description: "Torch (8G)",
				action: Actions.TAKE,
				"position": {
					"x": bnF1.x + 8.5,
					"y": bnF1.y - 10.5
				},
				quests: [ 'brecconary' ]
			},
			{
				type: "quest",
				id: 'cave-of-erdrick',
				description: "Erdrick's Cave (SQ)",
				action: Actions.WALK,
				position: {
					"x": erdricksCave.x,
					"y": erdricksCave.y
				},
				quests: [ 'bn-torch' ]
			},
			{
				type: "quest",
				id: "tablet",
				description: "Erdrick's tablet (SQ)",
				action: Actions.TAKE,
				position: {
					x: ecB2.x + 4.5,
					y: ecB2.y + 1.5
				},
				quests: [ 'cave-of-erdrick' ]
			},
			{
				"type": "quest",
				'id': 'garinham',
				"description": "Garinham",
				"action": Actions.WALK,
				"position": {
					"x": garinham.x,
					"y": garinham.y
				},
				"quests": [	'tablet' ]
			},
			{
				type: "quest",
				id: 'kol',
				description: "Kol",
				action: Actions.WALK,
				position: {
					"x": kol.x,
					"y": kol.y
				},
				quests: [ 'garinham' ]
			},
			{
				"type": "quest",
				'id': 'swamp-cave',
				"description": "Swamp Cave (Lvl 7)",
				"action": Actions.WALK,
				"position": {
					"x": swampCaveEntrance.x,
					"y": swampCaveEntrance.y
				},
				quests: [ 'kol' ]
			},
			{
				"type": "quest",
				'id': 'rimuldar',
				"description": "Rimuldar (Lvl 10)",
				"action": Actions.WALK,
				"position": {
					"x": rimuldar.x,
					"y": rimuldar.y
				},
				"quests": [	'swamp-cave' ]
			},
			{
				"type": "quest",
				'id': 'magic-keys',
				"description": "Magic Keys",
				"action": "Pick up",
				"position": {
					"x": rdKeys.x,
					"y": rdKeys.y
				},
				"quests": [ 'rimuldar' ]
			},

			{
				type: "quest",
				id: 'flute',
				description: "Fairy Flute",
				action: Actions.TAKE,
				position: {
					"x": kolF1.x - 2.5,
					"y": kolF1.y + 5.5
				},
				quests: [ 'rimuldar' ]
			},

			{
				"type": "quest",
				'id': 'tg-storage-door',
				"description": "Door (sq)",
				"action": Actions.USE,
				"position": {
					"x": tgStorageDoor.x,
					"y": tgStorageDoor.y
				},
				"quests": [	'magic-keys' ]
			},
			{
				"type": "quest",
				'id': 'tg-gold',
				"description": "Gold (sq)",
				"action": "Pick up",
				"position": {
					"x": tgF1.x - 12.5,
					"y": tgF1.y + 0.5
				},
				"quests": [	'tg-storage-door' ]
			},
			{
				type: "quest",
				id: 'dragon',
				description: "Green Dragon",
				action: "Defeat",
				position: {
					x: dragon.x,
					y: dragon.y
				},
				quests: [ 'magic-keys' ]
			},
			{
				type: "quest",
				id: 'princess',
				description: "Princess Gwaelin",
				action: Actions.TALK,
				position: {
					x: scB1.x + 2.5,
					y: scB1.y - 3
				},
				quests: [ 'dragon' ]
			},
			{
				type: "quest",
				id: 'harp',
				description: "Silver Harp",
				action: "Pick up",
				position: {
					x: harp.x,
					y: harp.y
				},
				quests: [ 'magic-keys' ]
			},
			{
				type: "quest",
				id: 'rain-shrine',
				description: "Rain Shrine",
				action: Actions.WALK,
				position: {
					"x": rainShrine.x,
					"y": rainShrine.y
				},
				quests: [ 'harp' ]
			},
			{
				type: "quest",
				id: 'staff',
				description: "Staff of Rain",
				action: "Pick up",
				position: {
					x: staff.x,
					y: staff.y
				},
				quests: [ 'rain-shrine' ]
			},
			{
				"type": "quest",
				'id': "stones-door",
				"description": "Door",
				"action": Actions.USE,
				"position": {
					"x": tgF1.x + 3.5,
					"y": tgF1.y + 8.5,
				},
				"quests": [	'magic-keys' ]
			},
			{
				"type": "quest",
				'id': "tg-b1-entrance",
				"description": "Basement",
				"action": Actions.WALK,
				"position": {
					"x": tgF1.x + 14.5,
					"y": tgF1.y - 14.5,
				},
				"quests": [	'stones-door' ]
			},
			{
				"type": "quest",
				'id': "stones",
				"description": "Stones of Sunlight",
				"action": "Pick up",
				"position": {
					"x": stones.x,
					"y": stones.y
				},
				"quests": [	'tg-b1-entrance' ]
			},
			{
				type: "quest",
				id: 'mountain-cave',
				description: "Mountain Cave",
				action: Actions.WALK,
				position: {
					x: mountainCave.x,
					y: mountainCave.y
				},
				quests: [ 'swamp-cave' ]
			},
			// 
			{
				type: "quest",
				id: 'golem',
				description: "Golem",
				action: Actions.DEFEAT,
				position: {
					x: cantlin.x,
					y: cantlin.y + 2
				},
				"quests": [ 'magic-keys' ]
			},
			{
				type: "quest",
				id: 'cantlin',
				description: "Cantlin",
				action: Actions.WALK,
				position: {
					x: cantlin.x,
					y: cantlin.y
				},
				quests: [ 'golem' ]
			},

			{
				type: "quest",
				id: 'token',
				description: "Erdrick's Token",
				action: "Pick up",
				position: {
					x: token.x,
					y: token.y
				},
				"quests": [ 'rimuldar' ]
			},

			{
				type: "quest",
				id: 'hauksness',
				description: "Hauksness",
				action: Actions.WALK,
				position: {
					x: hauksness.x,
					y: hauksness.y
				},
				quests: [ 'rimuldar' ]
			},
			{
				type: "quest",
				id: 'knight',
				description: "Axe Knight",
				action: Actions.DEFEAT,
				position: {
					x: hnF1.x + 7.5,
					y: hnF1.y - 2.5
				},
				quests: [ 'hauksness' ]
			},
			{
				type: "quest",
				id: 'armor-of-erdrick',
				description: "Erdrick's Armor",
				action: "Pick up",
				position: {
					x: hnF1.x + 8.5,
					y: hnF1.y - 2.5
				},
				quests: [ 'knight' ]
			},
			
			{
				type: "quest",
				id: 'sanctum',
				description: "The Sanctum",
				action: Actions.WALK,
				position: {
					x: sanctum.x,
					y: sanctum.y
				},
				quests: [ 'token', 'stones', 'staff' ]
			},
			{
				type: "quest",
				id: 'rainbow-drop',
				description: "Rainbow Drop",
				action: Actions.TAKE,
				position: {
					x: stB1.x + 0.5,
					y: stB1.y - 0.5
				},
				quests: [ 'sanctum' ]
			},
			{
				type: "quest",
				id: 'rainbow-bridge',
				description: "Rainbow Drop",
				action: Actions.USE,
				position: {
					x: charlock.x + 17,
					y: charlock.y - 1
				},
				quests: [ 'rainbow-drop' ]
			},
			{
				type: "quest",
				id: 'charlock',
				description: "Charlock Castle",
				action: Actions.WALK,
				position: {
					x: charlock.x,
					y: charlock.y
				},
				quests: [ 'rainbow-bridge' ]
			},
			{
				type: "quest",
				id: 'sword-of-erdrick',
				description: "Erdrick's sword",
				action: Actions.TAKE,
				position: {
					x: clB3.x + 0.5,
					y: clB3.y - 0.5
				},
				quests: [ 'charlock' ]
			},
			{
				type: "quest",
				id: 'cl-b6',
				description: "Basement 6",
				action: Actions.WALK,
				position: {
					x: clB6.x - 4.5,
					y: clB6.y + 4.5					
				},
				quests: [ 'charlock' ]
			},
			{
				type: "quest",
				id: 'cl-b7',
				description: "Basement 7",
				action: Actions.WALK,
				position: {
					x: clB7.x + 4.5,
					y: clB7.y - 2.5					
				},
				quests: [ 'cl-b6' ]
			},
			{
				type: "quest",
				id: 'dragonlord',
				description: "Dragonlord",
				action: "Defeat",
				position: {
					x: clB8.x + 1.5,
					y: clB8.y - 9
				},
				quests: [ 'cl-b7' ]
			},
			{
				type: "quest",
				id: 'final',
				description: "King Lorik",
				action: "Talk to",
				position: {
					x: lorik.x,
					y: lorik.y
				},
				quests: [ 'dragonlord' ]
			},
			// Editor - Substrates
			{
				type: 'substrate',
				position: {
					x: tgF1.x,
					y: tgF1.y
				},
				width: 30,
				height: 30,
				image: 'img/ss.png'
			},
			{
				type: 'substrate',
				position: {
					x: alefgard.x,
					y: alefgard.y
				},
				width: 126,
				height: 126,
				image: 'img/w.png'
			},
			{
				type: 'substrate',
				position: {
					x: rdF1.x,
					y: rdF1.y
				},
				width: 30,
				height: 30,
				image: 'img/rimuldar.png'
			},
			{
				type: 'substrate',
				position: {
					x: bnF1.x,
					y: bnF1.y
				},
				width: 30,
				height: 30,
				image: 'img/brecconary.png'
			},
			{
				type: 'substrate',
				position: {
					x: ctF1.x,
					y: ctF1.y
				},
				width: 30,
				height: 30,
				image: 'img/cantlin.png'
			},
			// Erdrick's cave
			{
				type: 'substrate',
				position: {
					x: ecB1.x,
					y: ecB1.y
				},
				width: 12,
				height: 12,
				image: 'img/erdricks_cave_b1.png'
			},
			{
				type: 'substrate',
				position: {
					x: ecB2.x,
					y: ecB2.y
				},
				width: 12,
				height: 12,
				image: 'img/erdricks_cave_b2.png'
			},
			// Garinham
			{
				type: 'substrate',
				position: {
					x: ghF1.x,
					y: ghF1.y
				},
				width: 20,
				height: 20,
				image: 'img/garinham.png'
			},
			{
				type: 'substrate',
				position: {
					x: ghB1.x,
					y: ghB1.y
				},
				width: 22,
				height: 22,
				image: 'img/garins_grave_b1.png'
			},
			{
				type: 'substrate',
				position: {
					x: ghB2.x,
					y: ghB2.y
				},
				width: 16,
				height: 14,
				image: 'img/garins_grave_b2.png'
			},
			{
				type: 'substrate',
				position: {
					x: ghB3.x,
					y: ghB3.y
				},
				width: 22,
				height: 22,
				image: 'img/garins_grave_b3.png'
			},
			{
				type: 'substrate',
				position: {
					x: ghB4.x,
					y: ghB4.y
				},
				width: 12,
				height: 11,
				image: 'img/garins_grave_b4.png'
			},

			{
				type: 'substrate',
				position: {
					x: hnF1.x,
					y: hnF1.y
				},
				width: 20,
				height: 20,
				image: 'img/hauksness.png'
			},
			{
				type: 'substrate',
				position: {
					x: kolF1.x,
					y: kolF1.y
				},
				width: 24,
				height: 24,
				image: 'img/kol.png'
			},
			{
				type: 'substrate',
				position: {
					x: mcB1.x,
					y: mcB1.y
				},
				width: 16,
				height: 16,
				image: 'img/mountain_cave_b1.png'
			},
			{
				type: 'substrate',
				position: {
					x: mcB2.x,
					y: mcB2.y
				},
				width: 16,
				height: 16,
				image: 'img/mountain_cave_b2.png'
			},
			{
				type: 'substrate',
				position: {
					x: rsB1.x,
					y: rsB1.y
				},
				width: 12,
				height: 12,
				image: 'img/rain_shrine.png'
			},
			{
				type: 'substrate',
				position: {
					x: stB1.x,
					y: stB1.y
				},
				width: 12,
				height: 12,
				image: 'img/sanctum.png'
			},
			{
				type: 'substrate',
				position: {
					x: scB1.x,
					y: scB1.y
				},
				width: 8,
				height: 33,
				image: 'img/swamp_cave.png'
			},
			// charlock
			{
				type: 'substrate',
				position: {
					x: clB1.x,
					y: clB1.y
				},
				width: 20,
				height: 20,
				image: 'img/charlock_b1.png'
			},
			{
				type: 'substrate',
				position: {
					x: clB2.x,
					y: clB2.y
				},
				width: 22,
				height: 22,
				image: 'img/charlock_b2.png'
			},
			{
				type: 'substrate',
				position: {
					x: clB3.x,
					y: clB3.y
				},
				width: 12,
				height: 12,
				image: 'img/charlock_b3.png'
			},
			{
				type: 'substrate',
				position: {
					x: clB4.x,
					y: clB4.y
				},
				width: 12,
				height: 12,
				image: 'img/charlock_b4.png'
			},
			{
				type: 'substrate',
				position: {
					x: clB5.x,
					y: clB5.y
				},
				width: 12,
				height: 12,
				image: 'img/charlock_b5.png'
			},
			{
				type: 'substrate',
				position: {
					x: clB6.x,
					y: clB6.y
				},
				width: 12,
				height: 12,
				image: 'img/charlock_b6.png'
			},
			{
				type: 'substrate',
				position: {
					x: clB7.x,
					y: clB7.y
				},
				width: 12,
				height: 12,
				image: 'img/charlock_b7.png'
			},
			{
				type: 'substrate',
				position: {
					x: clB8.x,
					y: clB8.y
				},
				width: 30,
				height: 31,
				image: 'img/charlock_b8.png'
			},
			//
			{
				"type": "tileset",
				"tiles": {
					"barrier": "img/tilesets/dw/barrier.png",
					"brick": "img/tilesets/dw/brick.png",
					"bridge": "img/tilesets/dw/bridge.png",
					"castle": "img/tilesets/dw/castle.png",
					"cave": "img/tilesets/dw/cave.png",
					"chest": "img/tilesets/dw/chest.png",
					"desert": "img/tilesets/dw/desert.png",
					"door": "img/tilesets/dw/door.png",
					"dungeon": "img/tilesets/dw/dungeon.png",
					"grass": "img/tilesets/dw/grass.png",
					"hill": "img/tilesets/dw/hill.png",
					"king": "img/tilesets/dw/king.png",
					"mountain": "img/tilesets/dw/mountain.png",
					"seller": "img/tilesets/dw/seller.png",
					"stairs_down": "img/tilesets/dw/stairs_down.png",
					"stairs_up": "img/tilesets/dw/stairs_up.png",
					"swamp": "img/tilesets/dw/swamp.png",
					"table": "img/tilesets/dw/table.png",
					"trees": "img/tilesets/dw/trees.png",
					"village": "img/tilesets/dw/village.png",
					"wall": "img/tilesets/dw/wall.png",
					"water": "img/tilesets/dw/water.png"
				}
			},
			// Tantegel Floor 2
			{
				"type": "tilefield",
				"size": {
					"x": 10,
					"y": 8
				},
				"tileSize": {
					"x": 1,
					"y": 1
				},
				"position": {
					"x": tgF2Room.x,
					"y": tgF2Room.y
				},
				"tiles": [
					"wall",
					"wall",
					"wall",
					"wall",
					"wall",
					"wall",
					"wall",
					"wall",
					"wall",
					"wall",
					"wall",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"wall",
					"wall",
					"brick",
					"table",
					"table",
					"table",
					"table",
					"table",
					"table",
					"brick",
					"wall",
					"wall",
					"brick",
					"table",
					"king",
					"table",
					"table",
					"brick",
					"table",
					"brick",
					"wall",
					"wall",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"wall",
					"wall",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"wall",
					"wall",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"wall",
					"wall",
					"wall",
					"wall",
					"wall",
					"brick",
					"wall",
					"wall",
					"wall",
					"wall",
					"wall"
				],
				quests: []
			},
			{
				"type": "tilefield",
				"size": {
					"x": 10,
					"y": 2
				},
				"tileSize": {
					"x": 1,
					"y": 1
				},
				"position": {
					"x": tgF2Passage.x,
					"y": tgF2Passage.y
				},
				"tiles": [
					"wall",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"stairs_down",
					"wall",
					"wall",
					"wall",
					"wall",
					"wall",
					"wall",
					"wall",
					"wall",
					"wall",
					"wall",
					"wall"
				],
				quests: [ 'tg-first-floor' ]
			},
			{
				"type": "tilefield",
				"size": {
					"x": 1,
					"y": 1
				},
				"tileSize": {
					"x": 1,
					"y": 1
				},
				"position": {
					"x": tgF2Key.x,
					"y": tgF2Key.y
				},
				"tiles": [
					"chest",
				],
				quests: [ 'lorik', 'first-key' ]
			},
			{
				"type": "tilefield",
				"size": {
					"x": 1,
					"y": 1
				},
				"tileSize": {
					"x": 1,
					"y": 1
				},
				"position": {
					"x": tgF2Gold.x,
					"y": tgF2Gold.y
				},
				"tiles": [
					"chest",
				],
				quests: [ 'lorik', 'first-gold' ]
			},
			{
				"type": "tilefield",
				"size": {
					"x": 1,
					"y": 1
				},
				"tileSize": {
					"x": 1,
					"y": 1
				},
				"position": {
					"x": tgF2Torch.x,
					"y": tgF2Torch.y
				},
				"tiles": [
					"chest",
				],
				quests: [ 'lorik', 'first-torch' ]
			},
			{
				"type": "tilefield",
				"size": {
					"x": 1,
					"y": 1
				},
				"tileSize": {
					"x": 1,
					"y": 1
				},
				"position": {
					"x": tgF2Door.x,
					"y": tgF2Door.y
				},
				"tiles": [
					"door",
				],
				quests: [ 'lorik', 'first-key', 'first-door' ]
			},
			// navigation
			{
				'type': 'location',
				'id': 'tg-f2-1',
				'position': {
					'x': tgF2.x - 1.5,
					'y': tgF2.y + 0.5
				}
			},
			{
				'type': 'location',
				'id': 'tg-f2-2',
				'position': {
					'x': tgF2.x - 3.5,
					'y': tgF2.y + 0.5
				}
			},
			{
				type: 'path',
				from: 'tg-f2-1',
				to: 'tg-f2-2',
				hasReversed: true
			},
			{
				'type': 'location',
				'id': 'tg-f2-3',
				'position': {
					'x': tgF2.x - 3.5,
					'y': tgF2.y + 3.5
				}
			},
			{
				type: 'path',
				from: 'tg-f2-2',
				to: 'tg-f2-3',
				hasReversed: true
			},
			{
				'type': 'location',
				'id': 'tg-f2-4',
				'position': {
					'x': tgF2.x + 1.5,
					'y': tgF2.y + 3.5
				}
			},
			{
				type: 'path',
				from: 'tg-f2-3',
				to: 'tg-f2-4',
				hasReversed: true
			},
			{
				'type': 'location',
				'id': 'tg-f2-5',
				'position': {
					'x': tgF2.x + 3.5,
					'y': tgF2.y + 3.5
				}
			},
			{
				type: 'path',
				from: 'tg-f2-4',
				to: 'tg-f2-5',
				hasReversed: true
			},
			{
				'type': 'location',
				'id': 'tg-f2-6',
				'position': {
					'x': tgF2.x + 3.5,
					'y': tgF2.y + 0.5
				}
			},
			{
				type: 'path',
				from: 'tg-f2-5',
				to: 'tg-f2-6',
				hasReversed: true
			},
			{
				'type': 'location',
				'id': 'tg-f2-7',
				'position': {
					'x': tgF2.x + 0.5,
					'y': tgF2.y + 0.5
				}
			},
			{
				type: 'path',
				from: 'tg-f2-6',
				to: 'tg-f2-7',
				hasReversed: true
			},
			{
				'type': 'location',
				'id': 'tg-f2-8',
				'position': {
					'x': tgF2.x - 0.5,
					'y': tgF2.y + 0.5
				}
			},
			{
				type: 'path',
				from: 'tg-f2-7',
				to: 'tg-f2-8',
				hasReversed: true
			},
			{
				type: 'path',
				from: 'tg-f2-1',
				to: 'tg-f2-8',
				hasReversed: true
			},
			{
				'type': 'location',
				'id': 'tg-f2-9',
				'position': {
					'x': tgF2.x - 0.5,
					'y': tgF2.y - 1.5
				}
			},
			{
				type: 'path',
				from: 'tg-f2-8',
				to: 'tg-f2-9',
				hasReversed: true
			},
			{
				'type': 'location',
				'id': 'tg-f2-10',
				'position': {
					'x': tgF2.x - 0.5,
					'y': tgF2.y - 3.5
				}
			},
			{
				type: 'path',
				from: 'tg-f2-9',
				to: 'tg-f2-10',
				hasReversed: true
			},
			{
				'type': 'location',
				'id': 'tg-f2-11',
				'position': {
					'x': tgF2.x + 3.5,
					'y': tgF2.y - 3.5
				}
			},
			{
				type: 'path',
				from: 'tg-f2-10',
				to: 'tg-f2-11',
				hasReversed: true
			},
			// Tantegel Floor 1
			{
				"type": "tilefield",
				"size": {
					"x": 22,
					"y": 30
				},
				"tileSize": {
					"x": 1,
					"y": 1
				},
				"position": {
					"x": tgF1.x - 4,
					"y": tgF1.y
				},
				"tiles": [
					"wall",
					"wall",
					"wall",
					"wall",
					"wall",
					"wall",
					"wall",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"wall",
					"wall",
					"wall",
					"wall",
					"wall",
					"wall",
					"wall",
					"wall",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"wall",
					"grass",
					"trees",
					"grass",
					"trees",
					"trees",
					"grass",
					"trees",
					"grass",
					"wall",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"wall",
					"wall",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"wall",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"wall",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"wall",
					"wall",
					"brick",
					"brick",
					"wall",
					"brick",
					"brick",
					"wall",
					"wall",
					"wall",
					"wall",
					"brick",
					"brick",
					"wall",
					"wall",
					"wall",
					"wall",
					"brick",
					"brick",
					"wall",
					"brick",
					"brick",
					"wall",
					"wall",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"wall",
					"wall",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"wall",
					"wall",
					"wall",
					"wall",
					"wall",
					"wall",
					"wall",
					"wall",
					"wall",
					"wall",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"wall",
					"wall",
					"wall",
					"wall",
					"wall",
					"wall",
					"brick",
					"wall",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"wall",
					"wall",
					"wall",
					"brick",
					"wall",
					"wall",
					"wall",
					"wall",
					"brick",
					"brick",
					"brick",
					"wall",
					"brick",
					"wall",
					"stairs_up",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"wall",
					"brick",
					"wall",
					"",
					"",
					"",
					"",
					"",
					"",
					"wall",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"wall",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"wall",
					"",
					"",
					"",
					"",
					"",
					"",
					"wall",
					"brick",
					"brick",
					"brick",
					"wall",
					"brick",
					"wall",
					"wall",
					"wall",
					"brick",
					"brick",
					"brick",
					"brick",
					"wall",
					"wall",
					"wall",
					"",
					"",
					"",
					"",
					"",
					"",
					"wall",
					"wall",
					"wall",
					"wall",
					"wall",
					"brick",
					"wall",
					"trees",
					"trees",
					"brick",
					"brick",
					"brick",
					"brick",
					"trees",
					"trees",
					"wall",
					"",
					"",
					"",
					"",
					"",
					"",
					"",
					"",
					"",
					"",
					"wall",
					"brick",
					"wall",
					"trees",
					"trees",
					"brick",
					"brick",
					"brick",
					"brick",
					"trees",
					"trees",
					"wall",
					"",
					"",
					"",
					"",
					"",
					"",
					"",
					"",
					"",
					"",
					"wall",
					"brick",
					"wall",
					"trees",
					"grass",
					"brick",
					"brick",
					"brick",
					"brick",
					"grass",
					"trees",
					"wall",
					"",
					"",
					"",
					"",
					"",
					"",
					"",
					"",
					"",
					"",
					"brick",
					"brick",
					"wall",
					"grass",
					"grass",
					"brick",
					"brick",
					"brick",
					"brick",
					"grass",
					"grass",
					"wall",
					"",
					"",
					"",
					"",
					"",
					"",
					"",
					"",
					"",
					"",
					"wall",
					"brick",
					"wall",
					"grass",
					"grass",
					"brick",
					"brick",
					"brick",
					"brick",
					"grass",
					"grass",
					"wall",
					"",
					"",
					"",
					"",
					"",
					"",
					"",
					"",
					"",
					"",
					"wall",
					"brick",
					"wall",
					"grass",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"grass",
					"wall",
					"",
					"",
					"",
					"",
					"",
					"",
					"wall",
					"wall",
					"wall",
					"wall",
					"wall",
					"brick",
					"wall",
					"grass",
					"brick",
					"water",
					"water",
					"water",
					"water",
					"brick",
					"grass",
					"wall",
					"wall",
					"wall",
					"wall",
					"wall",
					"wall",
					"wall",
					"wall",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"water",
					"barrier",
					"barrier",
					"water",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"wall",
					"wall",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"water",
					"barrier",
					"barrier",
					"water",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"wall",
					"wall",
					"wall",
					"wall",
					"brick",
					"brick",
					"wall",
					"wall",
					"wall",
					"brick",
					"water",
					"water",
					"water",
					"water",
					"brick",
					"wall",
					"wall",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"wall",
					"wall",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"wall",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"wall",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"wall",
					"wall",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"wall",
					"wall",
					"brick",
					"brick",
					"brick",
					"brick",
					"wall",
					"wall",
					"wall",
					"wall",
					"wall",
					"wall",
					"brick",
					"brick",
					"wall",
					"wall",
					"brick",
					"brick",
					"wall",
					"brick",
					"brick",
					"brick",
					"brick",
					"wall",
					"brick",
					"brick",
					"brick",
					"brick",
					"wall",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"wall",
					"wall",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"wall",
					"brick",
					"brick",
					"brick",
					"brick",
					"wall",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"wall",
					"wall",
					"brick",
					"water",
					"water",
					"brick",
					"brick",
					"wall",
					"brick",
					"wall",
					"brick",
					"brick",
					"brick",
					"brick",
					"wall",
					"brick",
					"brick",
					"wall",
					"wall",
					"wall",
					"wall",
					"wall",
					"wall",
					"wall",
					"water",
					"water",
					"water",
					"water",
					"brick",
					"brick",
					"brick",
					"wall",
					"brick",
					"brick",
					"brick",
					"brick",
					"wall",
					"brick",
					"brick",
					"wall",
					"brick",
					"brick",
					"wall",
					"brick",
					"wall",
					"wall",
					"water",
					"water",
					"water",
					"water",
					"brick",
					"brick",
					"brick",
					"wall",
					"wall",
					"brick",
					"brick",
					"wall",
					"wall",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"table",
					"seller",
					"wall",
					"wall",
					"water",
					"water",
					"water",
					"water",
					"water",
					"brick",
					"brick",
					"wall",
					"brick",
					"brick",
					"brick",
					"brick",
					"wall",
					"brick",
					"brick",
					"wall",
					"brick",
					"brick",
					"wall",
					"brick",
					"wall",
					"wall",
					"wall",
					"wall",
					"wall",
					"wall",
					"wall",
					"wall",
					"wall",
					"wall",
					"wall",
					"brick",
					"brick",
					"wall",
					"wall",
					"wall",
					"wall",
					"wall",
					"wall",
					"wall",
					"wall",
					"wall",
					"wall",
					"water",
					"water",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"brick",
					"brick",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"water",
					"water"
				],
				quests: []
			},
			{
				"type": "tilefield",
				"size": {
					"x": 4,
					"y": 5
				},
				"tileSize": {
					"x": 1,
					"y": 1
				},
				"position": {
					"x": tgF1.x - 13,
					"y": tgF1.y + 1.5
				},
				"tiles": [
					"wall",
					"brick",
					"brick",
					"brick",
					"wall",
					"brick",
					"brick",
					"brick",
					"wall",
					"brick",
					"brick",
					"brick",
					"wall",
					"brick",
					"brick",
					"brick",
					"wall",
					"brick",
					"brick",
					"brick"
				],
				quests: []
			},
			{
				"type": "tilefield",
				"size": {
					"x": 3,
					"y": 3
				},
				"tileSize": {
					"x": 1,
					"y": 1
				},
				"position": {
					"x": tgF1.x - 12.5,
					"y": tgF1.y + 0.5
				},
				"tiles": [
					'chest',
					'',
					'',
					'',
					'chest',
					'',
					'chest',
					'',
					'chest',
				],
				quests: []
			},
			{
				"type": "tilefield",
				"size": {
					"x": 1,
					"y": 1
				},
				"tileSize": {
					"x": 1,
					"y": 1
				},
				"position": {
					"x": tgStorageDoor.x,
					"y": tgStorageDoor.y
				},
				"tiles": [ 'door' ],
				quests: [ 'magic-keys' ]
			},
			{
				"type": "tilefield",
				"size": {
					"x": 1,
					"y": 1
				},
				"tileSize": {
					"x": 1,
					"y": 1
				},
				"position": {
					"x": tgF1.x + 3.5,
					"y": tgF1.y + 8.5
				},
				"tiles": [ 'door' ],
				quests: [ 'magic-keys' ]
			},
			{
				"type": "tilefield",
				"size": {
					"x": 14,
					"y": 30
				},
				"tileSize": {
					"x": 1,
					"y": 1
				},
				"position": {
					"x": tgF1.x + 8,
					"y": tgF1.y
				},
				"tiles": [ 
					"",
					"",
					"",
					"",
					"",
					"",
					"grass",
					"wall",
					"wall",
					"wall",
					"grass",
					"trees",
					"grass",
					"grass",
					"",
					"",
					"",
					"",
					"",
					"",
					"grass",
					"wall",
					"seller",
					"wall",
					"grass",
					"grass",
					"grass",
					"grass",
					"",
					"",
					"",
					"",
					"",
					"",
					"grass",
					"wall",
					"table",
					"wall",
					"grass",
					"grass",
					"grass",
					"grass",
					"",
					"",
					"",
					"",
					"",
					"",
					"grass",
					"grass",
					"grass",
					"trees",
					"trees",
					"grass",
					"grass",
					"grass",
					"",
					"",
					"",
					"",
					"",
					"",
					"grass",
					"trees",
					"trees",
					"trees",
					"grass",
					"grass",
					"grass",
					"grass",
					"",
					"",
					"",
					"",
					"",
					"",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"",
					"",
					"",
					"",
					"",
					"",
					"wall",
					"wall",
					"brick",
					"wall",
					"wall",
					"wall",
					"grass",
					"grass",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"wall",
					"grass",
					"grass",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"wall",
					"grass",
					"grass",
					"wall",
					"wall",
					"wall",
					"wall",
					"wall",
					"wall",
					"wall",
					"wall",
					"wall",
					"brick",
					"brick",
					"wall",
					"grass",
					"grass",
					"brick",
					"brick",
					"wall",
					"brick",
					"brick",
					"wall",
					"brick",
					"brick",
					"wall",
					"brick",
					"brick",
					"wall",
					"grass",
					"grass",
					"brick",
					"brick",
					"wall",
					"brick",
					"brick",
					"wall",
					"brick",
					"brick",
					"wall",
					"brick",
					"brick",
					"wall",
					"grass",
					"grass",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"wall",
					"grass",
					"grass",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"wall",
					"grass",
					"grass",
					"brick",
					"brick",
					"wall",
					"brick",
					"brick",
					"wall",
					"brick",
					"brick",
					"wall",
					"brick",
					"brick",
					"wall",
					"grass",
					"grass",
					"brick",
					"brick",
					"wall",
					"brick",
					"brick",
					"wall",
					"brick",
					"brick",
					"wall",
					"brick",
					"brick",
					"wall",
					"grass",
					"grass",
					"",
					"",
					"",
					"",
					"",
					"",
					"wall",
					"wall",
					"wall",
					"brick",
					"wall",
					"wall",
					"grass",
					"grass",
					"",
					"",
					"",
					"",
					"",
					"",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"wall",
					"grass",
					"grass",
					"",
					"",
					"",
					"",
					"",
					"",
					"barrier",
					"barrier",
					"barrier",
					"barrier",
					"barrier",
					"wall",
					"grass",
					"grass",
					"",
					"",
					"",
					"",
					"",
					"",
					"barrier",
					"barrier",
					"barrier",
					"barrier",
					"barrier",
					"wall",
					"grass",
					"grass",
					"",
					"",
					"",
					"",
					"",
					"",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"wall",
					"grass",
					"grass",
					"",
					"",
					"",
					"",
					"",
					"",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"wall",
					"water",
					"grass",
					"",
					"",
					"",
					"",
					"",
					"",
					"wall",
					"wall",
					"wall",
					"wall",
					"wall",
					"wall",
					"water",
					"grass",
					"",
					"",
					"",
					"",
					"",
					"",
					"water",
					"water",
					"water",
					"water",
					"water",
					"water",
					"water",
					"grass",
					"",
					"",
					"",
					"",
					"",
					"",
					"water",
					"water",
					"water",
					"water",
					"water",
					"water",
					"water",
					"grass",
					"",
					"",
					"",
					"",
					"",
					"",
					"water",
					"water",
					"water",
					"water",
					"water",
					"water",
					"water",
					"grass",
					"",
					"",
					"",
					"",
					"",
					"",
					"water",
					"water",
					"water",
					"water",
					"water",
					"water",
					"water",
					"grass",
					"",
					"",
					"",
					"",
					"",
					"",
					"water",
					"water",
					"water",
					"water",
					"water",
					"water",
					"water",
					"grass",
					"",
					"",
					"",
					"",
					"",
					"",
					"water",
					"water",
					"water",
					"water",
					"water",
					"water",
					"water",
					"grass",
					"",
					"",
					"",
					"",
					"",
					"",
					"water",
					"water",
					"water",
					"water",
					"water",
					"water",
					"water",
					"stairs_down"
				],
				quests: [ 'magic-keys' ]
			},
			// navigation
			{
				type: 'location',
				id: 'tg-f1-f2',
				position: {
					x: tgF1.x - 7.5,
					y: tgF1.y + 7.5
				}
			},
			{
				type: 'path',
				from: 'tg-f2-11',
				to: 'tg-f1-f2',
				distance: 0.1,
				hasReversed: true
			},
			{
				type: 'location',
				id: 'tg-f1-1',
				position: {
					x: tgF1.x - 5.5,
					y: tgF1.y + 7.5
				}
			},
			{
				type: 'path',
				from: 'tg-f1-f2',
				to: 'tg-f1-1',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'tg-f1-2',
				position: {
					x: tgF1.x - 5.5,
					y: tgF1.y - 0.5
				}
			},
			{
				type: 'path',
				from: 'tg-f1-1',
				to: 'tg-f1-2',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'tg-f1-3',
				position: {
					x: tgF1.x - 6.5,
					y: tgF1.y - 0.5
				}
			},
			{
				type: 'path',
				from: 'tg-f1-2',
				to: 'tg-f1-3',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'tg-f1-4',
				position: {
					x: tgF1.x - 6.5,
					y: tgF1.y - 2.5
				}
			},
			{
				type: 'path',
				from: 'tg-f1-3',
				to: 'tg-f1-4',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'tg-f1-5',
				position: {
					x: tgF1.x - 6.5,
					y: tgF1.y - 5.5
				}
			},
			{
				type: 'path',
				from: 'tg-f1-4',
				to: 'tg-f1-5',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'tg-f1-6',
				position: {
					x: tgF1.x - 4.5,
					y: tgF1.y - 5.5
				}
			},
			{
				type: 'path',
				from: 'tg-f1-5',
				to: 'tg-f1-6',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'tg-f1-ent',
				position: {
					x: tgF1.x - 4.5,
					y: tgF1.y - 14.5
				}
			},
			{
				type: 'path',
				from: 'tg-f1-6',
				to: 'tg-f1-ent',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'tg-f1-7',
				position: {
					x: tgF1.x - 9.5,
					y: tgF1.y - 2.5
				}
			},
			{
				type: 'path',
				from: 'tg-f1-7',
				to: 'tg-f1-4',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'tg-f1-8',
				position: {
					x: tgF1.x - 9.5,
					y: tgF1.y + 1.5
				}
			},
			{
				type: 'path',
				from: 'tg-f1-7',
				to: 'tg-f1-8',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'tg-f1-9',
				position: {
					x: tgF1.x - 9.5,
					y: tgF1.y + 10.5
				}
			},
			{
				type: 'path',
				from: 'tg-f1-8',
				to: 'tg-f1-9',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'tg-f1-10',
				position: {
					x: tgF1.x + 3.5,
					y: tgF1.y + 10.5
				}
			},
			{
				type: 'path',
				from: 'tg-f1-10',
				to: 'tg-f1-9',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'tg-f1-11',
				position: {
					x: tgF1.x + 3.5,
					y: tgF1.y + 9.5
				}
			},
			{
				type: 'path',
				from: 'tg-f1-10',
				to: 'tg-f1-11',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'tg-f1-12',
				position: {
					x: tgF1.x + 3.5,
					y: tgF1.y + 7.5
				}
			},
			{
				type: 'path',
				from: 'tg-f1-12',
				to: 'tg-f1-11',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'tg-f1-13',
				position: {
					x: tgF1.x + 9.5,
					y: tgF1.y + 7.5
				}
			},
			{
				type: 'path',
				from: 'tg-f1-12',
				to: 'tg-f1-13',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'tg-f1-14',
				position: {
					x: tgF1.x + 9.5,
					y: tgF1.y + 9.5
				}
			},
			{
				type: 'path',
				from: 'tg-f1-14',
				to: 'tg-f1-13',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'tg-f1-15',
				position: {
					x: tgF1.x + 14.5,
					y: tgF1.y + 9.5
				}
			},
			{
				type: 'path',
				from: 'tg-f1-14',
				to: 'tg-f1-15',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'tg-f1-b1',
				position: {
					x: tgF1.x + 14.5,
					y: tgF1.y - 14.5
				}
			},
			{
				type: 'path',
				from: 'tg-f1-b1',
				to: 'tg-f1-15',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'tg-f1-16',
				position: {
					x: tgF1.x - 12.5,
					y: tgF1.y + 1.5
				}
			},
			{
				type: 'path',
				from: 'tg-f1-8',
				to: 'tg-f1-16',
				hasReversed: true
			},
			// Tantegel Floor B1
			{
				"type": "tilefield",
				"size": {
					"x": 12,
					"y": 12
				},
				"tileSize": {
					"x": 1,
					"y": 1
				},
				"position": {
					"x": tgB1.x,
					"y": tgB1.y
				},
				"tiles": [
					"",
					"wall",
					"wall",
					"wall",
					"wall",
					"wall",
					"wall",
					"wall",
					"wall",
					"wall",
					"wall",
					"",
					"wall",
					"wall",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"wall",
					"wall",
					"wall",
					"brick",
					"wall",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"wall",
					"brick",
					"wall",
					"wall",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"wall",
					"wall",
					"brick",
					"brick",
					"brick",
					"wall",
					"wall",
					"wall",
					"wall",
					"brick",
					"brick",
					"brick",
					"wall",
					"wall",
					"stairs_up",
					"brick",
					"brick",
					"wall",
					"brick",
					"brick",
					"wall",
					"brick",
					"brick",
					"brick",
					"wall",
					"wall",
					"brick",
					"brick",
					"brick",
					"wall",
					"brick",
					"brick",
					"wall",
					"brick",
					"brick",
					"brick",
					"wall",
					"wall",
					"brick",
					"brick",
					"brick",
					"wall",
					"brick",
					"brick",
					"wall",
					"brick",
					"brick",
					"brick",
					"wall",
					"wall",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"wall",
					"wall",
					"brick",
					"wall",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"wall",
					"brick",
					"wall",
					"wall",
					"wall",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"wall",
					"wall",
					"",
					"wall",
					"wall",
					"wall",
					"wall",
					"wall",
					"wall",
					"wall",
					"wall",
					"wall",
					"wall",
					""
				],
				quests: [ 'magic-keys' ]
			},
			{
				"type": "tilefield",
				"size": {
					"x": 1,
					"y": 1
				},
				"tileSize": {
					"x": 1,
					"y": 1
				},
				"position": {
					"x": stones.x,
					"y": stones.y
				},
				"tiles": [ 'chest' ],
				quests: [ 'magic-keys' ]
			},
			// navigation
			{
				type: 'location',
				id: 'tg-b1-f1',
				position: {
					x: tgB1.x - 4.5,
					y: tgB1.y + 0.5
				}
			},
			{
				type: 'path',
				from: 'tg-f1-b1',
				to: 'tg-b1-f1',
				distance: 0.1,
				hasReversed: true
			},
			{
				type: 'location',
				id: 'tg-b1-1',
				position: {
					x: tgB1.x - 2.5,
					y: tgB1.y + 0.5
				}
			},
			{
				type: 'path',
				from: 'tg-b1-1',
				to: 'tg-b1-f1',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'tg-b1-2',
				position: {
					x: tgB1.x - 2.5,
					y: tgB1.y - 2.5
				}
			},
			{
				type: 'path',
				from: 'tg-b1-1',
				to: 'tg-b1-2',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'tg-b1-3',
				position: {
					x: tgB1.x + 0.5,
					y: tgB1.y - 2.5
				}
			},
			{
				type: 'path',
				from: 'tg-b1-3',
				to: 'tg-b1-2',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'tg-b1-4',
				position: {
					x: tgB1.x + 0.5,
					y: tgB1.y - 0.5
				}
			},
			{
				type: 'path',
				from: 'tg-b1-3',
				to: 'tg-b1-4',
				hasReversed: true
			},
			// Brecconary
			{
				"type": "tilefield",
				"size": {
					"x": 6,
					"y": 3
				},
				"tileSize": {
					"x": 1,
					"y": 1
				},
				"position": {
					"x": bnF1.x + 9,
					"y": bnF1.y + 10.5
				},
				"tiles": [
					"brick",
					"brick",
					"wall",
					"brick",
					"water",
					"water",
					"brick",
					"brick",
					"table",
					"seller",
					"water",
					"water",
					"brick",
					"brick",
					"wall",
					"brick",
					"water",
					"water"
				],
				quests: [ 'brecconary' ]
			},
			{
				"type": "tilefield",
				"size": {
					"x": 2,
					"y": 6
				},
				"tileSize": {
					"x": 1,
					"y": 1
				},
				"position": {
					"x": bnF1.x - 11,
					"y": bnF1.y - 9
				},
				"tiles": [ 
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"wall",
					"brick",
					"brick",
					"brick",
					"brick"
				],
				quests: [ 'brecconary' ]
			},
			{
				"type": "tilefield",
				"size": {
					"x": 30,
					"y": 30
				},
				"tileSize": {
					"x": 1,
					"y": 1
				},
				"position": {
					"x": bnF1.x,
					"y": bnF1.y
				},
				"tiles": [
					"wall",
					"wall",
					"wall",
					"wall",
					"wall",
					"wall",
					"wall",
					"wall",
					"wall",
					"wall",
					"wall",
					"wall",
					"wall",
					"desert",
					"brick",
					"brick",
					"desert",
					"wall",
					"wall",
					"wall",
					"wall",
					"wall",
					"wall",
					"wall",
					"wall",
					"wall",
					"wall",
					"wall",
					"wall",
					"wall",
					"wall",
					"trees",
					"trees",
					"trees",
					"grass",
					"grass",
					"grass",
					"grass",
					"trees",
					"trees",
					"trees",
					"trees",
					"desert",
					"desert",
					"brick",
					"brick",
					"desert",
					"desert",
					"trees",
					"trees",
					"trees",
					"trees",
					"trees",
					"trees",
					"trees",
					"trees",
					"trees",
					"trees",
					"trees",
					"wall",
					"wall",
					"trees",
					"trees",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"trees",
					"grass",
					"trees",
					"grass",
					"desert",
					"brick",
					"brick",
					"desert",
					"grass",
					"grass",
					"trees",
					"wall",
					"wall",
					"wall",
					"wall",
					"wall",
					"wall",
					"wall",
					"wall",
					"trees",
					"wall",
					"wall",
					"trees",
					"grass",
					"wall",
					"wall",
					"wall",
					"wall",
					"wall",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"brick",
					"brick",
					"grass",
					"grass",
					"grass",
					"trees",
					"wall",
					"",
					"",
					"",
					"",
					"",
					"",
					"wall",
					"trees",
					"wall",
					"wall",
					"trees",
					"grass",
					"wall",
					"brick",
					"seller",
					"brick",
					"wall",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"brick",
					"brick",
					"desert",
					"grass",
					"grass",
					"grass",
					"wall",
					"",
					"",
					"",
					"",
					"",
					"",
					"wall",
					"trees",
					"wall",
					"wall",
					"trees",
					"grass",
					"wall",
					"brick",
					"table",
					"brick",
					"wall",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"brick",
					"brick",
					"desert",
					"grass",
					"trees",
					"grass",
					"wall",
					"",
					"",
					"",
					"",
					"",
					"",
					"wall",
					"trees",
					"wall",
					"wall",
					"trees",
					"grass",
					"wall",
					"wall",
					"brick",
					"wall",
					"wall",
					"grass",
					"grass",
					"desert",
					"desert",
					"grass",
					"grass",
					"brick",
					"brick",
					"desert",
					"desert",
					"trees",
					"grass",
					"wall",
					"",
					"wall",
					"wall",
					"wall",
					"wall",
					"wall",
					"wall",
					"grass",
					"wall",
					"wall",
					"trees",
					"grass",
					"grass",
					"grass",
					"brick",
					"",
					"grass",
					"grass",
					"desert",
					"desert",
					"desert",
					"desert",
					"grass",
					"brick",
					"brick",
					"desert",
					"grass",
					"trees",
					"grass",
					"grass",
					"grass",
					"grass",
					"trees",
					"grass",
					"grass",
					"trees",
					"grass",
					"grass",
					"wall",
					"wall",
					"trees",
					"trees",
					"grass",
					"grass",
					"brick",
					"grass",
					"grass",
					"desert",
					"desert",
					"trees",
					"desert",
					"desert",
					"grass",
					"brick",
					"brick",
					"desert",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"trees",
					"trees",
					"trees",
					"trees",
					"trees",
					"trees",
					"grass",
					"wall",
					"wall",
					"trees",
					"grass",
					"grass",
					"grass",
					"brick",
					"grass",
					"grass",
					"desert",
					"trees",
					"trees",
					"trees",
					"desert",
					"desert",
					"brick",
					"brick",
					"grass",
					"grass",
					"wall",
					"wall",
					"wall",
					"wall",
					"wall",
					"wall",
					"wall",
					"wall",
					"wall",
					"trees",
					"grass",
					"wall",
					"wall",
					"trees",
					"grass",
					"grass",
					"grass",
					"brick",
					"grass",
					"desert",
					"desert",
					"desert",
					"trees",
					"trees",
					"trees",
					"desert",
					"brick",
					"brick",
					"grass",
					"grass",
					"wall",
					"brick",
					"brick",
					"brick",
					"wall",
					"brick",
					"brick",
					"brick",
					"wall",
					"grass",
					"grass",
					"wall",
					"wall",
					"grass",
					"grass",
					"grass",
					"grass",
					"brick",
					"grass",
					"desert",
					"desert",
					"trees",
					"trees",
					"trees",
					"desert",
					"grass",
					"brick",
					"brick",
					"grass",
					"grass",
					"wall",
					"brick",
					"brick",
					"brick",
					"wall",
					"brick",
					"brick",
					"brick",
					"wall",
					"grass",
					"grass",
					"wall",
					"wall",
					"trees",
					"trees",
					"grass",
					"grass",
					"brick",
					"grass",
					"grass",
					"desert",
					"desert",
					"desert",
					"desert",
					"desert",
					"grass",
					"brick",
					"brick",
					"grass",
					"grass",
					"wall",
					"wall",
					"brick",
					"wall",
					"wall",
					"wall",
					"brick",
					"wall",
					"wall",
					"grass",
					"trees",
					"wall",
					"trees",
					"trees",
					"grass",
					"grass",
					"grass",
					"brick",
					"grass",
					"grass",
					"grass",
					"grass",
					"desert",
					"desert",
					"grass",
					"grass",
					"brick",
					"brick",
					"grass",
					"grass",
					"grass",
					"grass",
					"brick",
					"grass",
					"grass",
					"grass",
					"brick",
					"grass",
					"grass",
					"grass",
					"trees",
					"trees",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"trees",
					"trees",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"brick",
					"grass",
					"grass",
					"grass",
					"grass",
					"trees",
					"grass",
					"brick",
					"grass",
					"grass",
					"grass",
					"trees",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"water",
					"water",
					"water",
					"trees",
					"trees",
					"wall",
					"trees",
					"trees",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"brick",
					"grass",
					"grass",
					"grass",
					"trees",
					"trees",
					"grass",
					"brick",
					"grass",
					"trees",
					"trees",
					"trees",
					"trees",
					"grass",
					"water",
					"water",
					"water",
					"water",
					"water",
					"water",
					"water",
					"trees",
					"wall",
					"trees",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"brick",
					"grass",
					"grass",
					"trees",
					"trees",
					"grass",
					"grass",
					"brick",
					"trees",
					"trees",
					"trees",
					"grass",
					"grass",
					"water",
					"water",
					"water",
					"water",
					"water",
					"water",
					"water",
					"water",
					"water",
					"wall",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"wall",
					"",
					"brick",
					"wall",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"brick",
					"grass",
					"trees",
					"grass",
					"grass",
					"water",
					"water",
					"water",
					"water",
					"water",
					"water",
					"water",
					"water",
					"water",
					"water",
					"wall",
					"grass",
					"wall",
					"wall",
					"wall",
					"wall",
					"wall",
					"wall",
					"brick",
					"wall",
					"wall",
					"wall",
					"grass",
					"grass",
					"grass",
					"brick",
					"trees",
					"grass",
					"grass",
					"water",
					"water",
					"water",
					"water",
					"grass",
					"grass",
					"water",
					"water",
					"water",
					"water",
					"water",
					"wall",
					"grass",
					"wall",
					"",
					"",
					"wall",
					"brick",
					"brick",
					"brick",
					"table",
					"seller",
					"wall",
					"grass",
					"grass",
					"grass",
					"brick",
					"grass",
					"grass",
					"water",
					"water",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"water",
					"water",
					"water",
					"wall",
					"grass",
					"wall",
					"",
					"",
					"wall",
					"brick",
					"wall",
					"wall",
					"wall",
					"wall",
					"wall",
					"grass",
					"trees",
					"grass",
					"brick",
					"brick",
					"brick",
					"bridge",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"water",
					"wall",
					"grass",
					"wall",
					"",
					"",
					"",
					"brick",
					"brick",
					"brick",
					"brick",
					"brick",
					"wall",
					"grass",
					"trees",
					"grass",
					"grass",
					"grass",
					"grass",
					"water",
					"grass",
					"grass",
					"wall",
					"brick",
					"wall",
					"wall",
					"wall",
					"wall",
					"trees",
					"grass",
					"water",
					"wall",
					"grass",
					"wall",
					"",
					"",
					"wall",
					"brick",
					"wall",
					"wall",
					"brick",
					"brick",
					"wall",
					"grass",
					"trees",
					"trees",
					"grass",
					"grass",
					"water",
					"water",
					"grass",
					"grass",
					"wall",
					"brick",
					"brick",
					"wall",
					"brick",
					"wall",
					"trees",
					"grass",
					"water",
					"wall",
					"grass",
					"wall",
					"",
					"",
					"wall",
					"brick",
					"brick",
					"wall",
					"brick",
					"brick",
					"wall",
					"trees",
					"trees",
					"trees",
					"trees",
					"grass",
					"water",
					"water",
					"water",
					"grass",
					"wall",
					"brick",
					"brick",
					"table",
					"seller",
					"wall",
					"grass",
					"water",
					"water",
					"wall",
					"grass",
					"wall",
					"",
					"",
					"wall",
					"brick",
					"brick",
					"wall",
					"brick",
					"brick",
					"wall",
					"grass",
					"trees",
					"trees",
					"grass",
					"grass",
					"water",
					"water",
					"grass",
					"grass",
					"wall",
					"brick",
					"brick",
					"wall",
					"brick",
					"wall",
					"grass",
					"trees",
					"water",
					"wall",
					"grass",
					"wall",
					"wall",
					"wall",
					"wall",
					"wall",
					"wall",
					"wall",
					"wall",
					"wall",
					"wall",
					"grass",
					"trees",
					"grass",
					"grass",
					"water",
					"water",
					"water",
					"water",
					"grass",
					"wall",
					"wall",
					"wall",
					"wall",
					"wall",
					"wall",
					"trees",
					"trees",
					"water",
					"wall",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"water",
					"water",
					"water",
					"water",
					"water",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"water",
					"water",
					"trees",
					"water",
					"water",
					"wall",
					"wall",
					"wall",
					"wall",
					"wall",
					"wall",
					"wall",
					"wall",
					"wall",
					"wall",
					"wall",
					"wall",
					"wall",
					"wall",
					"wall",
					"wall",
					"wall",
					"wall",
					"wall",
					"wall",
					"water",
					"water",
					"water",
					"water",
					"water",
					"water",
					"water",
					"water",
					"water",
					"water"
				],
				quests: [ 'brecconary' ]
			},
			// navigation
			{
				type: 'location',
				id: 'bn-ent',
				position: {
					x: bnF1.x - 0.5,
					y: bnF1.y + 14.5
				}
			},
			// Alefgard
			{
				"type": "tilefield",
				"size": {
					"x": 34,
					"y": 18
				},
				"tileSize": {
					"x": 1,
					"y": 1
				},
				"position": {
					"x": alefgard.x - 18,
					"y": alefgard.y + 21
				},
				"tiles": [
					"",
					"",
					"",
					"",
					"",
					"",
					"",
					"",
					"",
					"",
					"",
					"",
					"",
					"",
					"",
					"",
					"",
					"",
					"",
					"",
					"",
					"",
					"",
					"",
					"",
					"",
					"",
					"",
					"",
					"",
					"",
					"",
					"",
					"",
					"",
					"",
					"",
					"mountain",
					"mountain",
					"mountain",
					"mountain",
					"",
					"",
					"",
					"",
					"",
					"",
					"",
					"",
					"",
					"",
					"",
					"",
					"",
					"",
					"",
					"",
					"",
					"",
					"",
					"",
					"",
					"",
					"",
					"",
					"",
					"",
					"",
					"",
					"",
					"mountain",
					"mountain",
					"mountain",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"",
					"",
					"",
					"",
					"",
					"",
					"",
					"",
					"",
					"",
					"mountain",
					"mountain",
					"mountain",
					"mountain",
					"mountain",
					"mountain",
					"mountain",
					"mountain",
					"mountain",
					"",
					"",
					"",
					"",
					"",
					"",
					"mountain",
					"mountain",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"mountain",
					"mountain",
					"mountain",
					"mountain",
					"mountain",
					"mountain",
					"mountain",
					"hill",
					"hill",
					"hill",
					"hill",
					"mountain",
					"mountain",
					"mountain",
					"mountain",
					"",
					"",
					"",
					"",
					"mountain",
					"mountain",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"mountain",
					"mountain",
					"mountain",
					"mountain",
					"hill",
					"hill",
					"hill",
					"hill",
					"hill",
					"hill",
					"hill",
					"hill",
					"hill",
					"hill",
					"hill",
					"mountain",
					"mountain",
					"",
					"",
					"",
					"mountain",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"hill",
					"hill",
					"hill",
					"hill",
					"hill",
					"hill",
					"hill",
					"hill",
					"hill",
					"hill",
					"hill",
					"hill",
					"hill",
					"hill",
					"hill",
					"mountain",
					"",
					"",
					"",
					"water",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"trees",
					"trees",
					"trees",
					"trees",
					"trees",
					"trees",
					"trees",
					"hill",
					"hill",
					"hill",
					"hill",
					"hill",
					"hill",
					"hill",
					"hill",
					"mountain",
					"mountain",
					"mountain",
					"",
					"",
					"water",
					"water",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"trees",
					"trees",
					"trees",
					"trees",
					"trees",
					"trees",
					"trees",
					"trees",
					"trees",
					"trees",
					"trees",
					"hill",
					"hill",
					"hill",
					"hill",
					"hill",
					"hill",
					"mountain",
					"mountain",
					"mountain",
					"mountain",
					"water",
					"water",
					"",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"trees",
					"trees",
					"trees",
					"trees",
					"trees",
					"trees",
					"trees",
					"trees",
					"trees",
					"trees",
					"trees",
					"trees",
					"trees",
					"trees",
					"hill",
					"hill",
					"hill",
					"hill",
					"hill",
					"hill",
					"hill",
					"hill",
					"water",
					"water",
					"water",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"trees",
					"trees",
					"trees",
					"trees",
					"trees",
					"trees",
					"trees",
					"trees",
					"trees",
					"trees",
					"trees",
					"trees",
					"trees",
					"trees",
					"grass",
					"grass",
					"grass",
					"grass",
					"hill",
					"hill",
					"hill",
					"hill",
					"water",
					"water",
					"",
					"water",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"trees",
					"trees",
					"trees",
					"trees",
					"trees",
					"trees",
					"trees",
					"trees",
					"trees",
					"trees",
					"trees",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"water",
					"water",
					"water",
					"water",
					"",
					"water",
					"water",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"trees",
					"trees",
					"trees",
					"trees",
					"trees",
					"trees",
					"trees",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"village",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"water",
					"water",
					"water",
					"water",
					"",
					"",
					"",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"trees",
					"trees",
					"trees",
					"trees",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"water",
					"water",
					"water",
					"water",
					"water",
					"water",
					"water",
					"water",
					"",
					"",
					"",
					"",
					"",
					"",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"castle",
					"grass",
					"grass",
					"grass",
					"water",
					"water",
					"water",
					"water",
					"water",
					"water",
					"water",
					"",
					"",
					"",
					"",
					"",
					"",
					"",
					"",
					"",
					"",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"water",
					"water",
					"water",
					"water",
					"",
					"",
					"",
					"",
					"",
					"",
					"",
					"",
					"",
					"",
					"",
					"",
					"",
					"",
					"",
					"",
					"",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"water",
					"water",
					"water",
					"",
					"",
					"",
					"",
					"",
					"",
					"",
					"",
					"",
					"",
					"",
					"",
					"",
					"",
					"",
					"",
					"",
					"",
					"",
					"",
					"",
					"",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"grass",
					"water",
					"water",
					"water"
				],
				quests: [  ]
			},
			// navigation
			{
				type: 'location',
				id: 'w-tg',
				position: {
					x: tantegel.x,
					y: tantegel.y
				}
			},
			{
				type: 'path',
				from: 'tg-f1-ent',
				to: 'w-tg',
				distance: 0.1,
				hasReversed: true
			},
			{
				type: 'location',
				id: 'w-bn',
				position: {
					x: brecconary.x,
					y: brecconary.y
				}
			},
			{
				type: 'path',
				from: 'w-bn',
				to: 'w-tg',
				hasReversed: true
			},
			{
				type: 'path',
				from: 'bn-ent',
				to: 'w-bn',
				distance: 0.1,
				hasReversed: true
			},
			{
				type: 'location',
				id: 'w-cl',
				position: {
					x: charlock.x,
					y: charlock.y
				}
			},
			{
				type: 'location',
				id: 'w-gh',
				position: {
					x: garinham.x,
					y: garinham.y
				}
			},
			{
				type: 'location',
				id: 'w-ec',
				position: {
					x: erdricksCave.x,
					y: erdricksCave.y
				}
			},
			{
				type: 'path',
				from: 'w-gh',
				to: 'w-ec',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'w-1',
				position: {
					x: erdricksCave.x + 10,
					y: erdricksCave.y - 15
				}
			},
			{
				type: 'path',
				from: 'w-1',
				to: 'w-tg',
				hasReversed: true
			},
			{
				type: 'path',
				from: 'w-1',
				to: 'w-ec',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'w-kol',
				position: {
					x: kol.x,
					y: kol.y
				}
			},
			{
				type: 'location',
				id: 'w-shrine',
				position: {
					x: rainShrine.x,
					y: rainShrine.y
				}
			},
			{
				type: 'path',
				from: 'w-shrine',
				to: 'w-kol',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'w-2',
				position: {
					x: swampCaveEntrance.x - 14,
					y: swampCaveEntrance.y + 7
				}
			},
			{
				type: 'path',
				from: 'w-2',
				to: 'w-1',
				hasReversed: true
			},
			{
				type: 'path',
				from: 'w-2',
				to: 'w-kol',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'w-sc',
				position: {
					x: swampCaveEntrance.x,
					y: swampCaveEntrance.y
				}
			},
			{
				type: 'path',
				from: 'w-2',
				to: 'w-sc',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'w-sc2',
				position: {
					x: swampCaveExit.x,
					y: swampCaveExit.y
				}
			},
			{
				type: 'location',
				id: 'w-3',
				position: {
					x: charlock.x + 15,
					y: charlock.y - 1
				}
			},
			{
				type: 'path',
				from: 'w-3',
				to: 'w-cl',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'w-4',
				position: {
					x: charlock.x + 34,
					y: charlock.y - 3
				}
			},
			{
				type: 'path',
				from: 'w-4',
				to: 'w-sc2',
				hasReversed: true
			},
			{
				type: 'path',
				from: 'w-4',
				to: 'w-3',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'w-5',
				position: {
					x: rimuldar.x - 10,
					y: rimuldar.y + 3
				}
			},
			{
				type: 'path',
				from: 'w-5',
				to: 'w-4',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'w-rd',
				position: {
					x: rimuldar.x,
					y: rimuldar.y
				}
			},
			{
				type: 'path',
				from: 'w-5',
				to: 'w-rd',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'w-sanctum',
				position: {
					x: sanctum.x,
					y: sanctum.y
				}
			},
			{
				type: 'path',
				from: 'w-5',
				to: 'w-sanctum',
				hasReversed: true
			},
			{
				type: 'path',
				from: 'w-rd',
				to: 'w-sanctum',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'w-6',
				position: {
					x: garinham.x + 7,
					y: garinham.y - 29
				}
			},
			{
				type: 'path',
				from: 'w-6',
				to: 'w-ec',
				hasReversed: true
			},
			{
				type: 'path',
				from: 'w-6',
				to: 'w-gh',
				hasReversed: true
			},
			{
				type: 'path',
				from: 'w-6',
				to: 'w-1',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'w-7',
				position: {
					x: mountainCave.x - 27,
					y: mountainCave.y - 4
				}
			},
			{
				type: 'path',
				from: 'w-6',
				to: 'w-7',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'w-mc',
				position: {
					x: mountainCave.x,
					y: mountainCave.y
				}
			},
			{
				type: 'path',
				from: 'w-mc',
				to: 'w-7',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'w-8',
				position: {
					x: mountainCave.x - 6,
					y: mountainCave.y - 22
				}
			},
			{
				type: 'path',
				from: 'w-8',
				to: 'w-7',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'w-9',
				position: {
					x: mountainCave.x - 14,
					y: mountainCave.y - 40
				}
			},
			{
				type: 'path',
				from: 'w-8',
				to: 'w-9',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'w-hn',
				position: {
					x: hauksness.x,
					y: hauksness.y
				}
			},
			{
				type: 'path',
				from: 'w-hn',
				to: 'w-9',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'w-10',
				position: {
					x: cantlin.x,
					y: cantlin.y + 22
				}
			},
			{
				type: 'path',
				from: 'w-10',
				to: 'w-9',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'w-token',
				position: {
					x: token.x,
					y: token.y
				}
			},
			{
				type: 'path',
				from: 'w-10',
				to: 'w-token',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'w-cantlin',
				position: {
					x: cantlin.x,
					y: cantlin.y
				}
			},
			{
				type: 'path',
				from: 'w-9',
				to: 'w-cantlin',
				hasReversed: true
			},
			// Erdrick's Cave
			// Garinham
			// navigation
			// f1
			{
				type: 'location',
				id: 'gh-f1-m1',
				position: {
					x: ghF1.x + 9.5,
					y: ghF1.y + 9.5
				}
			},
			{
				type: 'location',
				id: 'gh-f1-m2',
				position: {
					x: ghF1.x + 7.5,
					y: ghF1.y - 1.5
				}
			},
			{
				type: 'path',
				from: 'gh-f1-m2',
				to: 'w-gh',
				distance: 0.1,
				hasReversed: true
			},
			{
				type: 'path',
				from: 'gh-f1-m1',
				to: 'gh-f1-m2',
				hasReversed: true
			},
			// b1
			{
				type: 'location',
				id: 'gh-b1-m1',
				position: {
					x: ghB1.x - 8.5,
					y: ghB1.y - 8.5
				}
			},
			{
				type: 'location',
				id: 'gh-b1-m2',
				position: {
					x: ghB1.x + 7.5,
					y: ghB1.y - 6.5
				}
			},
			{
				type: 'path',
				from: 'gh-b1-m1',
				to: 'gh-b1-m2',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'gh-b1-m3',
				position: {
					x: ghB1.x - 3.5,
					y: ghB1.y - 1.5
				}
			},
			{
				type: 'path',
				from: 'gh-b1-m3',
				to: 'gh-b1-m2',
				hasReversed: true
			},
			{
				type: 'path',
				from: 'gh-b1-m3',
				to: 'gh-f1-m1',
				distance: 0.1,
				hasReversed: true
			},
			// b2
			{
				type: 'location',
				id: 'gh-b2-m1',
				position: {
					x: ghB2.x - 5.5,
					y: ghB2.y - 4.5
				}
			},
			{
				type: 'location',
				id: 'gh-b2-m2',
				position: {
					x: ghB2.x + 4.5,
					y: ghB2.y + 3.5
				}
			},
			{
				type: 'path',
				from: 'gh-b2-m2',
				to: 'gh-b2-m1',
				hasReversed: true
			},
			{
				type: 'path',
				from: 'gh-b2-m2',
				to: 'gh-b1-m1',
				distance: 0.1,
				hasReversed: true
			},
			// b3
			{
				type: 'location',
				id: 'gh-b3-harp',
				position: {
					x: harp.x,
					y: harp.y
				}
			},
			{
				type: 'location',
				id: 'gh-b3-m1',
				position: {
					x: ghB3.x + 0.5,
					y: ghB3.y + 0.5
				}
			},
			{
				type: 'path',
				from: 'gh-b3-harp',
				to: 'gh-b3-m1',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'gh-b3-m2',
				position: {
					x: ghB3.x - 0.5,
					y: ghB3.y + 4.5
				}
			},
			{
				type: 'location',
				id: 'gh-b3-m3',
				position: {
					x: ghB3.x - 7.5,
					y: ghB3.y - 7.5
				}
			},
			{
				type: 'path',
				from: 'gh-b3-m3',
				to: 'gh-b3-m2',
				hasReversed: true
			},
			{
				type: 'path',
				from: 'gh-b2-m1',
				to: 'gh-b3-m2',
				distance: 0.1,
				hasReversed: true
			},
			// b4
			{
				type: 'location',
				id: 'gh-b4-m1',
				position: {
					x: ghB4.x + 0.5,
					y: ghB4.y + 0.0
				}
			},
			{
				type: 'path',
				from: 'gh-b3-m1',
				to: 'gh-b4-m1',
				distance: 0.1,
				hasReversed: true
			},
			{
				type: 'location',
				id: 'gh-b4-m2',
				position: {
					x: ghB4.x - 4.5,
					y: ghB4.y + 0.0
				}
			},
			{
				type: 'path',
				from: 'gh-b4-m2',
				to: 'gh-b4-m1',
				hasReversed: true
			},
			{
				type: 'path',
				from: 'gh-b4-m2',
				to: 'gh-b3-m2',
				distance: 0.1,
				hasReversed: true
			},
			// Swamp cave
			//navigatoin
			{
				type: 'location',
				id: 'sc-s1',
				position: {
					x: scB1.x - 2.5,
					y: scB1.y + 15.0
				}
			},
			{
				type: 'path',
				from: 'sc-s1',
				to: 'w-sc',
				distance: 0.1,
				hasReversed: true
			},
			{
				type: 'location',
				id: 'sc-m1',
				position: {
					x: scB1.x - 2.5,
					y: scB1.y - 10.0
				}
			},
			{
				type: 'location',
				id: 'sc-m2',
				position: {
					x: scB1.x - 1.5,
					y: scB1.y - 10.0
				}
			},
			{
				type: 'path',
				from: 'sc-m2',
				to: 'sc-m1',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'sc-m3',
				position: {
					x: scB1.x - 1.5,
					y: scB1.y - 12.0
				}
			},
			{
				type: 'path',
				from: 'sc-m2',
				to: 'sc-m3',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'sc-m4',
				position: {
					x: scB1.x + 0.5,
					y: scB1.y - 12.0
				}
			},
			{
				type: 'path',
				from: 'sc-m4',
				to: 'sc-m3',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'sc-m5',
				position: {
					x: scB1.x + 0.5,
					y: scB1.y - 15.0
				}
			},
			{
				type: 'path',
				from: 'sc-m4',
				to: 'sc-m5',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'sc-s2',
				position: {
					x: scB1.x - 2.5,
					y: scB1.y - 15.0
				}
			},
			{
				type: 'path',
				from: 'sc-s2',
				to: 'sc-m5',
				hasReversed: true
			},
			{
				type: 'path',
				from: 'sc-s2',
				to: 'w-sc2',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'sc-m6',
				position: {
					x: scB1.x - 2.5,
					y: scB1.y + 7.0
				}
			},
			{
				type: 'path',
				from: 'sc-s1',
				to: 'sc-m6',
				hasReversed: true
			},
			{
				type: 'path',
				from: 'sc-s2',
				to: 'sc-m6',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'sc-m7',
				position: {
					x: scB1.x - 0.5,
					y: scB1.y + 7.0
				}
			},
			{
				type: 'path',
				from: 'sc-m7',
				to: 'sc-m6',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'sc-m8',
				position: {
					x: scB1.x - 0.5,
					y: scB1.y + 2.0
				}
			},
			{
				type: 'path',
				from: 'sc-m7',
				to: 'sc-m8',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'sc-m9',
				position: {
					x: scB1.x + 1.5,
					y: scB1.y + 2.0
				}
			},
			{
				type: 'path',
				from: 'sc-m9',
				to: 'sc-m8',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'sc-m10',
				position: {
					x: scB1.x + 1.5,
					y: scB1.y + 1.0
				}
			},
			{
				type: 'path',
				from: 'sc-m9',
				to: 'sc-m10',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'sc-m11',
				position: {
					x: scB1.x + 1.5,
					y: scB1.y + 0.0
				}
			},
			{
				type: 'path',
				from: 'sc-m11',
				to: 'sc-m10',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'sc-m12',
				position: {
					x: scB1.x - 0.5,
					y: scB1.y + 0.0
				}
			},
			{
				type: 'path',
				from: 'sc-m11',
				to: 'sc-m12',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'sc-m13',
				position: {
					x: scB1.x - 0.5,
					y: scB1.y - 6.0
				}
			},
			{
				type: 'path',
				from: 'sc-m13',
				to: 'sc-m12',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'sc-m14',
				position: {
					x: scB1.x + 2.5,
					y: scB1.y - 6.0
				}
			},
			{
				type: 'path',
				from: 'sc-m13',
				to: 'sc-m14',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'sc-m15',
				position: {
					x: scB1.x + 2.5,
					y: scB1.y - 3.0
				}
			},
			{
				type: 'path',
				from: 'sc-m15',
				to: 'sc-m14',
				hasReversed: true
			},
			// Rain Shrine
			// navigation
			{
				"type": "location",
				"id": "rs-1",
				"position": {
					"x": 62.5,
					"y": -34.5
				}
			},
			{
				"type": "location",
				"id": "rs-2",
				"position": {
					"x": 62.5,
					"y": -32.5
				}
			},
			{
				"type": "location",
				"id": "rs-3",
				"position": {
					"x": 66.5,
					"y": -32.5
				}
			},
			{
				"type": "location",
				"id": "rs-4",
				"position": {
					"x": 66.5,
					"y": -29.5
				}
			},
			{
				"type": "location",
				"id": "rs-5",
				"position": {
					"x": 63.5,
					"y": -29.5
				}
			},			
			{
				"type": "path",
				"from": "rs-1",
				"to": "rs-2",
				"distance": 2
			},
			{
				"type": "path",
				"from": "rs-2",
				"to": "rs-1",
				"distance": 2
			},
			{
				"type": "path",
				"from": "w-shrine",
				"to": "rs-1",
				hasReversed: true
			},
			{
				"type": "path",
				"from": "rs-2",
				"to": "rs-3",
				"distance": 4
			},
			{
				"type": "path",
				"from": "rs-3",
				"to": "rs-2",
				"distance": 4
			},
			{
				"type": "path",
				"from": "rs-3",
				"to": "rs-4",
				"distance": 3
			},
			{
				"type": "path",
				"from": "rs-4",
				"to": "rs-3",
				"distance": 3
			},
			{
				"type": "path",
				"from": "rs-4",
				"to": "rs-5",
				"distance": 3
			},
			{
				"type": "path",
				"from": "rs-5",
				"to": "rs-4",
				"distance": 3
			},
			// Charlock
			// navigation
			{
				type: 'location',
				id: 'cl-b1-entrance',
				position: {
					x: clB1.x + 0.5,
					y: clB1.y - 9.5
				}
			},
			{
				type: 'path',
				from: 'w-cl',
				to: 'cl-b1-entrance',
				distance: 0.1,
				hasReversed: true
			},
			{
				type: 'location',
				id: 'cl-b1-m1',
				position: {
					x: clB1.x + 0.5,
					y: clB1.y - 6.5
				}
			},
			{
				type: 'path',
				from: 'cl-b1-entrance',
				to: 'cl-b1-m1',
				hasReversed: true
			},
			{
				'type': 'location',
				'id': 'cl-b1-m2',
				'position': {
					'x': clB1.x + 0.5,
					'y': clB1.y - 6.5
				}
			},
			{
				type: 'path',
				from: 'cl-b1-m2',
				to: 'cl-b1-m1',
				hasReversed: true
			},
			{
				'type': 'location',
				'id': 'cl-b1-m3',
				'position': {
					'x': clB1.x - 7.5,
					'y': clB1.y - 6.5
				}
			},
			{
				type: 'path',
				from: 'cl-b1-m2',
				to: 'cl-b1-m3',
				hasReversed: true
			},
			{
				'type': 'location',
				'id': 'cl-b1-m4',
				'position': {
					'x': clB1.x - 7.5,
					'y': clB1.y - 5.5
				}
			},
			{
				type: 'path',
				from: 'cl-b1-m4',
				to: 'cl-b1-m3',
				hasReversed: true
			},
			{
				'type': 'location',
				'id': 'cl-b1-m5',
				'position': {
					'x': clB1.x - 8.5,
					'y': clB1.y - 5.5
				}
			},
			{
				type: 'path',
				from: 'cl-b1-m5',
				to: 'cl-b1-m4',
				hasReversed: true
			},
			{
				'type': 'location',
				'id': 'cl-b1-m6',
				'position': {
					'x': clB1.x - 8.5,
					'y': clB1.y + 6.5
				}
			},
			{
				type: 'path',
				from: 'cl-b1-m5',
				to: 'cl-b1-m6',
				hasReversed: true
			},
			{
				'type': 'location',
				'id': 'cl-b1-m7',
				'position': {
					'x': clB1.x - 7.5,
					'y': clB1.y + 6.5
				}
			},
			{
				type: 'path',
				from: 'cl-b1-m6',
				to: 'cl-b1-m7',
				hasReversed: true
			},
			{
				'type': 'location',
				'id': 'cl-b1-m8',
				'position': {
					'x': clB1.x - 7.5,
					'y': clB1.y + 7.5
				}
			},
			{
				type: 'path',
				from: 'cl-b1-m8',
				to: 'cl-b1-m7',
				hasReversed: true
			},
			{
				'type': 'location',
				'id': 'cl-b1-m9',
				'position': {
					'x': clB1.x - 5.5,
					'y': clB1.y + 7.5
				}
			},
			{
				type: 'path',
				from: 'cl-b1-m8',
				to: 'cl-b1-m9',
				hasReversed: true
			},
			{
				'type': 'location',
				'id': 'cl-b1-m10',
				'position': {
					'x': clB1.x - 5.5,
					'y': clB1.y + 6.5
				}
			},
			{
				type: 'path',
				from: 'cl-b1-m10',
				to: 'cl-b1-m9',
				hasReversed: true
			},
			{
				'type': 'location',
				'id': 'cl-b1-m11',
				'position': {
					'x': clB1.x - 3.5,
					'y': clB1.y + 6.5
				}
			},
			{
				type: 'path',
				from: 'cl-b1-m10',
				to: 'cl-b1-m11',
				hasReversed: true
			},
			{
				'type': 'location',
				'id': 'cl-b1-m12',
				'position': {
					'x': clB1.x - 3.5,
					'y': clB1.y + 2.5
				}
			},
			{
				type: 'path',
				from: 'cl-b1-m11',
				to: 'cl-b1-m12',
				hasReversed: true
			},
			{
				'type': 'location',
				'id': 'cl-b1-m13',
				'position': {
					'x': clB1.x - 2.5,
					'y': clB1.y + 2.5
				}
			},
			{
				type: 'path',
				from: 'cl-b1-m13',
				to: 'cl-b1-m12',
				hasReversed: true
			},
			{
				'type': 'location',
				'id': 'cl-b1-m14',
				'position': {
					'x': clB1.x - 2.5,
					'y': clB1.y - 2.5
				}
			},
			{
				type: 'path',
				from: 'cl-b1-m13',
				to: 'cl-b1-m14',
				hasReversed: true
			},
			{
				'type': 'location',
				'id': 'cl-b1-m15',
				'position': {
					'x': clB1.x + 0.5,
					'y': clB1.y - 2.5
				}
			},
			{
				type: 'path',
				from: 'cl-b1-m15',
				to: 'cl-b1-m14',
				hasReversed: true
			},
			{
				'type': 'location',
				'id': 'cl-b1-m16',
				'position': {
					'x': clB1.x + 0.5,
					'y': clB1.y + 5.5
				}
			},
			{
				type: 'path',
				from: 'cl-b1-m15',
				to: 'cl-b1-m16',
				hasReversed: true
			},
			{
				'type': 'location',
				'id': 'cl-b1-m17',
				'position': {
					'x': clB1.x - 1.5,
					'y': clB1.y + 5.5
				}
			},
			{
				type: 'path',
				from: 'cl-b1-m17',
				to: 'cl-b1-m16',
				hasReversed: true
			},
			{
				'type': 'location',
				'id': 'cl-b1-m18',
				'position': {
					'x': clB1.x - 1.5,
					'y': clB1.y + 8.5
				}
			},
			{
				type: 'path',
				from: 'cl-b1-m17',
				to: 'cl-b1-m18',
				hasReversed: true
			},
			{
				'type': 'location',
				'id': 'cl-b1-m19',
				'position': {
					'x': clB1.x + 0.5,
					'y': clB1.y + 8.5
				}
			},
			{
				type: 'path',
				from: 'cl-b1-m19',
				to: 'cl-b1-m18',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'cl-b1-s1',
				position: {
					x: clB1.x - 5.5,
					y: clB1.y + 2.5
				}
			},
			{
				type: 'path',
				from: 'cl-b1-m12',
				to: 'cl-b1-s1',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'cl-b1-s2',
				position: {
					x: clB1.x - 5.5,
					y: clB1.y + 0.5
				}
			},
			{
				type: 'path',
				from: 'cl-b1-s2',
				to: 'cl-b1-s1',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'cl-b1-s3',
				position: {
					x: clB1.x - 6.5,
					y: clB1.y + 0.5
				}
			},
			{
				type: 'path',
				from: 'cl-b1-s2',
				to: 'cl-b1-s3',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'cl-b1-s4',
				position: {
					x: clB1.x - 6.5,
					y: clB1.y - 3.5
				}
			},
			{
				type: 'path',
				from: 'cl-b1-s4',
				to: 'cl-b1-s3',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'cl-b1-s5',
				position: {
					x: clB1.x - 5.5,
					y: clB1.y - 3.5
				}
			},
			{
				type: 'path',
				from: 'cl-b1-s4',
				to: 'cl-b1-s5',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'cl-b1-s6',
				position: {
					x: clB1.x - 5.5,
					y: clB1.y - 4.5
				}
			},
			{
				type: 'path',
				from: 'cl-b1-s6',
				to: 'cl-b1-s5',
				hasReversed: true
			},
			// b2
			{
				type: 'location',
				id: 'cl-b2-m1',
				position: {
					x: clB2.x - 0.5,
					y: clB2.y + 9.5
				}
			},
			{
				type: 'path',
				from: 'cl-b1-m19',
				to: 'cl-b2-m1',
				distance: 0.1,
				hasReversed: true
			},
			{
				type: 'location',
				id: 'cl-b2-m2',
				position: {
					x: clB2.x - 0.5,
					y: clB2.y + 8.5
				}
			},
			{
				type: 'path',
				from: 'cl-b2-m2',
				to: 'cl-b2-m1',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'cl-b2-m3',
				position: {
					x: clB2.x + 1.5,
					y: clB2.y + 8.5
				}
			},
			{
				type: 'path',
				from: 'cl-b2-m2',
				to: 'cl-b2-m3',
				hasReversed: true
			},			
			{
				type: 'location',
				id: 'cl-b2-m4',
				position: {
					x: clB2.x + 1.5,
					y: clB2.y + 9.5
				}
			},
			{
				type: 'path',
				from: 'cl-b2-m4',
				to: 'cl-b2-m3',
				hasReversed: true
			},			
			{
				type: 'location',
				id: 'cl-b2-m5',
				position: {
					x: clB2.x + 3.5,
					y: clB2.y + 9.5
				}
			},
			{
				type: 'path',
				from: 'cl-b2-m4',
				to: 'cl-b2-m5',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'cl-b2-m6',
				position: {
					x: clB2.x + 3.5,
					y: clB2.y + 6.5
				}
			},
			{
				type: 'path',
				from: 'cl-b2-m6',
				to: 'cl-b2-m5',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'cl-b2-m7',
				position: {
					x: clB2.x - 2.5,
					y: clB2.y + 6.5
				}
			},
			{
				type: 'path',
				from: 'cl-b2-m6',
				to: 'cl-b2-m7',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'cl-b2-m8',
				position: {
					x: clB2.x - 2.5,
					y: clB2.y + 9.5
				}
			},
			{
				type: 'path',
				from: 'cl-b2-m7',
				to: 'cl-b2-m8',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'cl-b2-m9',
				position: {
					x: clB2.x - 9.5,
					y: clB2.y + 9.5
				}
			},
			{
				type: 'path',
				from: 'cl-b2-m9',
				to: 'cl-b2-m8',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'cl-b2-m10',
				position: {
					x: clB2.x - 9.5,
					y: clB2.y + 3.5
				}
			},
			{
				type: 'path',
				from: 'cl-b2-m9',
				to: 'cl-b2-m10',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'cl-b2-m11',
				position: {
					x: clB2.x - 6.5,
					y: clB2.y + 3.5
				}
			},
			{
				type: 'path',
				from: 'cl-b2-m11',
				to: 'cl-b2-m10',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'cl-b2-m12',
				position: {
					x: clB2.x - 6.5,
					y: clB2.y + 0.5
				}
			},
			{
				type: 'path',
				from: 'cl-b2-m12',
				to: 'cl-b2-m11',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'cl-b2-m13',
				position: {
					x: clB2.x - 9.5,
					y: clB2.y + 0.5
				}
			},
			{
				type: 'path',
				from: 'cl-b2-m12',
				to: 'cl-b2-m13',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'cl-b2-m14',
				position: {
					x: clB2.x - 9.5,
					y: clB2.y - 9.5
				}
			},
			{
				type: 'path',
				from: 'cl-b2-m14',
				to: 'cl-b2-m13',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'cl-b2-m15',
				position: {
					x: clB2.x - 1.5,
					y: clB2.y - 9.5
				}
			},
			{
				type: 'path',
				from: 'cl-b2-m14',
				to: 'cl-b2-m15',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'cl-b2-s1',
				position: {
					x: clB2.x + 5.5,
					y: clB2.y + 8.5
				}
			},
			{
				type: 'location',
				id: 'cl-b2-s2',
				position: {
					x: clB2.x + 5.5,
					y: clB2.y + 9.5
				}
			},
			{
				type: 'path',
				from: 'cl-b2-s1',
				to: 'cl-b2-s2',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'cl-b2-s3',
				position: {
					x: clB2.x + 9.5,
					y: clB2.y + 9.5
				}
			},
			{
				type: 'path',
				from: 'cl-b2-s3',
				to: 'cl-b2-s2',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'cl-b2-s4',
				position: {
					x: clB2.x + 9.5,
					y: clB2.y + 7.5
				}
			},
			{
				type: 'path',
				from: 'cl-b2-s3',
				to: 'cl-b2-s4',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'cl-b2-s5',
				position: {
					x: clB2.x + 7.7,
					y: clB2.y + 7.5
				}
			},
			{
				type: 'path',
				from: 'cl-b2-s5',
				to: 'cl-b2-s4',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'cl-b2-s6',
				position: {
					x: clB2.x + 3.5,
					y: clB2.y + 2.5
				}
			},
			{
				type: 'path',
				from: 'cl-b2-s5',
				to: 'cl-b2-s6',
				hasReversed: true
			},
			// b3
			{
				type: 'location',
				id: 'cl-b3-m1',
				position: {
					x: clB3.x + 0.5,
					y: clB3.y + 4.5
				}
			},
			{
				type: 'path',
				from: 'cl-b3-m1',
				to: 'cl-b2-m15',
				distance: 0.1,
				hasReversed: true
			},
			{
				type: 'location',
				id: 'cl-b3-m2',
				position: {
					x: clB3.x + 1.5,
					y: clB3.y + 4.5
				}
			},
			{
				type: 'path',
				from: 'cl-b3-m1',
				to: 'cl-b3-m2',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'cl-b3-m3',
				position: {
					x: clB3.x + 1.5,
					y: clB3.y + 2.5
				}
			},
			{
				type: 'path',
				from: 'cl-b3-m3',
				to: 'cl-b3-m2',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'cl-b3-m4',
				position: {
					x: clB3.x + 2.5,
					y: clB3.y + 2.5
				}
			},
			{
				type: 'path',
				from: 'cl-b3-m3',
				to: 'cl-b3-m4',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'cl-b3-m5',
				position: {
					x: clB3.x + 2.5,
					y: clB3.y + 1.5
				}
			},
			{
				type: 'path',
				from: 'cl-b3-m5',
				to: 'cl-b3-m4',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'cl-b3-m6',
				position: {
					x: clB3.x + 4.5,
					y: clB3.y + 1.5
				}
			},
			{
				type: 'path',
				from: 'cl-b3-m5',
				to: 'cl-b3-m6',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'cl-b3-m7',
				position: {
					x: clB3.x + 4.5,
					y: clB3.y - 1.5
				}
			},
			{
				type: 'path',
				from: 'cl-b3-m7',
				to: 'cl-b3-m6',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'cl-b3-m8',
				position: {
					x: clB3.x + 2.5,
					y: clB3.y - 1.5
				}
			},
			{
				type: 'path',
				from: 'cl-b3-m7',
				to: 'cl-b3-m8',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'cl-b3-m9',
				position: {
					x: clB3.x + 2.5,
					y: clB3.y - 2.5
				}
			},
			{
				type: 'path',
				from: 'cl-b3-m9',
				to: 'cl-b3-m8',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'cl-b3-m10',
				position: {
					x: clB3.x + 1.5,
					y: clB3.y - 2.5
				}
			},
			{
				type: 'path',
				from: 'cl-b3-m9',
				to: 'cl-b3-m10',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'cl-b3-m11',
				position: {
					x: clB3.x + 1.5,
					y: clB3.y - 4.5
				}
			},
			{
				type: 'path',
				from: 'cl-b3-m11',
				to: 'cl-b3-m10',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'cl-b3-m12',
				position: {
					x: clB3.x - 1.5,
					y: clB3.y - 4.5
				}
			},
			{
				type: 'path',
				from: 'cl-b3-m11',
				to: 'cl-b3-m12',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'cl-b3-m13',
				position: {
					x: clB3.x - 1.5,
					y: clB3.y - 2.5
				}
			},
			{
				type: 'path',
				from: 'cl-b3-m13',
				to: 'cl-b3-m12',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'cl-b3-m14',
				position: {
					x: clB3.x - 2.5,
					y: clB3.y - 2.5
				}
			},
			{
				type: 'path',
				from: 'cl-b3-m13',
				to: 'cl-b3-m14',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'cl-b3-m15',
				position: {
					x: clB3.x - 2.5,
					y: clB3.y - 1.5
				}
			},
			{
				type: 'path',
				from: 'cl-b3-m15',
				to: 'cl-b3-m14',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'cl-b3-m16',
				position: {
					x: clB3.x - 4.5,
					y: clB3.y - 1.5
				}
			},
			{
				type: 'path',
				from: 'cl-b3-m15',
				to: 'cl-b3-m16',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'cl-b3-m17',
				position: {
					x: clB3.x - 4.5,
					y: clB3.y + 1.5
				}
			},
			{
				type: 'path',
				from: 'cl-b3-m17',
				to: 'cl-b3-m16',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'cl-b3-m18',
				position: {
					x: clB3.x - 2.5,
					y: clB3.y + 1.5
				}
			},
			{
				type: 'path',
				from: 'cl-b3-m17',
				to: 'cl-b3-m18',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'cl-b3-m19',
				position: {
					x: clB3.x - 2.5,
					y: clB3.y + 2.5
				}
			},
			{
				type: 'path',
				from: 'cl-b3-m19',
				to: 'cl-b3-m18',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'cl-b3-m20',
				position: {
					x: clB3.x - 1.5,
					y: clB3.y + 2.5
				}
			},
			{
				type: 'path',
				from: 'cl-b3-m19',
				to: 'cl-b3-m20',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'cl-b3-m21',
				position: {
					x: clB3.x - 1.5,
					y: clB3.y + 4.5
				}
			},
			{
				type: 'path',
				from: 'cl-b3-m21',
				to: 'cl-b3-m20',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'cl-b3-s1',
				position: {
					x: clB3.x + 4.5,
					y: clB3.y + 3.5
				}
			},
			{
				type: 'location',
				id: 'cl-b3-s3',
				position: {
					x: clB3.x + 4.5,
					y: clB3.y + 4.5
				}
			},
			{
				type: 'path',
				from: 'cl-b3-s1',
				to: 'cl-b3-s3',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'cl-b3-s2',
				position: {
					x: clB3.x + 3.5,
					y: clB3.y + 4.5
				}
			},
			{
				type: 'path',
				from: 'cl-b3-s3',
				to: 'cl-b3-s2',
				hasReversed: true
			},
			{
				type: 'path',
				from: 'cl-b2-s1',
				to: 'cl-b3-s2',
				distance: 0.1,
				hasReversed: true
			},
			{
				type: 'location',
				id: 'cl-b3-s4',
				position: {
					x: clB3.x - 0.5,
					y: clB3.y + 0.5
				}
			},
			{
				type: 'path',
				from: 'cl-b3-s4',
				to: 'cl-b2-s6',
				distance: 0.1,
				hasReversed: true
			},			
			{
				type: 'location',
				id: 'cl-b3-s5',
				position: {
					x: clB3.x + 0.5,
					y: clB3.y - 0.5
				}
			},
			{
				type: 'path',
				from: 'cl-b3-s4',
				to: 'cl-b3-s5',
				hasReversed: true
			},			
			// b4
			{
				type: 'location',
				id: 'cl-b4-m1',
				position: {
					x: clB4.x + 2.5,
					y: clB4.y + 4.5
				}
			},
			{
				type: 'path',
				from: 'cl-b3-m21',
				to: 'cl-b4-m1',
				distance: 0.1,
				hasReversed: true
			},
			{
				type: 'location',
				id: 'cl-b4-m2',
				position: {
					x: clB4.x + 4.5,
					y: clB4.y + 4.5
				}
			},
			{
				type: 'path',
				from: 'cl-b4-m2',
				to: 'cl-b4-m1',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'cl-b4-m3',
				position: {
					x: clB4.x + 4.5,
					y: clB4.y + 2.5
				}
			},
			{
				type: 'path',
				from: 'cl-b4-m2',
				to: 'cl-b4-m3',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'cl-b4-m4',
				position: {
					x: clB4.x - 0.5,
					y: clB4.y + 2.5
				}
			},
			{
				type: 'path',
				from: 'cl-b4-m4',
				to: 'cl-b4-m3',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'cl-b4-m5',
				position: {
					x: clB4.x - 0.5,
					y: clB4.y + 4.5
				}
			},
			{
				type: 'path',
				from: 'cl-b4-m4',
				to: 'cl-b4-m5',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'cl-b4-m6',
				position: {
					x: clB4.x - 4.5,
					y: clB4.y + 4.5
				}
			},
			{
				type: 'path',
				from: 'cl-b4-m6',
				to: 'cl-b4-m5',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'cl-b4-m7',
				position: {
					x: clB4.x - 4.5,
					y: clB4.y - 1.5
				}
			},
			{
				type: 'path',
				from: 'cl-b4-m6',
				to: 'cl-b4-m7',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'cl-b4-m8',
				position: {
					x: clB4.x - 3.5,
					y: clB4.y - 1.5
				}
			},
			{
				type: 'path',
				from: 'cl-b4-m8',
				to: 'cl-b4-m7',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'cl-b4-s1',
				position: {
					x: clB4.x + 2.5,
					y: clB4.y - 2.5
				}
			},
			{
				type: 'location',
				id: 'cl-b4-s2',
				position: {
					x: clB4.x + 0.5,
					y: clB4.y - 2.5
				}
			},
			{
				type: 'path',
				from: 'cl-b4-s2',
				to: 'cl-b4-s1',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'cl-b4-s3',
				position: {
					x: clB4.x + 0.5,
					y: clB4.y - 1.5
				}
			},
			{
				type: 'path',
				from: 'cl-b4-s2',
				to: 'cl-b4-s3',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'cl-b4-s4',
				position: {
					x: clB4.x - 1.5,
					y: clB4.y - 1.5
				}
			},
			{
				type: 'path',
				from: 'cl-b4-s4',
				to: 'cl-b4-s3',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'cl-b4-s5',
				position: {
					x: clB4.x - 1.5,
					y: clB4.y + 0.5
				}
			},
			{
				type: 'path',
				from: 'cl-b4-s4',
				to: 'cl-b4-s5',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'cl-b4-s6',
				position: {
					x: clB4.x - 2.5,
					y: clB4.y + 0.5
				}
			},
			{
				type: 'path',
				from: 'cl-b4-s6',
				to: 'cl-b4-s5',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'cl-b4-s7',
				position: {
					x: clB4.x - 2.5,
					y: clB4.y + 2.5
				}
			},
			{
				type: 'path',
				from: 'cl-b4-s6',
				to: 'cl-b4-s7',
				hasReversed: true
			},
			{
				type: 'path',
				from: 'cl-b3-s1',
				to: 'cl-b4-s7',
				distance: 0.1,
				hasReversed: true
			},
			// b5
			{
				type: 'location',
				id: 'cl-b5-m1',
				position: {
					x: clB5.x - 4.5,
					y: clB5.y - 4.5
				}
			},
			{
				type: 'path',
				from: 'cl-b4-m8',
				to: 'cl-b5-m1',
				distance: 0.1,
				hasReversed: true
			},
			{
				type: 'location',
				id: 'cl-b5-m2',
				position: {
					x: clB5.x - 1.5,
					y: clB5.y - 1.5
				}
			},
			{
				type: 'path',
				from: 'cl-b5-m2',
				to: 'cl-b5-m1',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'cl-b5-m3',
				position: {
					x: clB5.x - 1.5,
					y: clB5.y + 0.5
				}
			},
			{
				type: 'path',
				from: 'cl-b5-m2',
				to: 'cl-b5-m3',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'cl-b5-m4',
				position: {
					x: clB5.x - 4.5,
					y: clB5.y + 0.5
				}
			},
			{
				type: 'path',
				from: 'cl-b5-m4',
				to: 'cl-b5-m3',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'cl-b5-m5',
				position: {
					x: clB5.x - 4.5,
					y: clB5.y + 4.5
				}
			},
			{
				type: 'path',
				from: 'cl-b5-m4',
				to: 'cl-b5-m5',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'cl-b5-m6',
				position: {
					x: clB5.x + 2.5,
					y: clB5.y + 4.5
				}
			},
			{
				type: 'path',
				from: 'cl-b5-m6',
				to: 'cl-b5-m5',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'cl-b5-m7',
				position: {
					x: clB5.x + 2.5,
					y: clB5.y + 2.5
				}
			},
			{
				type: 'path',
				from: 'cl-b5-m6',
				to: 'cl-b5-m7',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'cl-b5-m8',
				position: {
					x: clB5.x - 2.5,
					y: clB5.y + 2.5
				}
			},
			{
				type: 'path',
				from: 'cl-b5-m8',
				to: 'cl-b5-m7',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'cl-b5-s1',
				position: {
					x: clB5.x + 2.5,
					y: clB5.y - 2.5
				}
			},
			{
				type: 'path',
				from: 'cl-b5-s1',
				to: 'cl-b5-m7',
				hasReversed: true
			},
			{
				type: 'path',
				from: 'cl-b5-s1',
				to: 'cl-b4-s1',
				distance: 0.1,
				hasReversed: true
			},
			// b6
			{
				type: 'location',
				id: 'cl-b6-m1',
				position: {
					x: clB6.x + 4.5,
					y: clB6.y + 4.5
				}
			},
			{
				type: 'path',
				from: 'cl-b5-m8',
				to: 'cl-b6-m1',
				distance: 0.1,
				hasReversed: true
			},
			{
				type: 'location',
				id: 'cl-b6-m2',
				position: {
					x: clB6.x + 4.5,
					y: clB6.y - 4.5
				}
			},
			{
				type: 'path',
				from: 'cl-b6-m2',
				to: 'cl-b6-m1',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'cl-b6-m3',
				position: {
					x: clB6.x - 4.5,
					y: clB6.y - 4.5
				}
			},
			{
				type: 'path',
				from: 'cl-b6-m2',
				to: 'cl-b6-m3',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'cl-b6-m4',
				position: {
					x: clB6.x - 4.5,
					y: clB6.y + 4.5
				}
			},
			{
				type: 'path',
				from: 'cl-b6-m4',
				to: 'cl-b6-m3',
				hasReversed: true
			},
			// b7
			{
				type: 'location',
				id: 'cl-b7-m1',
				position: {
					x: clB7.x - 4.5,
					y: clB7.y - 2.5
				}
			},
			{
				type: 'path',
				from: 'cl-b6-m4',
				to: 'cl-b7-m1',
				distance: 0.1,
				hasReversed: true
			},
			{
				type: 'location',
				id: 'cl-b7-m2',
				position: {
					x: clB7.x + 4.5,
					y: clB7.y - 2.5
				}
			},
			{
				type: 'path',
				from: 'cl-b7-m2',
				to: 'cl-b7-m1',
				hasReversed: true
			},
			// b8
			{
				type: 'location',
				id: 'cl-b8-m1',
				position: {
					x: clB8.x - 4.5,
					y: clB8.y - 14
				}
			},
			{
				type: 'path',
				from: 'cl-b7-m2',
				to: 'cl-b8-m1',
				distance: 0.1,
				hasReversed: true
			},
			{
				type: 'location',
				id: 'cl-b8-m2',
				position: {
					x: clB8.x - 4.5,
					y: clB8.y - 8
				}
			},
			{
				type: 'path',
				from: 'cl-b8-m2',
				to: 'cl-b8-m1',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'cl-b8-m3',
				position: {
					x: clB8.x - 10.5,
					y: clB8.y - 8
				}
			},
			{
				type: 'path',
				from: 'cl-b8-m2',
				to: 'cl-b8-m3',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'cl-b8-m4',
				position: {
					x: clB8.x - 10.5,
					y: clB8.y + 5
				}
			},
			{
				type: 'path',
				from: 'cl-b8-m4',
				to: 'cl-b8-m3',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'cl-b8-m5',
				position: {
					x: clB8.x - 6.5,
					y: clB8.y + 5
				}
			},
			{
				type: 'path',
				from: 'cl-b8-m4',
				to: 'cl-b8-m5',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'cl-b8-m6',
				position: {
					x: clB8.x - 6.5,
					y: clB8.y + 7
				}
			},
			{
				type: 'path',
				from: 'cl-b8-m6',
				to: 'cl-b8-m5',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'cl-b8-m7',
				position: {
					x: clB8.x - 2.5,
					y: clB8.y + 7
				}
			},
			{
				type: 'path',
				from: 'cl-b8-m6',
				to: 'cl-b8-m7',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'cl-b8-m8',
				position: {
					x: clB8.x - 2.5,
					y: clB8.y + 10
				}
			},
			{
				type: 'path',
				from: 'cl-b8-m8',
				to: 'cl-b8-m7',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'cl-b8-m9',
				position: {
					x: clB8.x + 1.5,
					y: clB8.y + 10
				}
			},
			{
				type: 'path',
				from: 'cl-b8-m8',
				to: 'cl-b8-m9',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'cl-b8-m10',
				position: {
					x: clB8.x + 1.5,
					y: clB8.y + 12
				}
			},
			{
				type: 'path',
				from: 'cl-b8-m10',
				to: 'cl-b8-m9',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'cl-b8-m11',
				position: {
					x: clB8.x + 7.5,
					y: clB8.y + 12
				}
			},
			{
				type: 'path',
				from: 'cl-b8-m10',
				to: 'cl-b8-m11',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'cl-b8-m12',
				position: {
					x: clB8.x + 7.5,
					y: clB8.y + 10
				}
			},
			{
				type: 'path',
				from: 'cl-b8-m12',
				to: 'cl-b8-m11',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'cl-b8-m13',
				position: {
					x: clB8.x + 9.5,
					y: clB8.y + 10
				}
			},
			{
				type: 'path',
				from: 'cl-b8-m12',
				to: 'cl-b8-m13',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'cl-b8-m14',
				position: {
					x: clB8.x + 9.5,
					y: clB8.y + 8
				}
			},
			{
				type: 'path',
				from: 'cl-b8-m14',
				to: 'cl-b8-m13',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'cl-b8-m15',
				position: {
					x: clB8.x + 10.5,
					y: clB8.y + 8
				}
			},
			{
				type: 'path',
				from: 'cl-b8-m14',
				to: 'cl-b8-m15',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'cl-b8-m16',
				position: {
					x: clB8.x + 10.5,
					y: clB8.y + 4
				}
			},
			{
				type: 'path',
				from: 'cl-b8-m16',
				to: 'cl-b8-m15',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'cl-b8-m17',
				position: {
					x: clB8.x + 11.5,
					y: clB8.y + 4
				}
			},
			{
				type: 'path',
				from: 'cl-b8-m16',
				to: 'cl-b8-m17',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'cl-b8-m18',
				position: {
					x: clB8.x + 11.5,
					y: clB8.y + 3
				}
			},
			{
				type: 'path',
				from: 'cl-b8-m18',
				to: 'cl-b8-m17',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'cl-b8-m19',
				position: {
					x: clB8.x + 13.5,
					y: clB8.y + 3
				}
			},
			{
				type: 'path',
				from: 'cl-b8-m18',
				to: 'cl-b8-m19',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'cl-b8-m20',
				position: {
					x: clB8.x + 13.5,
					y: clB8.y + 1
				}
			},
			{
				type: 'path',
				from: 'cl-b8-m20',
				to: 'cl-b8-m19',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'cl-b8-m21',
				position: {
					x: clB8.x + 12.5,
					y: clB8.y + 1
				}
			},
			{
				type: 'path',
				from: 'cl-b8-m20',
				to: 'cl-b8-m21',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'cl-b8-m22',
				position: {
					x: clB8.x + 12.5,
					y: clB8.y + 0
				}
			},
			{
				type: 'path',
				from: 'cl-b8-m22',
				to: 'cl-b8-m21',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'cl-b8-m23',
				position: {
					x: clB8.x + 10.5,
					y: clB8.y + 0
				}
			},
			{
				type: 'path',
				from: 'cl-b8-m22',
				to: 'cl-b8-m23',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'cl-b8-m24',
				position: {
					x: clB8.x + 10.5,
					y: clB8.y - 2
				}
			},
			{
				type: 'path',
				from: 'cl-b8-m24',
				to: 'cl-b8-m23',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'cl-b8-m25',
				position: {
					x: clB8.x + 11.5,
					y: clB8.y - 2
				}
			},
			{
				type: 'path',
				from: 'cl-b8-m24',
				to: 'cl-b8-m25',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'cl-b8-m26',
				position: {
					x: clB8.x + 11.5,
					y: clB8.y - 4
				}
			},
			{
				type: 'path',
				from: 'cl-b8-m26',
				to: 'cl-b8-m25',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'cl-b8-m27',
				position: {
					x: clB8.x + 9.5,
					y: clB8.y - 4
				}
			},
			{
				type: 'path',
				from: 'cl-b8-m26',
				to: 'cl-b8-m27',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'cl-b8-m28',
				position: {
					x: clB8.x + 9.5,
					y: clB8.y - 6
				}
			},
			{
				type: 'path',
				from: 'cl-b8-m28',
				to: 'cl-b8-m27',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'cl-b8-m29',
				position: {
					x: clB8.x + 10.5,
					y: clB8.y - 6
				}
			},
			{
				type: 'path',
				from: 'cl-b8-m28',
				to: 'cl-b8-m29',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'cl-b8-m30',
				position: {
					x: clB8.x + 10.5,
					y: clB8.y - 9
				}
			},
			{
				type: 'path',
				from: 'cl-b8-m30',
				to: 'cl-b8-m29',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'cl-b8-m31',
				position: {
					x: clB8.x + 2.5,
					y: clB8.y - 9
				}
			},
			{
				type: 'path',
				from: 'cl-b8-m30',
				to: 'cl-b8-m31',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'cl-b8-s1',
				position: {
					x: clB8.x - 4.5,
					y: clB8.y - 2
				}
			},
			{
				type: 'path',
				from: 'cl-b8-m2',
				to: 'cl-b8-s1',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'cl-b8-s2',
				position: {
					x: clB8.x - 2.5,
					y: clB8.y - 2
				}
			},
			{
				type: 'path',
				from: 'cl-b8-s2',
				to: 'cl-b8-s1',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'cl-b8-s3',
				position: {
					x: clB8.x - 2.5,
					y: clB8.y - 1
				}
			},
			{
				type: 'path',
				from: 'cl-b8-s2',
				to: 'cl-b8-s3',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'cl-b8-s4',
				position: {
					x: clB8.x + 1.5,
					y: clB8.y - 1
				}
			},
			{
				type: 'path',
				from: 'cl-b8-s4',
				to: 'cl-b8-s3',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'cl-b8-s5',
				position: {
					x: clB8.x + 3.5,
					y: clB8.y + 1
				}
			},
			{
				type: 'path',
				from: 'cl-b8-s4',
				to: 'cl-b8-s5',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'cl-b8-s6',
				position: {
					x: clB8.x + 3.5,
					y: clB8.y + 3
				}
			},
			{
				type: 'path',
				from: 'cl-b8-s6',
				to: 'cl-b8-s5',
				hasReversed: true
			},
			{
				type: 'location',
				id: 'cl-b8-s7',
				position: {
					x: clB8.x - 2.5,
					y: clB8.y + 3
				}
			},
			{
				type: 'path',
				from: 'cl-b8-s6',
				to: 'cl-b8-s7',
				hasReversed: true
			},












		]
	}
}