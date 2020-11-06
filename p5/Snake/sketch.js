let snake;

function setup() {
  createCanvas(640, 640);
  snake = new Snake();
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    snake.turn(-1,0);
  } else if (keyCode === RIGHT_ARROW) {
    snake.turn(1, 0);
  } else if (keyCode === UP_ARROW) {
    snake.turn(0, -1);
  } else {
    snake.turn(0, 1);
  }
}

function mousePressed() {
  snake.eat();
}

function draw() {
  background(51);
  snake.update();
  snake.show();

}
