export default function showMessage(message) {
  const modal = document.querySelector('.modal');
  modal.classList.add('modal--active');
  const mess = document.querySelector('.modal__text');
  mess.textContent = message;
}
