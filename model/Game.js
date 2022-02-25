import Projectile from './Projectile.js';
import Invader from './Invader.js';
import Tank from './Tank.js';

const projectiles = [];
const invaders = [];

// set image
const invader = new Image(50, 50);
invader.src = './assets/invader.png';
var fire = new Audio('./assets/shoot.wav');
var hit = new Audio('./assets/explosion.wav');

// set background music and make it loop
var music = new Audio('./assets/music.mpeg');
music.loop = true;

let score = 0;
let remain = 10;
let gameOn = false;

class Game {
	constructor(width, height) {
		this.width = width;
		this.height = height;
		this.tank = new Tank(width / 2 - 25, height - 60);
		// fire when hit space key
		document.addEventListener('keydown', ({ key }) => {
			switch (key) {
				case ' ':
					if (remain > 0) {
						projectiles.push(new Projectile(this.tank.x + 15, this.tank.y, 2));
						fire.play();
						remain--;
					}
					break;
				default:
					break;
			}
		});
	}

	draw(ctx) {
		ctx.clearRect(0, 0, this.width, this.height);
		this.tank.draw(ctx);
		// the game starts as soon as a player moves the tank but not before that
		if (this.tank.x != this.width / 2 - 25) {
			gameOn = true;
			music.play();
		}
		this.tank.move(this.width);

		// disply the number of missiles remaining and the number of invaders shot down
		ctx.font = '16px Arial';
		ctx.fillStyle = '#0095DD';
		ctx.fillText('Invaders shot down: ' + score, 8, 20);
		ctx.fillText('Missiles remaining: ' + remain, 8, 40);

		// handle projectiles movement, destory missiles that exit the canvas
		for (var i = 0; i < projectiles.length; i++) {
			let projectile = projectiles[i];
			projectile.draw(ctx);
			projectile.update();
			// out of vision
			if (projectile.y == -10) {
				remain++;
				projectiles.splice(i, 1);
			}
		}

		// set invaders
		if (gameOn) {
			// make invaders appear at random intervals
			let randomNumber1 = Math.floor(Math.random() * this.width);
			let randomNumber2 = Math.floor(Math.random() * this.width);
			if (randomNumber1 > randomNumber2 - 2 && randomNumber1 < randomNumber2) {
				let speed = 1;
				// make some faster than others
				let random = Math.floor(Math.random() * 5);
				if (random == 2 || random == 3) {
					speed = 3;
				}
				// make sure it's in view
				if (randomNumber1 > this.width - 45) {
					randomNumber1 -= 45;
				}
				invaders.push(new Invader(randomNumber1, 0, speed));
			}
		}

		// handle invader movement
		for (var i = 0; i < invaders.length; i++) {
			let invader = invaders[i];
			invader.draw(ctx);
			invader.update();

			// detect and manage crush (destory the invader and projectile)
			for (var j = 0; j < projectiles.length; j++) {
				let projectile = projectiles[j];
				if (invader.intersects(projectile)) {
					score++;
					hit.play();
					invaders.splice(i, 1);
					projectiles.splice(j, 1);
					remain++;
				}
			}

			// you died
			if (invader.y == this.height) {
				music.pause();
				return [ true, score ];
			}
		}

		// continue
		return [ false, score ];
	}
}

export default Game;
