class Planet {
  float radius;
  float angle;
  float distance;
  Planet[] planets;
  float orbitspeed;
  
  Planet(float r, float d, float o) {
    radius = r;
    distance = d;
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
      float d = random(75, 300);
      float o = random(-0.01, 0.05);
      planets[i] = new Planet(r, d / level, o);
      if (level < 2) {
        int num = int(random(0, 4));
        planets[i].spawnMoons(num, level + 1);
      }
    }
  }
  
  void show() {
    pushMatrix();
    fill(255, 100);
    rotate(angle);
    translate(distance, 0);
    sphere(radius)
    //ellipse(0, 0, radius*2, radius * 2);
    if (planets != null) {
      for (int i = 0; i < planets.length; i++) {
        planets[i].show();
      }
    }
    popMatrix();
    }
}
