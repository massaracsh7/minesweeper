import Cell from "./Cell.js";

class Board {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.wrapper = document.querySelector('.wrapper');
    this.board = document.querySelector('.board');
    this.createBoard();
  }

  createBoard() {
    if (this.board) {
      this.wrapper.removeChild(this.board);
    }

    this.board = document.createElement('div');
    this.board.classList.add('board');
    this.wrapper.appendChild(this.board);

    this.setGridTemplateColumns();

    this.createCells();

    return this.board;
  }

  setGridTemplateColumns() {
    if (document.body.offsetWidth <= 750) {
      this.board.style.gridTemplateColumns = `repeat(${this.width}, 20px)`;
    } else if (document.body.offsetWidth <= 1000) {
      this.board.style.gridTemplateColumns = `repeat(${this.width}, 30px)`;
    } else {
      this.board.style.gridTemplateColumns = `repeat(${this.width}, 40px)`;
    }
  }

  createCells() {
    const count = this.width * this.height;
    for (let i = 0; i < count; i++) {
      const cell = new Cell(i);
      const box = cell.createCell();
      this.board.appendChild(box);
    }
  }
}

export default Board;
