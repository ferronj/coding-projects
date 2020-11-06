var ship;
var alien = [];
var missile;

function setup() {
  createCanvas(600, 400);
  ship = new Ship();
  missile = new Missile(width/2, height/2);
  for (var i = 0; i < 8; i++) {
    alien[i] = new Alien(i * 60 + 80, 50);
  }
}

function draw() {
  background(51);
  ship.show();
  missile.show()
  for (var i = 0; i < alien.length; i++) {
    alien[i].show();
  }
}

function keyPressed() {
  if (keyCode === RIGHT_ARROW) {
    ship.move(1);
  } else if (keyCode === LEFT_ARROW){
    ship.move(-1);
  }
}
