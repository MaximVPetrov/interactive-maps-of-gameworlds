class Map {
	
	constructor() {
		this.clear();
	}
	
	clear () {
		this.quests = [];
	}
	
	addQuest(q) {
		this.quests.push(q);
	}
}