  export default function checkCell(y, x, width, height) {
    return y >= 0 && y < height &&
      x >= 0 && x < width;
  }