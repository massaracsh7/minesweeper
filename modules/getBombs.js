export default function getBombs() {
  let bombs;
  if (localStorage.getItem('bombs')) {
    bombs = JSON.parse(localStorage.getItem('bombs'));
  } else bombs = [];
  return bombs;
};