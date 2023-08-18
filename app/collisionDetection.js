function isNumberInRange(value, rmin, rmax) {
	return (value >= rmin && value <= rmax);
}

function isRangesIntersects(r1min, r1max, r2min, r2max) {
	return !(r1max < r2min || r1min > r2max);
}

function isAABBIntersects(b1TopLeft, b1BottomRight, b2TopLeft, b2BottomRight) {
	return (isRangesIntersects(b1TopLeft.x, b1BottomRight.x, b2TopLeft.x, b2BottomRight.x) &&
		isRangesIntersects(b1BottomRight.y, b1TopLeft.y, b2BottomRight.y, b2TopLeft.y));
}