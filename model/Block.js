
class Block {
    // constructor(img, width, height) {
    //   this.img = img;
    //   this.height = height;
    //   this.width = width;
    // }
  
    // draw(ctx) {
    //   ctx.beginPath();
    //   ctx.drawImage(this.img, canvas.width / 2 - 25, canvas.height - 60, this.width, this.height);
    //   //ctx.fillStyle = red;
    //   //ctx.fill();
    //   ctx.closePath();
    // }

    constructor(x, y) {
        this.x = x;
        this.y = y;
        const img = new Image(50, 50);
        img.src = "./assets/tank.png";
        this.img = img;
        this.width = 50;
        this.height = 50;
        this.dx = 0;
        this.dy = 0;
        this.displacement = 2;
        document.addEventListener("keydown", this.keyDownHandler.bind(this));
        document.addEventListener("keyup", this.keyUpHandler.bind(this));
      }

      keyDownHandler(e) {
        if (e.key === "Right" || e.key === "ArrowRight") {
          this.dx = this.displacement;
        } else if (e.key === "Left" || e.key === "ArrowLeft") {
          this.dx = -this.displacement;
        }
      }
    
      keyUpHandler(e) {
        if (e.key === "Right" || e.key === "ArrowRight") {
          this.dx = 0;
        } else if (e.key === "Left" || e.key === "ArrowLeft") {
          this.dx = 0;
        }
      }


      move(canvasWidth) {
        this.x += this.dx;
        this.y += this.dy;
        if (this.x < 0) {
          this.x = 0;
        } else if (this.x + this.width > canvasWidth) {
          this.x = canvasWidth - this.width;
        }
      }
    
      draw(ctx) {
        ctx.beginPath();
        //ctx.rect(this.x, this.y, this.width, this.height);
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        //ctx.fillStyle = this.color;
        //ctx.fill();
        ctx.closePath();
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
  
  export default Block;
  