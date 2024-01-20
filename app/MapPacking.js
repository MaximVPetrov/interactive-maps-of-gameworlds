function findQuest(quests, id) {
	for (let q of quests) {
		if (q.id == id) {
			return q;
		}
	}
	console.error('Unable to find quest "' + id + '"');
	return null;
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