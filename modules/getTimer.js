export default function getTimer() {
  let timer;
  if (localStorage.getItem('timer')) {
    timer = localStorage.getItem('timer');
  } else timer = 0;
  return timer;
};