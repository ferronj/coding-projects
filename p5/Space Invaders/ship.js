function Ship() {
  this.x = width / 2;

  this.show = function() {
    fill(86, 244, 66);
    rectMode(CENTER);
    rect(this.x, height - 30, 30, 30);
  }

  this.move = function(dir) {
    this.x += dir * 10;
  }
}
