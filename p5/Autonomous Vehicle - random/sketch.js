let vehicles = [];
//let target;
var food = [];
var poison = [];

function setup() {
  createCanvas(800,600);
  //target = new Target();
  for (var i = 0; i < 10; i++) {
    var x = random(width);
    var y = random(height);
    vehicles.push(new Vehicle(x, y));
  }

  for (var i = 0; i < 50; i++) {
    var x = random(width);
    var y = random(height);
    food.push(createVector(x, y));
  }
  for (var i = 0; i < 10; i++) {
    var x = random(width);
    var y = random(height);
    poison.push(createVector(x, y));
  }
}

function draw (){
  background(51);
  // add some food at random times
  if (random(1) < 0.05) {
    var x = random(width);
    var y = random(height);
    food.push(createVector(x, y));
  }
  if (random(1) < 0.01) {
    var x = random(width);
    var y = random(height);
    poison.push(createVector(x, y));
  }
  // vehicle
  for (var i = vehicles.length-1; i >= 0 ; i--) {
    vehicles[i].edges();
    vehicles[i].behaviors(food, poison);
    vehicles[i].update();
    vehicles[i].show();

    if (vehicles[i].dead()) {
      vehicles.splice(i, 1);
    }
  }

  // food display
  for (var i = 0; i < food.length; i++){
    fill(0, 255, 0);
    ellipse(food[i].x, food[i].y, 8, 8);
  }
  for (var i = 0; i < poison.length; i++){
    fill(255, 0, 0);
    ellipse(poison[i].x, poison[i].y, 8, 8);
  }
  // target
  // target.update();
  // target.show();
}

// removing the target for now!
function Target() {
  this.position = createVector(random(width), random(height));
  this.r = 50;

  this.update = function() {
    this.position = createVector(mouseX, mouseY);
  }

  this.show = function(){
    push();
    noFill();
    strokeWeight(5);
    stroke(255, 0, 0, 100);
    ellipse(this.position.x, this.position.y, this.r, this.r);
    pop();
  }
}
