"use strict"

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
	
	addQuest(quest, key) {
		if (this.quests[key] !== undefined) {
			console.log('Warning! Quest "' + key + '" is already in the list!');
		}
		this.quests[key] = quest;
		this.map.addQuest(quest);
	}

	createTestPoints() {
		const map = this.map;
		map.addPoint(new Point());
		map.addPoint(new Point(-5, 2));
		map.addPoint(new Point(5, 2));
		map.addPoint(new Point(-5, -2));
		map.addPoint(new Point(5, -2));
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
		this.createTestPoints();
		this.createQuests();
		return this.map;
	}
}