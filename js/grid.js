import * as config from "./config";

const parent = document.querySelector("#game-board");

export function create_grid() {
  for (let i = 0; i < config.boardsize; i++) {
    for (let j = 0; j < config.boardsize; j++) {
      create_tile();
    }
  }
  return parent;
}

function create_tile() {
  let tile = document.createElement("div");
  tile.classList.add("tile");
}
