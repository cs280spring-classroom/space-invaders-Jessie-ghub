import './style.css';
import Game from './model/Game.js';

const img = new Image(50, 50);
img.src = './assets/tank.png';
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
const game = new Game(canvas.width, canvas.height);

function draw() {
	// gameStatus:[isGameOver, Score]
	var gameStatus = game.draw(ctx);
	if (!gameStatus[0]) {
		window.requestAnimationFrame(draw);
	} else {
		// show game over status
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.drawImage(img, canvas.width / 2 - 25, canvas.height - 60, 50, 50);
		ctx.fillText('Invaders shot down: ' + gameStatus[1], 8, 20);
		ctx.fillText('Game Over!', 8, 40);
	}
}

draw();
