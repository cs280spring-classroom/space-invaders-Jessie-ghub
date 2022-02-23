import Block from "./Block.js";

class Tank extends Block{
    constructor(x, y) {
        super(x,y,50,50);
        const img = new Image(50, 50);
        img.src = "./assets/tank.png";
        this.img = img;
        this.dx = 0;
        this.dy = 0;
        // handle right and left shift
        document.addEventListener("keydown", this.keyDownHandler.bind(this));
        document.addEventListener("keyup", this.keyUpHandler.bind(this));
      }

      keyDownHandler(e) {
        if (e.key === "Right" || e.key === "ArrowRight") {
          this.dx = 2;
        } else if (e.key === "Left" || e.key === "ArrowLeft") {
          this.dx = -2;
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
        // avoid out of boundary
        if (this.x < 0) {
          this.x = 0;
        } else if (this.x + this.width > canvasWidth) {
          this.x = canvasWidth - this.width;
        }
      }
  }
  
  export default Tank;
  