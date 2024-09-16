export default function addAdaptive() {
  const results = document.querySelector('.results__list');
  const options = document.querySelector('.options__wrapper');
  const resultsLink = document.querySelector('.results__title');
  const optionsLink = document.querySelector('.options__title');
  resultsLink.addEventListener('click', () => results.classList.toggle('results__list--active'));
  optionsLink.addEventListener('click', () => options.classList.toggle('options__wrapper--active'));
}