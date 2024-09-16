export default function addResults(time, clicks) {
  const resultsList = document.querySelector('.results__list');

  function createResultsItem() {
    const li = document.createElement('li');
    li.classList.add('results__item');
    li.textContent = `${time} seconds - ${clicks} clicks `;
    resultsList.prepend(li);
    if (resultsList.children.length > 10) {
      resultsList.lastElementChild.remove();
    }
    return resultsList;
  }


  function setResults() {
    localStorage.setItem('results', resultsList.innerHTML);
  }

  window.addEventListener('beforeunload', setResults);

  createResultsItem();

}