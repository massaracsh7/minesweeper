export default class Cell {
  constructor(index) {
    this.index = index;
  }

  createCell() {
    let button = document.createElement("button");
    this.button = button
    this.button.classList.add("cell");
    this.button.dataset.index = this.index;
    return this.button;
  }
}