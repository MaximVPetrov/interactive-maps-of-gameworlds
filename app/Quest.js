"use strict"

const Actions = {
	WALK: 'Walk to',
	TAKE: 'Pick up',
	TALK: 'Talk to',
	USE: 'Use',
	DEFEAT: 'Defeat'
}

class Quest {

	constructor(desc, action, pos, posy) {
		this.action = action === undefined ? Actions.WALK : action;
		this.description = desc === undefined ? "No description" : desc;
		this.position = new Point();
		if (pos !== undefined) {
			if (posy === undefined) {
				this.position.set(pos);
			} else {
				this.position.x = pos;
				this.position.y = posy;
			}
		}
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
