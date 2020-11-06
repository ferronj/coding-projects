function Branch(begin, end) {
	this.begin = begin;
	this.end = end;
	this.finished = false;


// move the tree with some type of wind input
// wind is set by a slider to start, eventually made to user input
	this.wind = function() {
		this.end.x += random(-1, 1);
		this.end.y += random(-1, 1);
	}

	this.show = function() {
		stroke(255);
		line(this.begin.x, this.begin.y, this.end.x, this.end.y);
	}

// create a number of branches given an input
// branches divide the arc of the input angle equally
	this.branch = function(brCount, angle) {
		var dir = p5.Vector.sub(this.end, this.begin);
		dir.rotate(angle);
		dir.mult(0.67);
		var newEnd = p5.Vector.add(this.end, dir);
		var a = new Branch(this.end, newEnd);
		return a;
	}

	this.branchB = function(brCount, angle) {
		var dir = p5.Vector.sub(this.end, this.begin);
		dir.rotate(angle);
		dir.mult(0.67);
		var newEnd = p5.Vector.add(this.end, dir);
		var a = new Branch(this.end, newEnd);
		return a;
	}
}
