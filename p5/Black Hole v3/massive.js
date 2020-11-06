function Massive(mass, x, y) {

  this.mass = mass;
  this.x = x;
  this.y = y;
  this.r = (2 * G * this.mass) / c**2

  this.show = function() {
    noStroke();
    fill(0, 50);
    ellipse(this.x, this.y, this.r*2);

  }
}
