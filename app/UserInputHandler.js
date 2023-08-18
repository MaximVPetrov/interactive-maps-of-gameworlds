class UserInputHandler {
	
	constructor(mapRenderer) {
		this.mapRenderer = null;
		if (mapRenderer !== undefined) this.mapRenderer = mapRenderer;
	}

    mouseClick(event) {
		const renderer = this.mapRenderer;
		const quests = renderer.map.quests;
		
		const index = event.offsetY / renderer.textHeight;
		const quest = quests[Math.floor(index)];
		
		if (quest !== undefined && quest.isActive()) {
			quest.completed = true;
		}
		
		renderer.draw();
	}
	
}