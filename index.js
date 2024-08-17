import getOptions from "./modules/getOptions.js";

const soundClick = new Audio('assets/sounds/click2.wav');
const soundFlag = new Audio('assets/sounds/flag.wav');
const soundWin = new Audio('assets/sounds/win.wav');
const soundLoose = new Audio('assets/sounds/loose.wav');

let options = getOptions();
let width = options.width;
let height = options.height;
let bombCount = options.bombsCount;
let board, bombs, flaggedCount, clickedCount;