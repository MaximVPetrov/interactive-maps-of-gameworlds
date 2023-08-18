class DragonWarriorMapBuilder {
	
	constructor() {
		this.map = null;

		this.quests = {};
	}
	
	addQuest(quest, key) {
		if (this.quests[key] !== undefined) {
			console.log('Warning! Quest "' + key + '" is already in the list!');
		}
		this.quests[key] = quest;
		this.map.addQuest(quest);
	}
	
	createQuests() {
		const quests = this.quests;
		
		let q = new Quest('King Loric', Actions.TALK, this.kingLorikPos);
		this.addQuest(q, 'loric');

		q = new Quest('Magic Keys', Actions.TAKE);
		q.questsToUnlock.push(quests['loric']);
		this.addQuest(q, 'magic-keys');

		q = new Quest("Green Dragon", Actions.DEFEAT);
		q.questsToUnlock.push(quests['loric']);
		this.addQuest(q, 'dragon');

		q = new Quest("Silver Harp", Actions.TAKE);
		q.questsToUnlock.push(quests['magic-keys']);
		this.addQuest(q, 'harp');

		q = new Quest("Staff of Rain", Actions.TAKE);
		q.questsToUnlock.push(quests['harp']);
		this.addQuest(q, 'staff');

		q = new Quest("Stones of Sunlight", Actions.TAKE);
		q.questsToUnlock.push(quests['magic-keys']);
		this.addQuest(q, 'sunstone');

		q = new Quest("Erdrick's Token", Actions.TAKE);
		q.questsToUnlock.push(quests['loric']);
		this.addQuest(q, 'token');

		q = new Quest('Rainbow Drop', Actions.USE);
		q.questsToUnlock.push(quests['staff'], quests['sunstone'], quests['token']);
		this.addQuest(q, 'bridge-creation');

		q = new Quest('Dragonlord', Actions.DEFEAT);
		q.questsToUnlock.push(quests['bridge-creation']);
		this.addQuest(q, 'dragonlord');

		q = new Quest('King Lorik', Actions.TALK);
		q.questsToUnlock.push(quests['dragonlord']);
		this.addQuest(q, 'ending');
	}

	generateDragonWarriorMap() {
		this.map = new Map();
		this.createQuests();
		return this.map;
	}
}