class Projectile {
  constructor(x,y,velocity) {
    this.x = x;
    this.y = y;
    this.velocity = velocity;
    const img = new Image(50, 50);
    img.src = "./assets/missile.png";
    this.img = img;
    this.width = 40;
    this.height = 40;
    this.visible = true;
  }

  draw(ctx) {
    if (this.visible) {
      ctx.beginPath();
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    //ctx.fillStyle = this.color;
    //ctx.fill();
      ctx.closePath();
    }
  }

  update() {
    //this.draw(ctx);
    //this.y = 30;
    this.y -= this.velocity;
  }
}

export default Projectile;