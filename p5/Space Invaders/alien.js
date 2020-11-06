function Alien(x, y) {
  this.x = x;
  this.y = y;

  this.show = function() {
    fill(255, 100, 255);
    ellipse(this.x, this.y, 30, 30);
  }

  // this.move = function(dir) {
  //   this.x += dir * 10;
  }
