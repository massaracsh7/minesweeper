export default function getOptions() {
  const defaultOptions = {
    width: 10,
    height: 10,
    bombsCount: 10,
    theme: 'light',
    new: true,
    sound: 'on',
  };

  const savedOptions = localStorage.getItem('options');
  return savedOptions ? JSON.parse(savedOptions) : defaultOptions;
}
