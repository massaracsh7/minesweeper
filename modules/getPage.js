export default function getPage() {
  let board = document.querySelector('.board');
  let savePage;
  if (localStorage.getItem('page')) {
    savePage = localStorage.getItem('page');
  } else savePage = '';
  return savePage;
}
