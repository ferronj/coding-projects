function Vehicle(x, y) {

  this.position = createVector(x, y);
  this.velocity = p5.Vector.random2D();
  this.acceleration = createVector();
  this.r = 4;
  this.maxSpeed = 3;
  this.maxForce = 0.3;

  this.velocity.setMag(this.maxSpeed);

  this.health = 1;

  this.dna = [];
  // Food weight
  this.dna[0] = random(-5, 5);
  // Poison weight
  this.dna[1] = random(-5, 5);
  // Food perception
  this.dna[2] = random(this.maxSpeed, 100);
  // Poison perception
  this.dna[3] = random(this.maxSpeed, 100);

  this.seek = function(target, perception) {
// with perception radius on, it's possible to just have the vehicle stop moving
    let perceptionRadius = perception;  // going to leave perceptionRadius in for now...but keep it big
    let desired = createVector();
    let d = dist(this.position.x, this.position.y, target.x, target.y);
    if (d < perceptionRadius) {
      desired = p5.Vector.sub(target, this.position);
    }
    desired.setMag(this.maxSpeed);
    let steering = p5.Vector.sub(desired, this.velocity);
    steering.limit(this.maxForce);
    // seek returns a force
    return steering;
  }

  this.eat = function(list, nutrition, perception) {
    var record = Infinity;
    var closest = null;
    for (var i = list.length-1; i >= 0; i--) {
      var d = this.position.dist(list[i]);

      if (d < this.maxSpeed) {
        list.splice(i, 1);
        this.health += nutrition;
      } else {
        if (d < record) {
          record = d;
          closest = list[i];
        }
      }
    }
    // eat and delete or seek if it exists
     if (closest != null) {
      return this.seek(closest, perception);
    }
    return createVector(0, 0);
  }

  this.dead = function() {
    return (this.health < 0);
  }

  this.behaviors = function(good, bad) {
    var steerG = this.eat(good, 0.2, this.dna[2]);
    var steerB = this.eat(bad, -0.5, this.dna[3]);

    steerG.mult(this.dna[0]);
    steerB.mult(this.dna[1]);

    this.applyForce(steerG);
    this.applyForce(steerB);
  }

  // general function to apply a force to acceleration
  this.applyForce = function(force) {
    this.acceleration.add(force);
  }

  this.update = function() {
    this.health -= 0.005
    // do the actual physics here
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.position.add(this.velocity);
    // don't accumulate acceleration
    this.acceleration.mult(0);
  }

  // wrapping --  in the video he uses a steering
  this.edges = function() {
    if (this.position.x > width) {
      this.position.x = 0;
    } else if (this.position.x < 0){
      this.position.x = width;
    }
    if (this.position.y > height) {
      this.position.y = 0;
    } else if (this.position.y < 0) {
      this.position.y = height;
    }
  }

  this.show = function(){
    // adjust reference points
    push();
    let angle = this.velocity.heading() + PI / 2;
    translate(this.position.x, this.position.y); // this is where the thing is actually drawn!
    rotate(angle);
    // weight lines and perception ellipse
    strokeWeight(2);
    noFill();
    // food parameters
    stroke(0, 255, 0, 100);
    line(0, 0, 0, -this.dna[0] * 20)
    ellipse(0, 0, this.dna[2] * 2)
    // poison parameters
    stroke(255, 0, 0, 100);
    line(0, 0, 0, -this.dna[1] * 20)
    ellipse(0, 0, this.dna[3] * 2)
    // boids
    // set coloring
    strokeWeight(7);
    var grn = color(0, 255, 0);
    var rd = color(255, 0, 0);
    var col = lerpColor(rd, grn, this.health)
    stroke(col);
    // draw the vehicle
    triangle(0, -this.r, this.r / 4, 0, -this.r / 4, 0);
    pop();
  }
}
