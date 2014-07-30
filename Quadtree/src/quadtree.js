/*
  Greetings, algorithmics!

  Today we're going to implement a Quadtree!  Quadtrees are a super-useful
  data struture useful for graphics applications, like games and maps.
  They work a little like binary trees, but in 2 dimensions instead of 1.

  Your quadtree will have a few properties - a "point", a "box",
  which represents the dimensions the tree contains, and up to four
  sub-quadtrees: SW, SW, NW, and NE, each representing a quadrant.

  Boxes and points have several methods that you can use.

    --- POINT ---
    * Point.isIn(box): true if the point is in the box.
    * Point.distanceTo(point): the distance from one point to the other.

    --- BOX ---
    * Box.contains(point): true if the point is in the box.
    * Box.overlaps(box): true if the boxes have points in common.
    * Box.getQuadrant(string): given one of the strings "SE"/"SW"/"NE"/"NW",
        returns a new box with the dimensions of that quadrant of the
        current box.
    * Box.findQuadrantForPoint(point): returns one of "SE"/"SW"/"NE"/"NW",
        representing the quadrant the point belongs in.  Throws an error
        if the point is not in the box.
    * Box.expand(): doubles the dimensions of the box, leaving the
        center in the same location.
    * Box.shrink(): halfs the dimensions of the box, leaving the
        center in the same location.

  Your job is to fill in the methods `insert`, `findPointsWithin`,
  and `findNearestPointTo`.  You should work in that order.

  * Quadtree.insert(point): puts a point in the quadree.  In particular,
      if the current tree is empty, we put the point there.  Otherwise,
      we try to insert it into the proper subtree (which we might need
      to create).
  * Quadtree.findPointsWithin(box): returns all points in the quadtree
      that are also in the box.  To do this, we return the current
      tree's point if it's in the search box, and then search all
      subtrees whose boxes overlap the search box.
  * Quadtree.findNearestPointTo(point): returns the point in the
      quadtree nearest to the target point.  Returns null if the
      tree is empty.  I'll leave this one up to you! ;)
*/

var Quadtree = function(box) {
  this.box = box;
  this.point = null;
  this.SW = null;
  this.SE = null;
  this.NW = null;
  this.NE = null;
};

Quadtree.prototype.insert = function(point) {
    if (this.point === null) {
	this.point = point;
    }
    
    else {
	var quad = this.box.findQuadrantForPoint(point);

	if (this[quad] === null) {
	    this[quad] = new Quadtree(this.box.getQuadrant(quad));
	}

	this[quad].insert(point);

    }
};

Quadtree.prototype.findPointsWithin = function(searchBox) {
    var solution = [];

    //console.log(this.point);

    if (searchBox.contains(this.point)) {
	solution.push(this.point);
    }
    
    if (this.SW !== null && searchBox.overlaps(this.SW.box)) {solution = solution.concat(this.SW.findPointsWithin(searchBox))}
    if (this.SE !== null && searchBox.overlaps(this.SE.box)) {solution = solution.concat(this.SE.findPointsWithin(searchBox))}
    if (this.NW !== null && searchBox.overlaps(this.NW.box)) {solution = solution.concat(this.NW.findPointsWithin(searchBox))}
    if (this.NE !== null && searchBox.overlaps(this.NE.box)) {solution = solution.concat(this.NE.findPointsWithin(searchBox))}
    
    //console.log(solution); 
    
    return solution;

};

Quadtree.prototype.findNearestPointTo = function(target) {
    if (!this.point) return null;
    
    var searchBox = new Box(target.x-1, target.y-1, target.x+1, target.y+1);

    var candidates = this.findPointsWithin(searchBox);

    while (candidates.length === 0) {
	searchBox.expand();
	candidates = this.findPointsWithin(searchBox);
    }

    var best = null;
    var lowestDistance = Infinity;

    var distance = function(a, b) {
	return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
    }

    for (var i in candidates) {
	var dist = distance(candidates[i], target);
	if (dist < lowestDistance) {
	    best = candidates[i];
	    lowestDistance = dist;
	}
    }

    return best;

};

