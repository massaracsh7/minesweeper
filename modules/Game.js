import Page from './Page.js';
import Board from './Board.js';
import { getBombs, getRandomNum, getTimer, getResults, getFlags, getClicks, addBombs, addResults, showMessage } from './utils.js';

export default class Game {
  constructor() {
    this.page = new Page();
    this.board = null;
    this.countBombs = 10; // Default number of bombs
    this.defaultWidth = 10; // Default board width
    this.defaultHeight = 10; // Default board height
    this.init();
  }

  init() {
    this.page.createPage();
    this.board = new Board(this.defaultWidth, this.defaultHeight);

    this.loadGameState();
    this.setupEventListeners();
  }

  loadGameState() {
    const savedBombs = getBombs();
    const timer = getTimer();
    const results = getResults();
    const flags = getFlags();
    const clicks = getClicks();

    this.updateUI(timer, clicks, flags, savedBombs);
  }

  updateUI(timer, clicks, flags, bombs) {
    document.querySelector('.timer__num').textContent = timer;
    document.querySelector('.clicks__num').textContent = clicks;
    document.querySelector('.flags__num').textContent = flags;
    document.querySelector('.bombs-rest__num').textContent = this.countBombs - flags;

    const resultsList = document.querySelector('.results__list');
    resultsList.innerHTML = results || '';

    // Example of adding bombs to the board
    this.addBombsToBoard(bombs);
  }

  addBombsToBoard(bombs) {
    bombs.forEach(index => {
      const cell = this.board.getCell(index);
      if (cell) {
        cell.classList.add('bomb');
      }
    });
  }

  setupEventListeners() {
    document.querySelector('.new-game').addEventListener('click', () => {
      this.startNewGame();
    });
  }

  startNewGame() {
    this.board = new Board(this.defaultWidth, this.defaultHeight);
    this.resetGameState();
  }

  resetGameState() {
    this.updateUI(0, 0, 0, []);
  }

  checkCell(y, x, width, height) {
    return y >= 0 && y < height && x >= 0 && x < width;
  }

  handleGameEnd(message) {
    showMessage(message);
  }
}
