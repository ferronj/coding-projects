function Cell(pos, r, c) {

	if (pos) {
		this.pos = pos.copy();
	} else {
		this.pos = createVector(random(width), random(height));
	}

	this.r = r || 60;
	this.c = c || color(random(100, 255), 0, random(100, 255));

	this.clicked = function(x, y) {
		var d = dist(this.pos.x, this.pos.y, x, y);
		if (d < this.r) {
			return true;
		} else {
			return false;
		}
	}

	this.mitosis = function() {
		if (this.r > 50) {
			this.pos.x += random(-2*this.r, 2*this.r);
			var cell = new Cell(this.pos, this.r*0.5, this.c);
			return cell;
		} else {
			var bounce = p5.Vector.random2D();
			this.pos.add(bounce);
			return false;
		}
	}
	this.move = function() {
		var vel = p5.Vector.random2D();
		this.pos.add(vel);
	}

	this.grow = function() {
		if (this.r <= 60) {
			this.r += 0.1;
		}
	}

	this.show = function() {
		noStroke();
		fill(this.c);
		ellipse(this.pos.x, this.pos.y, this.r, this.r)

	}
}