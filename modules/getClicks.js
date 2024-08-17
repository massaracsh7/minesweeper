export default function getClicks() {
  let clicks = localStorage.getItem('clicks');
  if (clicks !== null) {
    return Number(clicks); 
  } else {
    return 0; 
  }
}
