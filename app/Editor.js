const EditorModes = {
	MAIN: 'main',
	CONVEX_HULL_ADDING: 'convex hull adding',
	LOCATION_ADDING: 'locatoin adding',
	QUEST_ADDING: 'quest adding',
	SELECTED_EDIT: 'properties editor'
}

class Grid {
	constructor() {
		this.offset = new Point(0, 0);
		this.step = 1;
	}
	
	getNearestNode(p) {
		const cellsX = Math.round((p.x - this.offset.x) / this.step);
		const cellsY = Math.round((p.y - this.offset.y) / this.step);
		return new Point(this.offset.x + cellsX * this.step, this.offset.y + cellsY * this.step);
	}
	
	draw(mapRenderer) {
		const cam = mapRenderer.camera;
		const vp = mapRenderer.viewport;
		const ppu = vp.getPixelsPerUnit();
		// debug
		const cellDistX = (cam.getLeft() - this.offset.x) / this.step;
		const cellDistY = (cam.getTop() - this.offset.y) / this.step;
		let x = (Math.ceil(cellDistX) - cellDistX) * ppu;
		let y = (cellDistY - Math.floor(cellDistY)) * ppu;
		const step = this.step * ppu;
		if (step < 3) return;
		const ctx = mapRenderer.context2d;
		ctx.strokeStyle = '#a0a0a0';
		ctx.lineWidth = 1;
		const width = vp.getFramebufferWidth();
		const height = vp.getFramebufferHeight();
		while (x < width) {
			ctx.beginPath();
			ctx.moveTo(x, 0);
			ctx.lineTo(x, height);
			ctx.stroke();
			x += step;
		}
		while (y < height) {
			ctx.beginPath();
			ctx.moveTo(0, y);
			ctx.lineTo(width, y);
			ctx.stroke();
			y += step;
		}
	}
}

class Editor {

	constructor(renderer) {
		this.active = false;
		this.renderer = renderer;
		this.selected = null;
		this.tileSelector = {
			tf: null,
			x: 0,
			y: 0,
			w: 1,
			h: 1
		};
		this.tileSet = this.createAndLoadTileSet();
		this.mode = EditorModes.MAIN;
		this.grid = new Grid();
		this.grid.offset.x = 0.5;
		this.grid.offset.y = 0.5;
		this.baseName = '';
		this.counter = 0;
		
		this.snapToGrid = true;
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
	
	activate() {
		this.active = true;
	}
	
	deactivate() {
		this.active = false;
	}
	
	setActive(v) {
		if (v) {
			this.activate();
		} else {
			this.deactivate();
		}
	}
	
	isActive() {
		return this.active;
	}
	
	changeMode(m) {
		if (this.isActive) {
			this.mode = m;
			if (m == EditorModes.SELECTED_EDIT) {
				if (this.selected instanceof Point) {
					this.editPoint(this.selected);
				} else if (this.selected instanceof Quest) {
					this.editQuest(this.selected);
				} else if (this.selected instanceof Location) {
					this.editLocation(this.selected);
				} else if (this.selected instanceof ConvexHull) {
					this.editConvexHull(this.selected);
				}
				this.changeMode(EditorModes.MAIN);
			}
		}
	}

	editPoint() {
		if (this.selected instanceof Point) {
			let input = prompt('X', this.selected.x);
			let nx = parseFloat(input);
			if (nx != NaN) {
				this.selected.x = nx;
			}
			input = prompt('Y', this.selected.y);
			let ny = parseFloat(input);
			if (ny != NaN) {
				this.selected.y = ny;
			}
		}
	}
	
	createLine() {
		let line = new Line();
		this.editLine(line);
		line.setPosition(this.renderer.camera.position);
		if (this.snapToGrid) {
			line.setPosition(this.grid.getNearestNode(line.getPosition()));
		}



		this.renderer.map.addLine(line);
		this.selected = line;
	}
	
	editLine(line) {
		let input = prompt('Colour', line.colour);
		if (input == null) {
			return;
		}
		line.colour = input;
	}

	createConvexHull() {
		let input = prompt('Number of points', '4');
		let n = parseInt(input);
		if (n != NaN && n > 2) {
			input = prompt('Colour', 'black');
			let angleStep = 2 * Math.PI / n;
			let angle = 0;
			let points = [];
			let pos = this.renderer.camera.position;
			for (let i = 0; i < n; i++) {
				points.push(pos.clone().add(new Point(Math.cos(angle), Math.sin(angle))));
				angle += angleStep;
			}
			let hull = new ConvexHull();
			hull.points = points;
			hull.colour = input;
			this.renderer.map.addConvexHull(hull);
		} else {
			alert("Number of points must be an integer and bigger than 2.");
		}
	}
	
	editConvexHull(hull) {
		let input = prompt('Colour', hull.colour);
		if (!input) {
			return;
		}
		hull.colour = input;

		let quests = [];
		for (let uq of hull.quests) {
			quests.push(uq.id);
		}
		input = prompt('Quests', JSON.stringify(quests));
		try {
			quests = JSON.parse(input);
		} catch (err) {
			if (err instanceof SyntaxError) {
				alert('Syntax error!');
			}
		}
		if (quests instanceof Array) {
			hull.quests = [];
			for (let id of quests) {
				if (typeof id === 'string') {
					let nq = this.renderer.map.getQuest(id);
					if (nq) {
						hull.quests.push(nq);
					} else {
						alert('Quest "' + id + '" not found!');
					}
				} else {
					alert("Identificator of quest should be a text string!");
				}
			}
		}

	}
	
	createQuest() {
		const q = new Quest();
		q.id = prompt('id');
		q.description = prompt('description');
		q.position.set(this.grid.getNearestNode(this.renderer.camera.position));
		this.renderer.map.addQuest(q);
		this.selected = q;
	}
	
	editQuest(q) {
		let input = prompt('id', q.id);
		if (!input) return;
		q.id = input;
		
		input = prompt('Position', JSON.stringify(q.position));
		let pos = null;
		try {
			pos = JSON.parse(input);
		} catch (err) {
			if (err instanceof SyntaxError) {
				alert('Syntax error!');
				return;
			}
		}
		q.position = new Point(pos.x, pos.y);
		
		input = prompt('action', q.action);
		if (!input) return;
		q.action = input;
		input = prompt('description', q.description);
		if (!input) return;
		q.description = input;
		let unlocks = [];
		for (let uq of q.questsToUnlock) {
			unlocks.push(uq.id);
		}
		let unlocksText = prompt('Quests to unlock', JSON.stringify(unlocks));
		try {
			unlocks = JSON.parse(unlocksText);
		} catch (err) {
			if (err instanceof SyntaxError) {
				alert('Syntax error!');
			}
		}
		if (unlocks instanceof Array) {
			q.questsToUnlock = [];
			for (let id of unlocks) {
				let nq = this.renderer.map.getQuest(id);
				if (nq) {
					q.questsToUnlock.push(nq);
				} else {
					alert('Quest "' + id + '" not found!');
				}
			}
		}
	}

	editLocation(loc) {
		let input = prompt('id', loc.id);
		if (!input) return;
		loc.id = input;
		let pos = {x: loc.position.x, y: loc.position.y};
		input = prompt('position', JSON.stringify(pos));
		if (!input) return;
		try {
			pos = JSON.parse(input);
		} catch (err) {
			if (err instanceof SyntaxError) {
				alert('Syntax error!');
			}
		}
		if (typeof pos.x == 'number') {
			loc.position.x = pos.x;
		} else {
			alert('x is not a number!');
		}
		if (typeof pos.y == 'number') {
			loc.position.y = pos.y;
		} else {
			alert('y is not a number!');
		}
		let paths = [];
		for (let p of loc.pathsTo) {
			paths.push({location: p.to.id, distance: p.distance});
		}
		input = prompt('Paths to', JSON.stringify(paths));
		try {
			paths = JSON.parse(input);
		} catch (err) {
			if (err instanceof SyntaxError) {
				alert('Syntax error!');
			}
		}
		if (paths instanceof Array) {
			loc.pathsTo = [];
			for (let p of paths) {
				let toLoc = this.renderer.map.routeMesh.getLocation(p.location);
				if (toLoc) {
					let np = new Path();
					np.from = loc;
					np.to = toLoc;
					if (p.distance !== undefined && typeof p.distance == 'number') {
						np.distance = p.distance;
					} else {
						np.distance = toLoc.position.clone().sub(loc.position).mag();
					}
					loc.addPath(np);
				} else {
					alert('Location "' + p.location + '" not found!');
				}
			}
		} else {
			alert('Typed object is not an array!')
		}

	}
	
	select(p, add) {
		if (!this.active) return false;
		const maxDist = this.renderer.camera.getWidth() / 100;
		// quests
		const qhs = this.renderer.camera.getWidth() / 100;
		for (let q of this.renderer.map.quests) {
			if (isNumberInRange(p.x, q.position.x - qhs, q.position.x + qhs) && isNumberInRange(p.y, q.position.y - qhs, q.position.y + qhs)) {
				this.selected = q;
				return true;
			}
		}
		// nav points
		const nhs = this.renderer.camera.getWidth() / 80;
		for (let nav of this.renderer.map.routeMesh.locations) {
			if (isNumberInRange(p.x, nav.position.x - nhs, nav.position.x + nhs) && isNumberInRange(p.y, nav.position.y - nhs, nav.position.y + nhs)) {
				this.selected = nav;
				return true;
			}
		}		
		// lines points
		for (let line of this.renderer.map.lines) {
			if (isNumberInRange(p.x, line.firstPoint.x - nhs, line.firstPoint.x + nhs) && isNumberInRange(p.y, line.firstPoint.y - nhs, line.firstPoint.y + nhs)) {
				this.selected = line.firstPoint;
				return true;
			}
			if (isNumberInRange(p.x, line.secondPoint.x - nhs, line.secondPoint.x + nhs) && isNumberInRange(p.y, line.secondPoint.y - nhs, line.secondPoint.y + nhs)) {
				this.selected = line.secondPoint;
				return true;
			}
		}		
		// convex hulls points
		for (let hull of this.renderer.map.convexHulls) {
			for (let hp of hull.points) {
				if (isNumberInRange(p.x, hp.x - nhs, hp.x + nhs) && isNumberInRange(p.y, hp.y - nhs, hp.y + nhs)) {
					this.selected = hp;
					return true;
				}
			}
		}		
		// lines
		const maxDistSq = maxDist * maxDist;
		for (let line of this.renderer.map.lines) {
			let distSq = Infinity;
			let lineLenSq = line.getLengthSq();
			if (lineLenSq == 0.0) {
				distSq = p.distSq(line.firstPoint);
			} else {
				const lineVec = line.secondPoint.clone().sub(line.firstPoint);
				const t = p.clone().sub(line.firstPoint).dot(lineVec) / lineLenSq;
				const tClamped = Math.max(0, Math.min(1, t));
				const tScaled = new Point(lineVec.x * tClamped, lineVec.y * tClamped);
				const proj = line.firstPoint.clone().add(tScaled);
				distSq = proj.distSq(p);
			}
			if (distSq < maxDistSq) {
				this.selected = line;
				return true;
			}
		}		
		// convex hulls
		for (let hull of this.renderer.map.convexHulls) {
			let htl = hull.getTopLeft();
			let hbr = hull.getBottomRight();
			if (isNumberInRange(p.x, htl.x, hbr.x) && isNumberInRange(p.y, hbr.y, htl.y)) {
				this.selected = hull;
				return true;
			}
		}		
		// tile fields
		for (let tf of this.renderer.map.tileFields) {
			if (isNumberInRange(p.x, tf.getLeft(), tf.getRight()) && isNumberInRange(p.y, tf.getBottom(), tf.getTop())) {
				const ts = this.tileSelector;
				const relCur = (new Point(p)).sub(tf.getTopLeft());
				if (add && this.selected == tf) {
					const x = Math.floor(relCur.x / tf.tileSize);
					const y = Math.floor(-relCur.y / tf.tileSize);
					if (x < ts.x) {
						ts.w = ts.x - x + 1;
						ts.x = x;
					} else {
						ts.w = x - ts.x + 1;
					}
					if (y < ts.y) {
						ts.h = ts.y - y + 1;
						ts.y = y;
					} else {
						ts.h = y - ts.y + 1;
					}
				} else {
					this.selected = tf;
					ts.x = Math.floor(relCur.x / tf.tileSize);
					ts.y = Math.floor(-relCur.y / tf.tileSize);
					ts.w = 1;
					ts.h = 1;
				}
				return true;
			}
		}
		this.selected = null;
		return false;
	}
	
	move(v) {
		if (this.isActive() && this.selected != null) {
			this.selected.move(v);
			return true;
		}
		return false;
	}
	
	setTile(ind) {
		const ts = this.tileSelector;
		if (this.selected instanceof TileField) {
			for (let i = ts.x; i < ts.x + ts.w; i++) {
				for (let j = ts.y; j < ts.y + ts.h; j++) {
					this.selected.setTile(i, j, this.tileSet.tiles[ind]);
				}
			}
		}
	}
	
	// old variant of pointer up
	// allows to select multiple tiles in tilefield
	click(pos, mod) {
		console.log("Mouse Click (X: " + pos.x + "; Y: " + pos.y + ")");
		if (this.isActive()) {
			switch (this.mode) {
				case EditorModes.MAIN:
					this.select(pos, mod);
					break;
				case EditorModes.LOCATION_ADDING:
					this.counter++;
					let loc = new Location();
					loc.id = this.baseName + this.counter;
					loc.position.set(this.grid.getNearestNode(pos));
					if (this.selected instanceof Location) {
						let p = new Path();
						p.from = this.selected;
						p.to = loc;
						p.distance = this.selected.position.clone().sub(loc.position).mag();
						this.selected.addPath(p);
						p = new Path();
						p.from = loc;
						p.to = this.selected;
						p.distance = this.selected.position.clone().sub(loc.position).mag();
						loc.addPath(p);
					}
					this.renderer.map.addLocation(loc);
					this.selected = loc;
					break;
			}
		}
	}
	
	// pos - in world coordinates
	pointerDown(pos) {
		console.log("Pointer Down (X: " + pos.x + "; Y: " + pos.y + ")");
		if (this.isActive()) {
			switch (this.mode) {
				case EditorModes.MAIN:
					this.select(pos, false);
					break;
				case EditorModes.LOCATION_ADDING:
					this.counter++;
					let loc = new Location();
					loc.id = this.baseName + this.counter;
					loc.position.set(this.grid.getNearestNode(pos));
					if (this.selected instanceof Location) {
						let p = new Path();
						p.from = this.selected;
						p.to = loc;
						p.distance = this.selected.position.clone().sub(loc.position).mag();
						this.selected.addPath(p);
						p = new Path();
						p.from = loc;
						p.to = this.selected;
						p.distance = this.selected.position.clone().sub(loc.position).mag();
						loc.addPath(p);
					}
					this.renderer.map.addLocation(loc);
					this.selected = loc;
					break;
				case EditorModes.QUEST_ADDING:
					this.createQuest(pos);
					break;
			}
		}
	}
	
	pointerMove(pos, offset) {
		
	}
	
	pointerDrag(pos, offset) {
		
	}
	
	pointerUp(worldCoord) {
		if (this.active) {
			if (this.snapToGrid) {
				if (this.selected instanceof Point) {
					this.selected.set(this.grid.getNearestNode(this.selected));
				} else if (this.selected instanceof ConvexHull) {
					this.selected.move(this.grid.getNearestNode(this.selected.points[0]).sub(this.selected.points[0]));
				} else if (this.selected instanceof Quest) {
					this.selected.move(this.grid.getNearestNode(this.selected.position).sub(this.selected.position));
				} else if (this.selected instanceof Line) {
					this.selected.setPosition(this.grid.getNearestNode(this.selected.getPosition()));
				}
			}
		}
	}
	
	draw() {
		if (this.active) {
			const vp = this.renderer.viewport;
			const ctx = vp.canvas.getContext('2d');
			if (this.snapToGrid) {
				this.grid.draw(this.renderer);
			}
			this.renderer.drawPaths();
			this.renderer.drawLocations();
			// selector
			if (this.selected && this.selected instanceof TileField) {
				ctx.fillStyle = 'rgba(0, 0, 255, 0.3)';
				ctx.strokeStyle = '#000';
				const pos = vp.toPixels(this.selected.getTopLeft());
				const width = this.selected.getWidth() * vp.getPixelsPerUnit();
				const height = this.selected.getHeight() * vp.getPixelsPerUnit();
				ctx.fillRect(pos.x, pos.y, width, height);
				ctx.strokeRect(pos.x, pos.y, width, height);
				// tileSelector
				const tileSize = this.selected.tileSize * vp.getPixelsPerUnit();
				const ts = this.tileSelector;
				ctx.strokeRect(pos.x + tileSize * ts.x, pos.y + tileSize * ts.y, tileSize * ts.w, tileSize * ts.h); // selected tile contur
			}
			if (this.selected && this.selected instanceof Quest) {
				ctx.fillStyle = 'rgba(0, 0, 255, 0.3)';
				ctx.strokeStyle = '#000';
				const pos = vp.toPixels(new Point(this.selected.position.x, this.selected.position.y));
				ctx.beginPath();
				ctx.arc(pos.x, pos.y, vp.getPixelsPerUnit() * 0.5, 0, Math.PI * 2);
				ctx.fill();
				ctx.stroke();
			}
			if (this.selected && this.selected instanceof Location) {
				ctx.fillStyle = 'rgba(0, 0, 255, 0.3)';
				ctx.strokeStyle = '#000';
				const pos = vp.toPixels(new Point(this.selected.position.x, this.selected.position.y));
				ctx.beginPath();
				ctx.arc(pos.x, pos.y, vp.getPixelsPerUnit() * 0.6, 0, Math.PI * 2);
				ctx.fill();
				ctx.stroke();
			}
			if (this.selected && this.selected instanceof Point) {
				ctx.fillStyle = 'rgba(0, 0, 255, 0.3)';
				ctx.strokeStyle = '#000';
				const pos = vp.toPixels(new Point(this.selected.x, this.selected.y));
				ctx.beginPath();
				ctx.arc(pos.x, pos.y, vp.getPixelsPerUnit() * 0.6, 0, Math.PI * 2);
				ctx.fill();
				ctx.stroke();
			}
			if (this.selected && (this.selected instanceof ConvexHull || this.selected instanceof Line)) {
				ctx.fillStyle = 'rgba(0, 0, 255, 0.3)';
				ctx.strokeStyle = '#000';
				const htl = this.selected.getTopLeft();
				const hbr = this.selected.getBottomRight();
				const pos = vp.toPixels(htl);
				const width = (hbr.x - htl.x) * vp.getPixelsPerUnit();
				const height = (htl.y - hbr.y) * vp.getPixelsPerUnit();
				ctx.fillRect(pos.x, pos.y, width, height);
				ctx.strokeRect(pos.x, pos.y, width, height);
			}
			// instruction and mode
			ctx.fillStyle = '#000000';
			ctx.font = '18px serif';
			ctx.textAlign = 'left';
			ctx.fillText('Mode: ' + this.mode, 10, 50);
			ctx.fillText('1 - quest; 2 - hull; l - line; e - edit; c - clone; d - delete', 10, this.renderer.viewport.getFramebufferHeight() - 40);
		}
	}
	
	cloneSelected() {
		if (this.isActive()) {
			if (this.selected instanceof ConvexHull || this.selected instanceof Quest || this.selected instanceof Line) {
				let ne = this.selected.clone();
				ne.move(new Point(1.0, -1.0));
				this.selected = ne;
				if (this.selected instanceof ConvexHull) {
					this.renderer.map.addConvexHull(ne);
				} else if (this.selected instanceof Quest) {
					this.renderer.map.addQuest(ne);
				} else if (this.selected instanceof Line) {
					this.renderer.map.addLine(ne);
				}
			}
		}
	}
	
	editSelected() {
		if (this.selected instanceof Line) {
			this.editLine(this.selected);
		}
	}
	
	deleteSelected() {
		if (this.isActive()) {
			if (this.selected instanceof Quest) {
				this.renderer.map.removeQuest(this.selected);
			} else if (this.selected instanceof ConvexHull) {
				this.renderer.map.removeConvexHull(this.selected);
			} else if (this.selected instanceof Line) {
				this.renderer.map.removeLine(this.selected);
			}
			this.selected = null;
		}
	}
}
