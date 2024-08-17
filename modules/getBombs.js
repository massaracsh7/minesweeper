export default function getBombs() {
  const bombs = localStorage.getItem('bombs')
    ? JSON.parse(localStorage.getItem('bombs'))
    : [];
  return bombs;
}
