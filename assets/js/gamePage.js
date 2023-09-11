import heartImage from "./../img/heart.png";

const gamePage = () => {
	app.innerHTML = `
		<div id="gameContainer">
			<canvas id="canvas"></canvas>
			<div id="time-container">
				Time: <div id="time-counter">10:00</div>
			</div>
			<div id="lives-container">
				Lives: 
				<div id="lives-counter">
					<img width="40" height ="40" class="heart-icon first" src="${heartImage}"></img>
					<img width="40" height ="40" class="heart-icon second" src="${heartImage}"></img>
					<img width="40" height ="40" class="heart-icon third" src="${heartImage}"></img>
				</div>	
			</div>
			<player id="exit-btn-link-container" href="./index.html">
				<div id="exit-btn">
					Exit
				</div>
			</player>
		</div>`;

	const timeCounter = document.getElementById("time-counter");
	const canvas = document.getElementById("canvas");

	let seconds;
	const gameTimer = () => {
		seconds--;
		let mins = Math.floor(seconds / 60);
		let secs = Math.floor(seconds % 60);
		timeCounter.innerHTML =
			mins.toString().padStart(2, "0") + ":" + secs.toString().padStart(2, "0");
	};

	const showTime = () => {
		seconds = 600;
		if (game.play) {
			setInterval(gameTimer, 1000);
		}
	};
	let height = canvas.offsetHeight;
	let width = canvas.offsetWidth;
	let windowWidth = body.offsetWidth;
	let windowHeight = body.offsetHeight;
	let tile = width / 15;
	const grid = [];

	// Initialize the grid with information about walls

	const player1 = {
		speed: 3,
		width: tile * 0.8,
		height: tile * 0.8,
		color: "blue",
		score: 0,
		lives: 0,
		image: "./assets/img/bomberman.png",
		x: tile,
		y: tile,
	};

	const CanvasResize = () => {
		width = canvas.offsetWidth;
		height = canvas.offsetHeight;
		windowWidth = body.offsetWidth;
		windowHeight = body.offsetHeight;
		canvas.setAttribute("height", height);
		canvas.setAttribute("width", width);
		tile = width / 15;
		player1.width = tile * 0.8;
		player1.height = tile * 0.8;
		player1.y = tile;
		player1.x = tile;
	};
	CanvasResize();
	window.addEventListener("resize", CanvasResize);

	const innerWalls = [
		{
			x: 2 * tile,
			y: 2 * tile,
			width: tile,
			height: tile,
		},
		{
			x: 4 * tile,
			y: 2 * tile,
			width: tile,
			height: tile,
		},
		{
			x: 6 * tile,
			y: 2 * tile,
			width: tile,
			height: tile,
		},
		{
			x: 8 * tile,
			y: 2 * tile,
			width: tile,
			height: tile,
		},
		{
			x: 10 * tile,
			y: 2 * tile,
			width: tile,
			height: tile,
		},
		{
			x: 12 * tile,
			y: 2 * tile,
			width: tile,
			height: tile,
		},
		{
			x: 2 * tile,
			y: 4 * tile,
			width: tile,
			height: tile,
		},
		{
			x: 4 * tile,
			y: 4 * tile,
			width: tile,
			height: tile,
		},
		{
			x: 6 * tile,
			y: 4 * tile,
			width: tile,
			height: tile,
		},
		{
			x: 8 * tile,
			y: 4 * tile,
			width: tile,
			height: tile,
		},
		{
			x: 10 * tile,
			y: 4 * tile,
			width: tile,
			height: tile,
		},
		{
			x: 12 * tile,
			y: 4 * tile,
			width: tile,
			height: tile,
		},
	];

	const player1Image = new Image();
	player1Image.src = player1.image;

	const wall = {
		width: tile,
		height: tile,
		image: "./assets/img/wall.png",
	};

	const wallImage = new Image();
	wallImage.src = wall.image;

	const ctx = canvas.getContext("2d");

	const game = {
		play: false,
		req: "",
	};

	//kolizja może się przyda
	// function col(player, enemy) {
	// 	let boo =
	// 		player.x < enemy.x + enemy.width &&
	// 		player.x + player.width > enemy.x &&
	// 		player.y < enemy.y + enemy.height &&
	// 		player.y + player.height > enemy.y;
	// 	if (boo) {
	// 		console.log("HIT");
	// 	}
	// 	return boo;
	// }

	// function colUp(player, enemy) {
	// 	let boo =
	// 		player.x < enemy.x + (enemy.width * 9) / 10 &&
	// 		player.x + (player.width * 9) / 10 > enemy.x &&
	// 		player.y < enemy.y + enemy.height / 8 &&
	// 		player.y + player.height > enemy.y;
	// 	if (boo) {
	// 		console.log("HIT");
	// 	}
	// 	return boo;
	// }

	// function colDown(player, enemy) {
	// 	let boo =
	// 		player.x < enemy.x + (enemy.width * 9) / 10 &&
	// 		player.x + (player.width * 9) / 10 > enemy.x &&
	// 		player.y < enemy.y + enemy.height &&
	// 		player.y + player.height / 8 > enemy.y;
	// 	if (boo) {
	// 		console.log("HIT");
	// 	}
	// 	return boo;
	// }

	// function colLeft(player, enemy) {
	// 	let boo =
	// 		player.x < enemy.x + enemy.width / 8 &&
	// 		player.x + player.width > enemy.x &&
	// 		player.y < enemy.y + (enemy.height * 9) / 10 &&
	// 		player.y + (player.height * 9) / 10 > enemy.y;
	// 	if (boo) {
	// 		console.log("HIT");
	// 	}
	// 	return boo;
	// }
	// function colRight(player, enemy) {
	// 	let boo =
	// 		player.x < enemy.x + enemy.width &&
	// 		player.x + player.width / 8 > enemy.x &&
	// 		player.y < enemy.y + (enemy.height * 9) / 10 &&
	// 		player.y + (player.height * 9) / 10 > enemy.y;
	// 	if (boo) {
	// 		console.log("HIT");
	// 	}
	// 	return boo;
	// }

	function gameOver() {
		clearInterval(gameTimer);
		seconds = 0;
		cancelAnimationFrame(game.req);
		game.play = false;
		// ctx.beginPath();
		scorePage();
	}

	function gameStart() {
		game.req = requestAnimationFrame(draw);
		game.play = true;
		showTime();
		player1.score = 0;
		player1.lives = 3;
	}
	// OLD PLAYER STEERING
	// const keyz = {
	// 	ArrowLeft: false,
	// 	ArrowRight: false,
	// 	ArrowUp: false,
	// 	ArrowDown: false,
	// };
	// document.addEventListener("keydown", (e) => {
	// 	if (e.code in keyz) {
	// 		keyz[e.code] = true;
	// 	}
	// });
	// document.addEventListener("keyup", (e) => {
	// 	if (e.code in keyz) {
	// 		keyz[e.code] = false;
	// 	}
	// });

	//initialize grid of walls
	for (let i = 0; i < 15; i++) {
		grid[i] = [];
		for (let j = 0; j < 15; j++) {
			if (i === 0 || i === 14 || j === 0 || j === 14) {
				grid[i][j] = true;
			} else {
				grid[i][j] = false;
			}
		}
	}

	//add innerwalls to grid
	for (const wall of innerWalls) {
		const wallX = Math.floor(wall.x / tile);
		const wallY = Math.floor(wall.y / tile);
		grid[wallX][wallY] = true;
	}

	//player movement
	function movePlayer(direction) {
		const playerX = player1.x / tile;
		const playerY = player1.y / tile;
		let newX = playerX;
		let newY = playerY;
		if (direction === "left") {
			newX--;
		} else if (direction === "right") {
			newX++;
		} else if (direction === "up") {
			newY--;
		} else if (direction === "down") {
			newY++;
		}

		//check player and grid collisions
		if (!grid[Math.floor(newX)][Math.floor(newY)]) {
			player1.x = newX * tile;
			player1.y = newY * tile;
		}
	}

	//key listener
	document.addEventListener("keydown", (e) => {
		if (e.code === "ArrowLeft") {
			movePlayer("left");
		} else if (e.code === "ArrowRight") {
			movePlayer("right");
		} else if (e.code === "ArrowUp") {
			movePlayer("up");
		} else if (e.code === "ArrowDown") {
			movePlayer("down");
		}
	});

	function draw() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		// if (time.textContent.includes("00:00")) {
		// 	gameOver();
		// }

		ctx.drawImage(
			player1Image,
			player1.x,
			player1.y,
			player1.width,
			player1.height
		);
		for (let i = 0; i < 15; i++) {
			//external walls
			ctx.drawImage(wallImage, 0, tile * i, tile, tile);
			ctx.drawImage(wallImage, tile * i, 0, tile, tile);
			ctx.drawImage(wallImage, tile * i, canvas.height - tile, tile, tile);
			ctx.drawImage(wallImage, canvas.width - tile, tile * i, tile, tile);
			//Internal walls
			ctx.drawImage(wallImage, 2 * i * tile, 2 * tile, tile, tile);
			ctx.drawImage(wallImage, 2 * i * tile, 4 * tile, tile, tile);
			ctx.drawImage(wallImage, 2 * i * tile, 6 * tile, tile, tile);
			ctx.drawImage(wallImage, 2 * i * tile, 8 * tile, tile, tile);
			ctx.drawImage(wallImage, 2 * i * tile, 10 * tile, tile, tile);
			ctx.drawImage(wallImage, 2 * i * tile, 12 * tile, tile, tile);
		}

		if (game.play) {
			game.req = requestAnimationFrame(draw);
		}
	}
	gameStart();
};

export default gamePage;
