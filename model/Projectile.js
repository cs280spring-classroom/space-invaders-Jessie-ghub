import Block from "./Block.js";

class Projectile extends Block{
  constructor(x,y,velocity) {
    super(x,y,20,20);
    this.velocity = velocity;
    const img = new Image(50, 50);
    img.src = "./assets/missile.png";
    this.img = img;
  }

  update() {
    this.y -= this.velocity;
  }
}

export default Projectile;