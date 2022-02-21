import "./style.css";
import Projectile from "./model/Projectile.js";
import Invader from "./model/Invader.js";
import Tank from "./model/Tank.js";

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
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

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  tank.draw(ctx);
  if (tank.x != canvas.width / 2 - 25) {
    gameOn = true;
    music.play();
  }
  console.log(gameOn);

  tank.move(canvas.width);
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  
  ctx.fillText("Invaders shot down: " + score, 8, 20);
  ctx.fillText("Missiles remaining: " + remain, 8, 40);
  for( var i = 0; i < projectiles.length; i++){
    let projectile = projectiles[i];
    projectile.draw(ctx);
    projectile.update();
    // out of vision
    if (projectile.y == -10) {
      remain++;
      projectiles.splice(i, 1); 
    }
  }
  if (gameOn) {
  let randomNumber1 = Math.floor(Math.random() * canvas.width - 25);
  let randomNumber2 = Math.floor(Math.random() * canvas.width - 25);
  if (randomNumber1 == randomNumber2){
    let random = Math.floor(Math.random() * 5);
    let speed = 1;
    if (random == 2 || random == 3) {
      speed = 3;
    }
    // avoid out of left limit
    if (randomNumber1 < 20){
      randomNumber1 += 20;
    }
    invaders.push(new Invader(randomNumber1, 0, speed));
  }
}
  for( var i = 0; i < invaders.length; i++){ 
  //invaders.forEach((invader) => {
    let invader = invaders[i];
    invader.draw(ctx);
    invader.update();
    for( var j = 0; j < projectiles.length; j++){ 
      let projectile = projectiles[j];
      if (invader.intersects(projectile)){
        score++;
        hit.play();
        invaders.splice(i, 1); 
        projectiles.splice(j, 1); 
        remain++;
      }
    }
    if (invader.y == canvas.height) { 
      isGameOver = true;
      music.pause();
    }
  }

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
