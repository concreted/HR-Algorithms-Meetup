/*
  YOUR TASK:  To fill in the following function.

  --- BASIC REQUIREMENTS ---
    * It should return a number equal to the area of the shape.

  --- EXTRA CREDIT ---
    * Have the algorithm only halt after a certain degree of precision has been reached.
    * Refine your algorithm to choose points in a "smarter" fashion.
    * Dig into base.js and improve performance there.

  --- AVAILABLE METHODS ---

    The following methods are available to you in the global scope:

      evalPoint: function(x, y)
        -- Returns "true" if a point is inside the shape, and false otherwise.

      getGraphDimensions: function()
        -- Returns an objects with the dimensions of the graph.
        -- Has properties x and y, each of which has properties min and max.
           (ex. { x:{min: 3, max: 10}, y:{min:-5, max: 6} })

  --- SOME THINGS TO THINK ABOUT ---
    * Which shapes are easier/harder to integrate?
    * What ratio of window size to shape size maximizes accuracy?
    * 
*/

var makeNumInRange = function(lower, upper) {
    return Math.random() * (Math.abs(lower) + Math.abs(upper)) + lower;
}

var area = function(xmin, ymin, xmax, ymax, percentage) {
    var l = xmax - xmin;
    var w = ymax - ymin;

    return l * w * percentage;
}

var integrate = function() {
    console.time("Integrating");
    var graph = getGraphDimensions();
    var tries = 200;
    var success = 0;
    /*
    var xmax = graph.x.min;
    var ymax = graph.y.min;
    var xmin = graph.x.max;
    var ymin = graph.y.max;
    */

    var xmax = 0;
    var ymax = 0;
    var xmin = 0;
    var ymin = 0;
    for (var i = 0; i < tries; i++) {
	var x = makeNumInRange(graph.x.min, graph.x.max);
	var y = makeNumInRange(graph.y.min, graph.y.max);

	
	if (evalPoint(x,y)) {
	    //success += 1;

	    if (x < xmin) xmin = x;
	    if (y < ymin) ymin = y;
	    if (x > xmax) xmax = x;
	    if (x > ymax) ymax = y;
	}
    }

    console.log(xmin + ", " + xmax);
    console.log(ymin + ", " + ymax);


    var xmin = xmin - ((xmin - graph.x.min) * 0.5);
    var xmax = xmax + ((graph.x.max - xmax) * 0.5);
    var ymin = ymin - ((ymin - graph.y.min) * 0.5);
    var ymax = ymax + ((graph.y.max - ymax) * 0.5);

    console.log(xmin + ", " + xmax);
    console.log(ymin + ", " + ymax);


    for (var i = 0; i < tries; i++) {
	var x = makeNumInRange(xmin, xmax);
	var y = makeNumInRange(ymin, ymax);

	if (evalPoint(x,y))
	    success += 1;
    }

    console.timeEnd("Integrating");
    return area(xmin, ymin, xmax, ymax, success/(tries))
};
