const Actions = {
	WALK: 'Walk to',
	TAKE: 'Pick up',
	TALK: 'Talk to',
	USE: 'Use',
	DEFEAT: 'Defeat'
}

class Quest {

	constructor(desc, action) {
		this.action = action === undefined ? Actions.WALK : action;
		this.description = desc === undefined ? "No description" : desc;
		this.questsToUnlock = [];
		this.completed = false;
	}

	addPreviousQuests(q) {
		this.questsToUnlock.push(q);
	}

	isLocked() {
		let res = false;
		for (let q of this.questsToUnlock) {
			if (!q.completed) {
				res = true;
				break;
			}
		}
		return res;
	}
	
	isActive() {
		return !(this.isLocked() || this.completed);
	}

}
