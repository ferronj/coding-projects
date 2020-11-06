//https://www.asc.ohio-state.edu/orban.14/stemcoding/blackhole.html
//https://www.youtube.com/watch?v=tWyp2OWWcws

//Black Hole Model version 1 uses a point photon and is used primarily
//for tuning of properties and physics characteristics
//to add: Color based on particle temperature, interaction between particles,
//

let G = 0.5;
let c = 5;
let speedScale = 0.99;
let particleMass = 0.001
let blackholeMass = 1000
let massive;
var particles = [];

function setup() {
  createCanvas(720, 480);

  debug = createCheckbox('debug');

  var reset = createButton('reset');
  reset.mouseClicked(resetSketch);

  massive = new Massive(blackholeMass, width/2, height/2);
}

function resetSketch() {

  if (particles.length != 0){
    particles.splice(0, particles.length);
  }

  // for (i = 0; i < 100; i++) {
  //   var x =  random(width);
  //   var y =  random(height);
  //   particles.push(new Particle(particleMass, width, y));
  // }
}

function draw() {
  background(51);
  massive.show();

  for (i = particles.length-1; i > 0; i--) {
    particles[i].gravity(massive);
    particles[i].update();
    particles[i].show();

    if (particles[i].edges()) {
      particles.splice(i, 1);
    } else if (dist(particles[i].pos.x, particles[i].pos.y, massive.x, massive.y) < massive.r * .25) {
        particles.splice(i, 1);
    }
  }

  if (random(0, 1) < 0.5) {
    var x =  random(width);
    var y =  random(height);
    particles.push(new Particle(particleMass, width, y))
  }

}
