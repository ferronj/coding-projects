class Planet {
  float radius;
  float angle;
  float distance;
  Planet[] planets;
  float orbitspeed;
  PVector v;
  //PVector v2;
  
  PShape globe;
  
  Planet(float r, float d, float o, PImage img) {
    v = PVector.random3D();
      
    radius = r;
    distance = d;
    v.mult(distance);
    angle = random(TWO_PI);
    orbitspeed = o;
    
    noStroke();
    noFill();
    globe = createShape(SPHERE, radius);
    globe.setTexture(img);
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
    //int maxMoons = 2;
    for (int i = 0; i < planets.length; i++) {
      
      // position less random
      float r = radius / (level * 2);
      float d = random((radius + r)*2, (radius + r)*6);
      float o = random(-0.05, 0.05);
      // moons only render with moon texture
      if (level >= 2) {
        d = random((radius + r), (radius + r)*2);
        planets[i] = new Planet(r, d, o, textures[4]);
      //int index = int(random(0,textures.length));
      } else {
        planets[i] = new Planet(r, d, o, textures[i]);
      }
      
      if (level < 2) {
        int num = int(random(0, 4));
        planets[i].spawnMoons(num, level+1);
      }
    }
  }
  
  void show() {
    pushMatrix();
    
    // get the orbital plane more in line
    PVector v2 = new PVector(1,0,1);
    PVector p = v.cross(v2);
    rotate(angle, p.x, p.y, p.z);
    //line(0,0,0, v2.x * 100, v2.y *100, v2.z*100);
    //line(0,0,0, v.x, v.y, v.z);
    
    translate(v.x, v.y, v.z);
    translate(distance, 0);
    shape(globe);
    sphere(radius);
    //ellipse(0, 0, radius*2, radius * 2);
    if (planets != null) {
      for (int i = 0; i < planets.length; i++) {
        planets[i].show();
        ellipse(-distance, 0, distance, distance);
      }
    }
    popMatrix();
    }
}
