import * as config from "./config.js";
let snakeBody = [];
let snakeX = config.tilesize * 5;
let snakeY = config.tilesize * 5;

let speedX = 0;
let speedY = 0;

let foodX;
let foodY;

let board;
let context;

let gameOver = false;

export function start() {
  board = document.querySelector("#game-board");
  board.height = config.boardsize * config.tilesize;
  board.width = config.boardsize * config.tilesize;
  context = board.getContext("2d");

  // Keyboard controls
  addEventListener("keyup", move);

  // Screen controls
  document.querySelector("#up").addEventListener("pointerdown", () => setDirection(0, -1));
  document.querySelector("#down").addEventListener("pointerdown", () => setDirection(0, 1));
  document.querySelector("#left").addEventListener("pointerdown", () => setDirection(-1, 0));
  document.querySelector("#right").addEventListener("pointerdown", () => setDirection(1, 0));

  placeFood();

  setInterval(update, config.gameSpeed / 10);
}

function update() {
  if (gameOver) {
    return;
  }

  context.fillStyle = "green";
  context.fillRect(0, 0, board.width, board.height);

  // Set food color and position
  context.fillStyle = "yellow";
  context.fillRect(foodX, foodY, config.tilesize, config.tilesize);

  if (snakeX == foodX && snakeY == foodY) {
    snakeBody.push([foodX, foodY]);
    placeFood();
  }

  // body of snake will grow
  for (let i = snakeBody.length - 1; i > 0; i--) {
    // it will store previous part of snake to the current part
    snakeBody[i] = snakeBody[i - 1];
  }
  if (snakeBody.length) {
    snakeBody[0] = [snakeX, snakeY];
  }

  context.fillStyle = "white";
  snakeX += speedX * config.tilesize; //updating Snake position in X coordinate.
  snakeY += speedY * config.tilesize; //updating Snake position in Y coordinate.
  context.fillRect(snakeX, snakeY, config.tilesize, config.tilesize);
  for (let i = 0; i < snakeBody.length; i++) {
    context.fillRect(
      snakeBody[i][0],
      snakeBody[i][1],
      config.tilesize,
      config.tilesize,
    );
  }

  checkCollision();
}

function setDirection(x, y) {
  // snake will not move in the opposite direction
  if (x == -speedX && y == -speedY) {
    return;
  }

  speedX = x;
  speedY = y;
}

function move(e) {
  if (e.code == "ArrowUp") {
    setDirection(0, -1);
  } else if (e.code == "ArrowDown") {
    setDirection(0, 1);
  } else if (e.code == "ArrowLeft") {
    setDirection(-1, 0);
  } else if (e.code == "ArrowRight") {
    setDirection(1, 0);
  }
}

function end() {
  gameOver = true;
  alert("Game Over");
}

function checkCollision() {
  if (
    snakeX < 0 ||
    snakeX > config.boardsize * config.tilesize ||
    snakeY < 0 ||
    snakeY > config.boardsize * config.tilesize
  ) {
    end();
  }

  for (let i = 0; i < snakeBody.length; i++) {
    if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
      // Snake eats own body
      end();
    }
  }
}

function placeFood() {
  // in x coordinates.
  foodX = Math.floor(Math.random() * config.boardsize) * config.tilesize;

  //in y coordinates.
  foodY = Math.floor(Math.random() * config.boardsize) * config.tilesize;
}

