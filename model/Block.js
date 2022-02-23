class Block {
    constructor(x, y, width, height) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
    }
    
    // draw image
    draw(ctx) {
        ctx.beginPath();
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        ctx.closePath();
    }
  }
  
  export default Block;