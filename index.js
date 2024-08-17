import createPage from "./modules/createPage.js";
import createBoard from "./modules/createBoard.js";
import checkCell from "./modules/checkCell.js";
import addBombs from "./modules/addBombs.js";
import getBombs from "./modules/getBombs.js";
import showMessage from "./modules/showMessage.js";
import addResults from './modules/addResults.js';
import getResults from './modules/getResults.js';
import getOptions from './modules/getOptions.js';
import getPage from './modules/getPage.js';
import getClicks from './modules/getClicks.js';
import getTimer from './modules/getTimer.js';
import getFlags from './modules/getFlags.js';
import addAdaptive from './modules/addAdaptive.js';


const soundClick = new Audio('sounds/click2.wav')
const soundFlag = new Audio('sounds/flag.wav')
const soundWin = new Audio('sounds/win.wav')
const soundLoose = new Audio('sounds/loose.wav')

let options = getOptions();
let width = options.width;
let height = options.height;
let timeid;
let countCells = width * height;
let numClose;

if (options.sound === 'off') {
  soundClick.volume = 0;
  soundFlag.volume = 0;
  soundWin.volume = 0;
  soundLoose.volume = 0;
} else {
  soundClick.volume = 0.1;
  soundFlag.volume = 0.1;
  soundWin.volume = 0.1;
  soundLoose.volume = 0.1;
}

createPage();
createBoard();
getResults();
addAdaptive();
let beginNew = options.new;
let bombs = getBombs();
let cells = [];
let timer = getTimer();
let click = getClicks();
let flag = getFlags();
const newGame = document.querySelector('.new-game');
const container = document.querySelector('.container');
let board = document.querySelector('.board');
const timerBox = document.querySelector('.timer__num');
const clicksView = document.querySelector('.clicks__num');
const flagsView = document.querySelector('.flags__num');
const bombsRemainView = document.querySelector('.bombs-rest__num');


board.style.gridTemplateColumns = `repeat(${height}, 40px)`;
if (document.body.offsetWidth <= 1000) {
  board.style.gridTemplateColumns = `repeat(${height}, 30px)`;
}
if (document.body.offsetWidth <= 750) {
  board.style.gridTemplateColumns = `repeat(${height}, 20px)`;
}

let bombsInput = document.querySelector('.bombs-input');
bombsInput.value = options.bombsCount;
let numBombsInput = bombsInput.value;
let bombsOutput = document.querySelector('.bombs-output');
bombsOutput.textContent = `Bombs count - ${numBombsInput}`;
bombsRemainView.textContent = numBombsInput - flag;

bombsInput.addEventListener('change', () => {
  let num = bombsInput.value;
  bombsOutput.textContent = `Bombs count - ${num}`;
  bombsRemainView.textContent = num - flag;
  options.bombsCount = num;
  beginNew = true;
  options.new = true;
  setOptions();
  startGame(width, height, num);
})

const inputSize = document.querySelectorAll('.input-size');
inputSize.forEach((item) => {
  if (item.value === options.width) {
    item.checked = true;
  }
  item.addEventListener('change', () => {
    if (item.checked) {
      let num = bombsInput.value;
      width = item.value;
      options.width = width;
      height = item.value;
      options.height = height;
      beginNew = true;
      options.new = true;
      setOptions();
      startGame(width, height, num);
    }
  })
})

const inputTheme = document.querySelectorAll('.input-theme');
inputTheme.forEach((item) => {
  if (item.value === options.theme) {
    item.checked = true;
    if (item.value === 'dark') container.classList.add('container--dark');
  }
  item.addEventListener('change', () => {
    if (item.checked) {
      item.value === 'dark' ? container.classList.add('container--dark') : container.classList.remove('container--dark');
      options.theme = item.value;
    }
  })
})

const inputSound = document.querySelectorAll('.input-sound');
inputSound.forEach((item) => {
  if (item.value === options.sound) {
    item.checked = true;
    if (item.value === 'off') {
      soundClick.volume = 0;
      soundFlag.volume = 0;
      soundWin.volume = 0;
      soundLoose.volume = 0;
    }
  }
  item.addEventListener('change', () => {
    if (item.checked) {
      if (item.value === 'off') {
        soundClick.volume = 0;
        soundFlag.volume = 0;
        soundWin.volume = 0;
        soundLoose.volume = 0;
      } else {
        soundClick.volume = 0.1;
        soundFlag.volume = 0.1;
        soundWin.volume = 0.1;
        soundLoose.volume = 0.1;
      };
      options.sound = item.value;
    }
  })
})


startGame(width, height, numBombsInput);

newGame.addEventListener('click', () => {
  let num = bombsInput.value;
  options.new = true;
  setOptions();
  startGame(width, height, num);
})

const modalBtn = document.querySelector('.modal__btn');
const modal = document.querySelector('.modal');
modalBtn.addEventListener('click', () => {
  let num = bombsInput.value;
  modal.classList.remove('modal--active');
  options.new = true;
  setOptions();
  startGame(width, height, num);
})


function startGame(width, height, countBombs) {
  stopTimer();
  beginNew = options.new;
  beginNew ? board = createBoard(width, height) : board.innerHTML = getPage();
  let numBombs = 0;
  numBombs = countBombs;
  cells = [...board.children];
  countCells = width * height;
  beginNew ? bombs = addBombs(numBombs, countCells) : bombs = getBombs();
  beginNew ? click = 0 : click = getClicks();
  clicksView.textContent = `${click}`;
  beginNew ? flag = 0 : flag = getFlags();
  flagsView.textContent = `${flag}`;
  bombsRemainView.textContent = numBombs - flag;
  numClose = countCells - cells.filter((item) => item.disabled).length;
  beginNew ? timer = 0 : timer = getTimer();
  timerBox.textContent = `${timer}`;
  if (click !== 0) {
    setTimer();
  }

  board.addEventListener('click', (event) => {
    click++;
    beginNew = false;
    options.new = false;
    setOptions();
    soundClick.play();
    clicksView.textContent = `${click}`;
    const index = event.target.dataset.index;
    const x = index % width;
    const y = Math.floor(index / width);
    if (click === 1) {
      setTimer();
      if (checkBomb(y, x) == true) {
        let prev = bombs.indexOf(+index);
        let i = 1;
        let newC = cells.map((item) => +item.dataset.index).filter((item) => !bombs.includes(item));
        let next = newC[0];
        bombs.splice(prev, 1, next);
      }
    }
    openCells(y, x);

  })

  board.addEventListener("contextmenu", (event) => {
    event.preventDefault();
    const index = event.target.dataset.index;
    setFlag(index);
    soundFlag.play();
  });

  function openCells(y, x) {
    if (!checkCell(y, x, width, height)) return;
    const index = y * width + x;
    const cell = cells[index];
    if (cell.disabled === true) return;
    if (cell.innerHTML === "🚩") return;
    cell.disabled = true;

    if (checkBomb(y, x)) {
      cell.textContent = "💣";
      showMessage('Game over. Try again');
      openAllBombs();
      timer = timerBox.textContent;
      stopTimer();
      soundLoose.play();
      beginNew = true;
      return;
    }

    numClose = countCells - cells.filter((item) => item.disabled).length;
    if (numClose <= numBombs) {
      timer = timerBox.textContent;
      showMessage(`Hooray! You found all mines in ${timer} seconds and ${click} moves!`);
      openAllBombs();
      addResults(timer, click);
      stopTimer();
      soundWin.play();
      beginNew = true;
      return;
    }

    let count = getCount(y, x);

    if (count != 0) {
      cell.innerHTML = count;
      cell.classList.add(`cell-${count}`);
      return;
    }


    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (checkCell(y + j, x + i, width, height)) {
          openCells(y + j, x + i)
        }
      }
    }
  }

  function getCount(y, x) {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (checkBomb(y + j, x + i)) {
          count++;
        }
      }
    }
    return count;
  }

  function checkBomb(y, x) {
    if (!checkCell(y, x, width, height)) return false;
    const index = y * width + x;
    return bombs.includes(index);
  }

  function openAllBombs() {
    cells.forEach(item => {
      item.disabled = true;
    })

    bombs.forEach((item) => {
      let cell = cells[item];
      cell.textContent = "💣";
    })
  }

  function setFlag(index) {
    let cell = cells[index];
    cell.innerHTML === "🚩" ? (cell.innerHTML = ' ') && (flag--) : (cell.innerHTML = "🚩") && (flag++);
    flagsView.textContent = flag;
    bombsRemainView.textContent = numBombs - flag;
  }

}

function setTimer() {
  let timerBox = document.querySelector('.timer__num');
  timeid = setTimeout(() => {
    timer++
    timerBox.textContent = `${timer}`;
    setTimer();
  }, 1000)
}

function stopTimer() {
  clearTimeout(timeid);
  timer = 0;
}

options.new = beginNew;

function setOptions() {
  localStorage.setItem('options', JSON.stringify(options));
}

function setPage() {
  localStorage.setItem('page', board.innerHTML);
}

function saveTimer() {
  localStorage.setItem('timer', timerBox.textContent);
}

function setClicks() {
  localStorage.setItem('clicks', click);
}

function setBombs() {
  localStorage.setItem('bombs', JSON.stringify(bombs));
}

function setFlags() {
  localStorage.setItem('flags', flag);
}

window.addEventListener('beforeunload', setPage);
window.addEventListener('beforeunload', setBombs);
window.addEventListener('beforeunload', setOptions);
window.addEventListener('beforeunload', saveTimer);
window.addEventListener('beforeunload', setClicks);
window.addEventListener('beforeunload', setFlags);

window.addEventListener('resize', () => {
  window.location.reload();
});
