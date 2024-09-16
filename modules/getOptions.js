export default function getOptions() {
  let options;
  if (localStorage.getItem('options')) {
    options = JSON.parse(localStorage.getItem('options'));
  } else options = {
    width: 10,
    height: 10,
    bombsCount: 10,
    theme: 'light',
    new: true,
    sound: 'on',
  };
  return options;
};