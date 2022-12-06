const startPage = () => {
	app.innerHTML = `
  <section class="homeContainer" id="homeContainer">
    <button class="startButton" id="startButton">
  START
      </button>
  
  </section>
  `;

	const startButton = document.getElementById("startButton");

	startButton.onclick = () => {
		gamePage();
	};
};
startPage();

const gamePage = () => {
	app.innerHTML = `
<div id="gameContainer">
<canvas id="canvas">
</canvas>
</div>`;

	const gameContainer = document.getElementById("gameContainer");
	const canvas = document.getElementById("canvas");

	let seconds = 0;
	const gameTimer = () => {
		seconds++;
		let mins = Math.floor(seconds / 60);
		let secs = Math.floor(seconds % 60);
		// time.innerHTML =
		// 	mins.toString().padStart(2, "0") + ":" + secs.toString().padStart(2, "0");
	};

	const showTime = () => {
		seconds = 0;
		if (game.play) {
			setInterval(gameTimer, 1000);
		}
	};

	let height;
	let width;
	let windowWidth;
	let windowHeight;
	let tile = canvas.width / 15;

	const player1 = {
		speed: tile,
		width: tile,
		height: tile,
		color: "blue",
		score: 0,
		lives: 0,
		image: "./assets/img/bomberman.png",
		x: canvas.width / 2,
		y: canvas.height / 2,
	};

	const CanvasResize = () => {
		width = canvas.offsetWidth;
		height = canvas.offsetHeight;
		windowWidth = body.offsetWidth;
		windowHeight = body.offsetHeight;
		canvas.setAttribute("height", height);
		canvas.setAttribute("width", width);
		tile = canvas.width / 15;
		player1.width = tile;
		player1.height = tile;
		player1.y = canvas.height / 2;
		player1.x = canvas.width / 2;
	};
	CanvasResize();
	window.addEventListener("resize", CanvasResize);

	const ctx = canvas.getContext("2d");

	const player1Image = new Image();
	player1Image.src = player1.image;

	const game = {
		play: false,
		req: "",
	};

	//kolizja może się przyda
	function col(a, b) {
		let boo =
			a.x < b.x + b.width &&
			a.x + a.width > b.x &&
			a.y < b.y + b.height &&
			a.y + a.height > b.y;
		if (boo) {
			// console.log("HIT");
		}
		return boo;
	}

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

	//PLAYER STEERING
	const keyz = {
		ArrowLeft: false,
		ArrowRight: false,
		ArrowUp: false,
		ArrowDown: false,
	};

	document.addEventListener("keydown", (e) => {
		if (e.code in keyz) {
			keyz[e.code] = true;
		}
	});
	document.addEventListener("keyup", (e) => {
		if (e.code in keyz) {
			keyz[e.code] = false;
		}
	});

	function draw() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		// if (time.textContent.includes("00:00")) {
		// 	gameOver();
		// }

		if (keyz.ArrowLeft) {
			player1.x -= player1.speed;
		}
		if (keyz.ArrowRight) {
			player1.x += player1.speed;
		}
		if (keyz.ArrowUp) {
			player1.y -= player1.speed;
		}
		if (keyz.ArrowDown) {
			player1.y += player1.speed;
		}
		ctx.drawImage(
			player1Image,
			player1.x,
			player1.y,
			player1.width,
			player1.height
		);
		if (game.play) {
			game.req = requestAnimationFrame(draw);
		}
	}
	gameStart();
};
