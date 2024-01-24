function findQuest(quests, id) {
	for (let q of quests) {
		if (q.id == id) {
			return q;
		}
	}
	console.error('Unable to find quest "' + id + '"');
	return null;
}

function packLine (line) {
	return {
		type: 'line',
		colour: line.colour,
		firstPoint: {
			x: line.firstPoint.x,
			y: line.firstPoint.y
		},
		secondPoint: {
			x: line.secondPoint.x,
			y: line.secondPoint.y
		}
	}
}

function unpackLine(c) {
	const line = new Line();
	if (c.colour != undefined) {
		line.colour = c.colour;
	}
	if (c.firstPoint != undefined) {
		line.firstPoint = new Point(c.firstPoint.x, c.firstPoint.y);
	}
	if (c.secondPoint != undefined) {
		line.secondPoint = new Point(c.secondPoint.x, c.secondPoint.y);
	}
	return line;
}

function packConvexHull(h) {
	const points = [];
	for (let p of h.points) {
		points.push({
			x: p.x,
			y: p.y
		});
	}

	const quests = [];
	for (let uq of h.quests) {
		quests.push(uq.id);
	}

	return {
		type: 'hull',
		colour: h.colour,
		points: points,
		quests: quests
	};
}

function unpackConvexHull(c) {
	const hull = new ConvexHull();

	if (c.colour != undefined) {
		hull.colour = c.colour;
	}

	if (c.points != undefined) {
		for (let p of c.points) {
			hull.points.push(new Point(p.x, p.y));
		}
	}

	if (c.quests != undefined) {
		for (let id of c.quests) {
			const q = findQuest(quests, id);
			if (q) {
				hull.quests.push(q);
			}
		}
	}
	
	return hull;
}