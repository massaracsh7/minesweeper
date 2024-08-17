import getRandomNum from "./randomNumbers.js";

export default function addBombs(countBombs, countCells) {
  const arr = [];
  let current = countBombs;

  while (current > 0) {
    const num = getRandomNum(0, countCells);

    if (!arr.includes(num)) {
      arr.push(num);
      current--;
    }
  }

  return arr;
}
