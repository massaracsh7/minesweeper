export default function getFlags() {
  let flags = localStorage.getItem('flags');
  if (flags !== null) {
    return Number(flags); 
  } else {
    return 0; 
  }
}
