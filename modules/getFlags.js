
export default function getFlags() {
  let flags;
  if (localStorage.getItem('flags')) {
    flags = localStorage.getItem('flags');
  } else flags = 0;
  return flags;
};
