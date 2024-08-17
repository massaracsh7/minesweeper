import getRandomNum from "./randomNumbers.js";

export default function addBombs(countBombs, countCells) {
  let current = countBombs;
  const arr = new Array;
  while (current) {
    let num = getRandomNum(0, countCells);
    arr.includes(num) ? current++ : arr.push(num);
    current--;
  }
  return arr;
}