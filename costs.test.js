import { test, beforeAll, afterAll, expect, vi } from "vitest";
import { getCost } from "./costs.js";
import * as discounts from "./discounts.js";

beforeAll(function () {
  vi.spyOn(discounts, "getRandomDiscount");
});

afterAll(function () {
  vi.restoreAllMocks();
});

test("cheap product", function () {
  // cheap products have IDs between 1000-1999, and cost $100 * discount
  discounts.getRandomDiscount.mockReturnValue(0.1);
  const cost = getCost(1200);
  expect(cost).toBe("90.00");
});

test("expensive product", function () {
  // expensive products have IDs greater than 2000, and cost $200 * discount
  discounts.getRandomDiscount.mockReturnValue(0.1);
  const cost = getCost(2500);
  expect(cost).toBe("180.00");
});