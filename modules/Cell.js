export class Cell {
  constructor(index) {
    this.index = index;
  }

  createCell() {
    const button = document.createElement('button');
    button.classList.add('cell');
    button.dataset.index = this.index;
    return button;
  }
}