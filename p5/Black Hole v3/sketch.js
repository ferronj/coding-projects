//https://www.asc.ohio-state.edu/orban.14/stemcoding/blackhole.html
//https://www.youtube.com/watch?v=tWyp2OWWcws

let G = 0.5;
let c = 5;
let speedScale = 0.9;
let particleMass = 0.001;
let particleFreq = 50;
let blackholeMass = 1000;
let massive;
let observation;
var particles = [];
var observer = [];
var source = [];
let count = 0;

function setup() {
  createCanvas(800, 600);

  debug = createCheckbox('debug');
  pause = createCheckbox('pause');
  massiveOn = createCheckbox('Black Hole');
  displayObs = createCheckbox("Display Observations")

  sourceY = createSlider(0, height, height/2, 1, 'sourceY');

  reset = createButton('reset');
  reset.mouseClicked(resetSketch);

  resetObs = createButton('reset observer data');
  resetObs.mouseClicked(resetObserver);

  observation = new Observation(source, observer, width / 2, height / 2);
  massive = new Massive(blackholeMass, width/2, height/2);
}

function resetSketch() {

  sourceY.value(height/2);
  if (count != 0) {count = 0}
  if (particles.length != 0){
    particles.splice(0, particles.length);
  }
}

function resetObserver() {
  if (observer.length != 0){
    source.splice(0, source.length);
    observer.splice(0, observer.length);
  }
}

function draw() {
  background(51);
  if (displayObs.checked() == false){
    for (i = particles.length-1; i > 0; i--) {
      if (massiveOn.checked()){
          particles[i].gravity(massive);
          if (dist(particles[i].pos.x, particles[i].pos.y, massive.x, massive.y) < massive.r * .25) {
              particles.splice(i, 1);
          }
      }
      particles[i].update();
      particles[i].show();

      if (particles[i].edges()) {
        let sourceVector = createVector(width, sourceY.value());
        source.push(sourceVector);
        observer.push(particles[i].pos);
        particles.splice(i, 1);
      }
    }

    if (pause.checked() == false){
        count++
        if (count % particleFreq == 0){
          var y =  sourceY.value();
          particles.push(new Particle(particleMass, width, y))
        }
    }

    if (massiveOn.checked()){
        massive.show();
    }
  } else{
    observation.show();
    }
}
