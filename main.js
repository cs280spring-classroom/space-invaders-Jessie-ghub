import "./style.css";
import Projectile from "./model/Projectile.js";
import Invader from "./model/Invader.js";
import Block from "./model/Block.js";
//import Brick from "./model/Brick.js";

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const projectiles = [];
const invaders = [];

invaders.push(new Invader(20, 60, 1));
const img = new Image(50, 50);
img.src = "./assets/tank.png";
const invader = new Image(50, 50);
invader.src = "./assets/invader.png";

//const tank = new Block(img, 50, 50);
const block = new Block(
  canvas.width / 2 - 25,
  canvas.height - 60,
);
let score = 0;
let remain = 10;
let isGameOver = false;
let gameOn = false;
let time = 0;
addEventListener("keydown", ({key}) => {
  switch(key){
    case ' ':
      projectiles.push(new Projectile(block.x + 5, block.y, 2));
      remain--;
  }
})

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  block.draw(ctx);
  if (block.x != canvas.width / 2 - 25) {
    gameOn = true;
  }
  console.log(gameOn);

  block.move(canvas.width);
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  
  ctx.fillText("Invaders shot down: " + score, 8, 20);
  ctx.fillText("Missiles remaining: " + remain, 8, 40);
  projectiles.forEach((projectile) => {
    projectile.draw(ctx);
    projectile.update();
    // out of vision
    if (projectile.y == -10 && projectile.visible) {
      remain++;
    }
  });
  const randomNumber1 = Math.floor(Math.random() * canvas.width - 25);
  const randomNumber2 = Math.floor(Math.random() * canvas.width - 25);
  if (randomNumber1 == randomNumber2){
    const random = Math.floor(Math.random() * 5);
    let speed = 1;
    if (random == 2 || random == 3) {
      speed = 3;
    }
    // avoid out of left limit
    if (randomNumber1 <20){
      randomNumber1 += 20;
    }
    invaders.push(new Invader(randomNumber1, 0, speed));
  }
  invaders.forEach((invader) => {
    invader.draw(ctx);
    invader.update();
    projectiles.forEach((projectile) => {
      if (invader.colides(projectile)){
        score++;
        projectile.visible = false;
        remain++;
      }
    });
    if (invader.y == canvas.height && invader.visible) { 
      isGameOver = true;
    }
  });
  //paddle.move(canvas.width);
  //ctx.drawImage(img, canvas.width / 2 - 25, canvas.height - 60, 50, 50);
  //ctx.drawImage(invader, canvas.width / 2 - 25, canvas.height - 100, 50, 50);
  //window.requestAnimationFrame(draw);
  if (!isGameOver) {
    window.requestAnimationFrame(draw);
  } else {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, canvas.width / 2 - 25, canvas.height - 60, 50, 50);
    ctx.fillText("Invaders shot down: " + score, 8, 20);
    ctx.fillText("Game Over!", 8, 40);
  }
}

draw();
