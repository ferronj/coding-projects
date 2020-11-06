class Planet {
  float radius;
  float angle;
  float distance;
  Planet[] planets;
  float orbitspeed;
  PVector v;
  
  Planet(float r, float d, float o) {
    v = PVector.random3D();
    
    radius = r;
    distance = d;
    v.mult(distance);
    angle = random(TWO_PI);
    orbitspeed = o;
  }
  
  void orbit() {
    angle = angle + orbitspeed;
    if (planets != null) {
      for (int i = 0; i < planets.length; i++) {
        planets[i].orbit();
      }
    }
  }
  
  void spawnMoons(int total, int level) {
    planets = new Planet[total];
    for (int i = 0; i < planets.length; i++) {
      float r = radius / (level * 2);
      float d = random((radius + r), (radius+r)*2);
      float o = random(-0.01, 0.01);
      planets[i] = new Planet(r, d, o);
      if (level < 2) {
        int num = 1; //int(random(0, 4));
        planets[i].spawnMoons(num, level+1);
      }
    }
  }
  
  void show() {
    pushMatrix();
    noStroke();
    fill(255);
    //rotate(angle);
    translate(v.x, v.y, v.z);
    translate(distance, 0);
    sphere(radius);
    //ellipse(0, 0, radius*2, radius * 2);
    if (planets != null) {
      for (int i = 0; i < planets.length; i++) {
        planets[i].show();
      }
    }
    popMatrix();
    }
}
