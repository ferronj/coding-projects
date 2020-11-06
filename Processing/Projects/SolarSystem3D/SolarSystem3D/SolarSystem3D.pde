import peasy.*;

Planet sun;

PeasyCam cam;

PImage sunTexture;
PImage[] textures = new PImage[5];

float sunR = 75;

void setup() {
  size(1000,1000, P3D);
  sunTexture = loadImage("sun.jpg");
  textures[0] = loadImage("mercury.jpg");
  textures[1] = loadImage("venus.jpg");
  textures[2] = loadImage("earth.jpg");
  textures[3] = loadImage("mars.jpg");
  textures[4] = loadImage("moon.jpg");
  cam = new PeasyCam(this, 500);
  sun = new Planet(sunR, 0, 0, sunTexture);
  sun.spawnMoons(4, 1);
  
}

void draw() {
  background(0);
  float z = sunR + 50;
  pointLight(255, 255, 255, z, z, 0);
  pointLight(255, 255, 255, z, -z, 0);
  pointLight(255, 255, 255, -z, z, 0);
  pointLight(255, 255, 255, -z, -z, 0);
  pointLight(255, 255, 255, 0, z, z);
  pointLight(255, 255, 255, 0, -z, -z);
  pointLight(255, 255, 255, 0, z, -z);
  pointLight(255, 255, 255, 0, -z, z);
  //lights();
  sun.show();
  sun.orbit();
}
