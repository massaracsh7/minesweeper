export function showMessage(message) {
  const modal = document.querySelector('.modal');
  if (modal) {
    modal.classList.add('modal--active');
    const mess = document.querySelector('.modal__text');
    if (mess) {
      mess.textContent = message;
    }
  }
}

// Остальные функции
export function checkCell(y, x, width, height) {
  return y >= 0 && y < height && x >= 0 && x < width;
}

export function getBombs() {
  return JSON.parse(localStorage.getItem('bombs')) || [];
}

export function getRandomNum(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

export function getTimer() {
  return localStorage.getItem('timer') || 0;
}

export function getResults() {
  return localStorage.getItem('results') || '';
}

export function getFlags() {
  return localStorage.getItem('flags') || 0;
}

export function getClicks() {
  return localStorage.getItem('clicks') || 0;
}

export function addBombs(countBombs, countCells) {
  const arr = [];
  while (countBombs) {
    let num = getRandomNum(0, countCells);
    if (!arr.includes(num)) {
      arr.push(num);
      countBombs--;
    }
  }
  return arr;
}

export function addResults(time, clicks) {
  const resultsList = document.querySelector('.results__list');
  const li = document.createElement('li');
  li.classList.add('results__item');
  li.textContent = `${time} seconds - ${clicks} clicks `;
  resultsList.prepend(li);

  if (resultsList.children.length > 10) {
    resultsList.lastElementChild.remove();
  }

  localStorage.setItem('results', resultsList.innerHTML);
}
