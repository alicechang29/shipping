/** Gets a random discount percentage from 0-20% off. */
function getRandomDiscount() {
  return Math.random() / 5;
}

export { getRandomDiscount };