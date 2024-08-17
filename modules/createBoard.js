import Cell from "./Cell.js";

export default function createBoard(width, height) {
  let wrapper = document.querySelector('.wrapper');
  let board = document.querySelector(".board");
  wrapper.removeChild(board);
  board = document.createElement("div");
  board.classList.add("board");
  wrapper.appendChild(board);
  board.innerHTML = '';
  
    board.style.gridTemplateColumns = `repeat(${height}, 40px)`;
      if (document.body.offsetWidth <= 1000) {
        board.style.gridTemplateColumns = `repeat(${height}, 30px)`;
      }
    if (document.body.offsetWidth <= 750) {
      board.style.gridTemplateColumns = `repeat(${height}, 20px)`;
    }
  let count = width * height;
  for (let i = 0; i < count; i++) {
    let cell = new Cell(i);
    let box = cell.createCell();
    board.appendChild(box);
  }
  return board;
}
