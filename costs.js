import { getRandomDiscount } from "./discounts.js";

/** Gets string-of-cost of a product given its id. */
function getCost(productId) {
  // base cost is determined by which product they're buying
  const baseCost = (productId < 2000) ? 100.00 : 200.00;
  return (baseCost * (1 - getRandomDiscount())).toFixed(2);
}

export { getCost };
