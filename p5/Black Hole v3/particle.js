function Particle(mass, x, y) {

  this.mass = mass;
  this.pos = createVector(x, y);
  //this.velocity = p5.Vector.random2D();
  this.velocity = createVector(-1, 0);

  this.acceleration = createVector();
  //trying this for max maxForce
  this.forceG = 0;

//c is slowed down for tuning here
  this.maxSpeed = c * speedScale;
  this.velocity.setMag(this.maxSpeed);

// put an edges function in there in case we want to use edges
  this.edges = function() {
    if (this.pos.x > width) {
      return true;
    } else if (this.pos.x < 0){
      return true;
    }
    if (this.pos.y > height) {
      return true;
    } else if (this.pos.y < 0) {
      return true;
    }
  }

  this.gravity = function(other) {
    let direction = createVector(other.x, other.y);
    direction.sub(this.pos);

    let d = dist(this.pos.x,this.pos.y, other.x, other.y);
    this.forceG = (G * other.mass * this.mass) / d**2;

    this.acceleration.add(direction);
    this.acceleration.setMag(this.forceG / this.mass);
  }

  this.update = function() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(c);
    this.pos.add(this.velocity);
  }

  this.show = function(){
    strokeWeight(4);
    var ylw = color(237, 246, 58);
    var rd = color(255, 0 , 0);
    var col = lerpColor(rd, ylw, this.velocity.mag()/c)
    stroke(col)
    point(this.pos.x, this.pos.y);

    if (debug.checked()) {
      strokeWeight(1);
      noFill();
      push();
      let angle = this.acceleration.heading();
      translate(this.pos.x, this.pos.y);
      rotate(angle);
      stroke(0, 255, 0, 100);
      line(0, 0, 0, this.acceleration.mag()*100);
      pop();
    }

  }
}
