function Missile(x, y) {
  this.x = x;
  this.y = y;

  this.show = function() {
    fill(0, 100, 255);
    ellipse(this.x, this.y, 30, 30);
  }

  this.move = function() {
    this.y += -1;
  }
}
