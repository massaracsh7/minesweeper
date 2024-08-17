export default function getTimer() {
  let timer;
  if (localStorage.getItem('timer')) {
    timer = parseInt(localStorage.getItem('timer'), 10); // Convert the stored string to a number
  } else {
    timer = 0;
  }
  return timer;
}
