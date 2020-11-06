let shape;

function setup(){
  createCanvas(480, 480);
  shape = new Shape();
}

function draw() {
   background(200);

   var leftWall = 25;
   var rightWall = 75;

   // xm is just the mouseX, while
   // xc is the mouseX, but constrained
   // between the leftWall and rightWall!
   var xm = mouseX;
   var xc = constrain(mouseX, leftWall, rightWall);

   // Draw the walls.
   stroke(150);
   line(leftWall, 0, leftWall, height);
   line(rightWall, 0, rightWall, height);

   // Draw xm and xc as circles.
   noStroke();
   fill(150);
   ellipse(xm, 33, 9, 9); // Not Constrained
   fill(0);
   ellipse(xc, 66, 9, 9); // Constrained

   shape.show();
   }

function Shape(){

  this.a = createVector(random(width),random(height));
  this.b1 = createVector(random(width),random(height));
  this.b2 = createVector(random(width),random(height));

  this.show = function(){
    fill(255);
    triangle(this.a.x, this.a.y, this.b1.x, this.b1.y, this.b2.x, this.b2.y);
  }
}
