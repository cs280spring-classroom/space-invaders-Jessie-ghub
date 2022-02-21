import Block from "./Block.js";

class Invader extends Block{
  constructor(x,y,velocity) {
    super(x,y,40,40);
    this.velocity = velocity;
    const img = new Image(50, 50);
    img.src = "./assets/invader.png";
    this.img = img;
    this.shake = 0;
  }

  update() {
    this.y += this.velocity;
    if (this.shake % 10 == 0){
      this.x += 2;
    } else if (this.shake % 5 == 0) {
      this.x -= 2;
    }
    this.shake++;
  }

  // assume other has {x, y, width, height}
  intersects(other) {
    let tw = this.width;
    let th = this.height;
    let rw = other.width;
    let rh = other.height;
    if (rw <= 0 || rh <= 0 || tw <= 0 || th <= 0) {
      return false;
    }
    let tx = this.x;
    let ty = this.y;
    let rx = other.x;
    let ry = other.y;
    rw += rx;
    rh += ry;
    tw += tx;
    th += ty;
    // overflow || intersect
    return (
      (rw < rx || rw > tx) &&
      (rh < ry || rh > ty) &&
      (tw < tx || tw > rx) &&
      (th < ty || th > ry)
    );
  }
  draw(ctx) {
    ctx.beginPath();
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    ctx.closePath();
}

}


export default Invader;