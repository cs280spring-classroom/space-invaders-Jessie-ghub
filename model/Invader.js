class Invader {
  constructor(x,y,velocity) {
    this.x = x;
    this.y = y;
    this.velocity = velocity;
    const img = new Image(50, 50);
    img.src = "./assets/invader.png";
    this.img = img;
    this.width = 40;
    this.height = 40;
    this.visible = true;
  }

  move() {
    this.x += this.dx;
    this.y += this.dy;
  }

  draw(ctx) {
    if (this.visible) {
      ctx.beginPath();
    //ctx.rect(this.x, this.y, this.width, this.height);
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    //ctx.fillStyle = this.color;
    //ctx.fill();
      ctx.closePath();
    }
  }

  update() {
    //this.draw(ctx);
    //this.y = 30;
    this.y += this.velocity;
  }

  colides(projectile) {
    if (this.visible && this.intersects(projectile)) {
      this.visible = false;
      return true;
    }
    return false;
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

}


export default Invader;