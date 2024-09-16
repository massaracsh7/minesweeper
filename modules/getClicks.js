export default function getClicks() {
  let clicks;
  if (localStorage.getItem('clicks')) {
    clicks = localStorage.getItem('clicks');
  } else clicks = 0;
  return clicks;
};