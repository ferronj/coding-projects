let vehicles = [];
//let target;
var food = [];
var poison = [];
let debug;
let csv;
let sample = 0;

function setup() {
  createCanvas(windowWidth-300,windowHeight-200);
  resetSketch();

  debug = createCheckbox('debug');

  setInterval(recordPopulation, 5000);
  // var record = createButton('record population data');
  // record.mouseClicked(recordPopulation);

  var output = createButton('output population data');
  output.mouseClicked(outputData);

  var reset = createButton('reset');
  reset.mouseClicked(resetSketch);

  var poisonButton = createButton('Poison');
  poisonButton.mouseClicked(addPoison);
}

function mouseDragged() {
  vehicles.push(new Vehicle(mouseX, mouseY));
}

function recordPopulation() {
  sample++
  for (var i = 0; i < vehicles.length; i++){
    let newRow = csv.addRow();
      newRow.setString("sample", sample);
      newRow.setString("vehicle", i);
      newRow.setString("size", vehicles[i].r);
      newRow.setString("food_weight", vehicles[i].dna[0]);
      newRow.setString("poison_weight", vehicles[i].dna[1]);
      newRow.setString("food_perception", vehicles[i].dna[2]);
      newRow.setString("poison_perception", vehicles[i].dna[3]);
    }
  }

function outputData() {
  let filename = "vehicles.csv";
  saveTable(csv, filename, "csv");
}

function resetSketch() {
  if (vehicles.length != 0) {
    vehicles.splice(0,vehicles.length);
    food.splice(0, food.length);
    poison.splice(0, poison.length);
  }

  for (var i = 0; i < 50; i++) {
    var x = random(width);
    var y = random(height);
    vehicles.push(new Vehicle(x, y));
  }

  for (var i = 0; i < 100; i++) {
    var x = random(width);
    var y = random(height);
    food.push(createVector(x, y));
  }
  for (var i = 0; i < 100; i++) {
    var x = random(width);
    var y = random(height);
    poison.push(createVector(x, y));
  }

  let headers = ["sample","vehicle","size","food_weight","poison_weight","food_perception","poison_perception"]
  csv = new p5.Table();
  for (var i = 0; i < headers.length; i++){
    let col = headers[i];
    csv.addColumn(col);
  }
}

function addPoison() {
  var x = random(width);
  var y = random(height);
  poison.push(createVector(x, y));
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

    var newVehicle = vehicles[i].reproduce();
    if (newVehicle != null) {
      vehicles.push(newVehicle);
    }

    if (vehicles[i].dead()) {
      var x = vehicles[i].position.x;
      var y = vehicles[i].position.y;
      food.push(createVector(x,y));
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

}
