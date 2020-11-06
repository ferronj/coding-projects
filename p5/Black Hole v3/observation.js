function Observation(source, observer, x, y) {

  this.x = x;
  this.y = y;
  this.r = 200;
  this.obs = [];
  this.source = source;
  this.observer = observer;

  this.makeObservation = function() {
    let lenS = this.source.length;
    let lenO = this.observer.length;
    if (lenS != lenO){
      this.source.splice(lenS, lenS - lenO);
    }

    for (i = 0; i < lenS; i++){
        let angle = this.source[i].angleBetween(this.observer[i]);
        this.obs.push(angle);
    }
  }

  this.show = function() {
    noStroke();
    fill(0);
    ellipse(this.x, this.y, this.r*2);
    for (i = 0; i < this.obs.length; i++){
      push();
      stroke(4);
      let col = color(237, 246, 58);
      fill(col);
      translate(this.x, this.y);
      let angle = this.obs[i];
      rotate(angle);
      line(0, 0, this.r, 0);
      pop();
    }


  }
}
