export default function getResults() {
  let resultsList = document.querySelector('.results__list');
  if (localStorage.getItem('results')) {
    let saveResults = localStorage.getItem('results');
    resultsList.innerHTML = saveResults; 
  }
}
