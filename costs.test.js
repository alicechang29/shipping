import { test, beforeAll, afterAll, expect, vi } from "vitest";
import { getCost } from "./costs.js";

test("cheap product", function () {
  // cheap products have IDs between 1000-1999, and cost $100 * discount
  const cost = getCost(1200);
  expect(cost).toBe("90.00");
});

test("expensive product", function () {
  // expensive products have IDs greater than 2000, and cost $200 * discount
  const cost = getCost(2500);
  expect(cost).toBe("180.00");
});