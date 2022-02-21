import "./style.css";
import Projectile from "./model/Projectile.js";
import Invader from "./model/Invader.js";
import Tank from "./model/Tank.js";

class Game {
    constructor() {
        const projectiles = [];
        const invaders = [];
        
        const img = new Image(50, 50);
        img.src = "./assets/tank.png";
        const invader = new Image(50, 50);
        invader.src = "./assets/invader.png";
        var music = new Audio('./assets/music.mpeg');
        var fire = new Audio('./assets/shoot.wav');
        var hit = new Audio('./assets/explosion.wav');
        music.loop = true;
        const tank = new Tank(
            canvas.width / 2 - 25,
            canvas.height - 60,
          );
          let score = 0;
          let remain = 10;
          let isGameOver = false;
          let gameOn = false;
          addEventListener("keydown", ({key}) => {
            switch(key){
              case ' ':
                if (remain >0){
                  projectiles.push(new Projectile(tank.x + 15, tank.y, 2));
                  fire.play();
                  remain--;
                }
            }
          })
    }
  
    play() {
        
    }
  }
  
  export default Game;