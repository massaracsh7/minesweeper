export default class Page {
  constructor() {
    this.container = null;
    this.wrapper = null;
    this.board = null;
    this.modal = null;
  }

  createPage() {
    document.body.innerHTML = '';
    this.createContainer();
    this.createModal();
    document.body.appendChild(this.modal);
    document.body.appendChild(this.container);
  }

  createContainer() {
    this.container = document.createElement('div');
    this.container.classList.add('container');

    const header = document.createElement('header');
    header.classList.add('header');
    const h1 = document.createElement('h1');
    h1.classList.add('title');
    h1.textContent = 'Minesweeper';
    header.appendChild(h1);

    const main = document.createElement('main');
    main.classList.add('main');
    this.wrapper = document.createElement('div');
    this.wrapper.classList.add('wrapper');

    const info = document.createElement('div');
    info.classList.add('info');
    info.appendChild(this.createOptions());
    info.appendChild(this.createInfoTable());
    info.appendChild(this.createResults());

    this.board = document.createElement('div');
    this.board.classList.add('board');

    this.wrapper.appendChild(info);
    this.wrapper.appendChild(this.board);
    main.appendChild(this.wrapper);
    this.container.appendChild(header);
    this.container.appendChild(main);
  }

  createOptions() {
    const options = document.createElement('div');
    options.classList.add('options');
    options.innerHTML = `
      <a class="options__title">Choose options</a>
      <div class="options__wrapper">
        <span class="bombs-output">Bombs count - 10</span>
        <input class="bombs-input" type="number" min='10' max='99' value='10'>
        <div class="size">
          <label class="size__label"><input class="input-size" type="radio" name="input-size" value="10" checked>10 x 10</label>
          <label class="size__label"><input class="input-size" type="radio" name="input-size" value="15">15 x 15</label>
          <label class="size__label"><input class="input-size" type="radio" name="input-size" value="25">25 x 25</label>
        </div>
        <div class="theme">
          <label class="theme__label"><input class="input-theme" type="radio" name="input-theme" value="light" checked>light</label>
          <label class="theme__label"><input class="input-theme" type="radio" name="input-theme" value="dark">dark</label>
        </div>
        <div class="sound">
          <label class="sound__label"><input class="input-sound" type="radio" name="input-sound" value="on" checked>sound on</label>
          <label class="sound__label"><input class="input-sound" type="radio" name="input-sound" value="off">sound off</label>
        </div>
      </div>
    `;
    return options;
  }

  createInfoTable() {
    const table = document.createElement('div');
    table.classList.add('info__table');

    const timerBox = document.createElement('div');
    timerBox.classList.add('timer');
    timerBox.innerHTML = `Timer - <span class="timer__num">0</span>`;

    const clicksBox = document.createElement('div');
    clicksBox.classList.add('clicks');
    clicksBox.innerHTML = `Clicks - <span class="clicks__num">0</span>`;

    const flagsBox = document.createElement('div');
    flagsBox.classList.add('flags');
    flagsBox.innerHTML = `Flags - <span class="flags__num">0</span>`;

    const bombsRestBox = document.createElement('div');
    bombsRestBox.classList.add('bombs-rest');
    bombsRestBox.innerHTML = `Left to find - <span class="bombs-rest__num">10</span>`;

    const inner = document.createElement('div');
    inner.classList.add('info__inner');
    const newGame = document.createElement('button');
    newGame.classList.add('new-game');
    newGame.textContent = 'New Game';

    inner.appendChild(newGame);
    table.appendChild(clicksBox);
    table.appendChild(bombsRestBox);
    table.appendChild(flagsBox);
    table.appendChild(timerBox);

    return table;
  }

  createResults() {
    const results = document.createElement('div');
    results.classList.add('results');
    const resultsTitle = document.createElement('a');
    resultsTitle.classList.add('results__title');
    resultsTitle.textContent = 'Last results';
    const resultsList = document.createElement('ul');
    resultsList.classList.add('results__list');
    results.appendChild(resultsTitle);
    results.appendChild(resultsList);

    return results;
  }

  createModal() {
    this.modal = document.createElement('div');
    this.modal.classList.add('modal');

    const modalWrapper = document.createElement('div');
    modalWrapper.classList.add('modal__wrapper');

    const mess = document.createElement('div');
    mess.classList.add('modal__text');

    const btn = document.createElement('button');
    btn.classList.add('modal__btn');
    btn.textContent = 'New Game';

    modalWrapper.appendChild(mess);
    modalWrapper.appendChild(btn);
    this.modal.appendChild(modalWrapper);
  }
}
