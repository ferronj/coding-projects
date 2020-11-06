class Snake {
  constructor() {
    this.position = createVector(width / 2, height / 2);
    this.velocity = createVector();
    this.seg = []; // this keeps track of where all my segments are
    this.segLength = 20;
    this.size = 5;
    this.seg.push(this.position);
    // this.velocity.setMag()  // just in case
    // this.segment = 20; //how long is each segment of the Snake
  }

  eat() {
    let index = this.seg.length-1
    this.seg.push(createVector(this.seg[index].add(
      this.velocity.setMag(this.segLength))))
  }

  update() {
    let index = this.seg.length-1
    let newSeg = this.seg[index].add(this.velocity);
    this.seg.push(newSeg)
    this.seg.splice(0,1)
  }

  turn(x, y) {
    this.velocity = createVector(x, y);
  }

  show() {
    strokeWeight(this.segLength);
    stroke(25, 224, 25);
    for (let i = 0; i < this.seg.length; i++) {
      point(this.seg[i].x, this.seg[i].y);
    }
  }
}
