// slider to vary the branch angles
var sliderA;
var angle = 0;

// slide to vary the number of branches
var sliderB;
var branches = 0;

// slider to vary the amount of wind
var sliderW;
var windSpeed = 0;

var tree = [];
var leaves = [];

var count = 0;

function setup() {
  createCanvas(400, 400);
  // implement the slider to affect the growth angle of branches
  sliderA = createSlider(0, PI / 2, PI / 4, 0.01);
  sliderB = createSlider(0, PI / 2, PI / 4, 0.01);
  sliderW = createSlider(0, PI / 2, PI / 4, 0.01);
  var a = createVector(width / 2, height);
  var b = createVector(width / 2, height - height / 4);

  var root = new Branch(a, b);

  tree[0] = root;
}

// implete to activate only if mouse press is within the canvas
function mousePressed() {
	for (var i = tree.length - 1; i >= 0; i--) {
		if (!tree[i].finished) {
			tree.push(tree[i].branch(2, sliderA.value()));
			tree.push(tree[i].branchB(2, -sliderA.value()));
		}
		tree[i].finished = true;
	}
	count++;

  // should the leaves be a part of the Branch object?
  // should we make a tree object which puts branches and trees all together?
	if (count === 6) {
		for (var i = 0; i < tree.length; i++){
			if (!tree[i].finished) {
				var leaf = tree[i].end.copy();
				leaves.push(leaf);
			}
		}
	}
}

function draw() {
  background(51);

  for (var i = 0; i < tree.length; i++) {
    //tree[i].wind(windSpeed);
    tree[i].show();
  }

  for (var i = 0; i < leaves.length; i++) {
  	fill(255, 0, 100, 100);
  	noStroke();
  	ellipse(leaves[i].x, leaves[i].y, 8, 8);
  }
}
