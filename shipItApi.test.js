import { test, expect, beforeAll, afterAll, afterEach } from "vitest";
import { shipViaShipIt, SHIPIT_SHIP_URL } from "./shipItApi.js";
import { mock, mockServer } from "./apiMock.js";

beforeAll(function () { mockServer.listen(); });
afterEach(function () { mockServer.resetHandlers(); });
afterAll(function () { mockServer.close(); });

test("shipProduct", async function () {

  mock("post", SHIPIT_SHIP_URL, "", { trackingId: 789 });

  const trackingId = await shipViaShipIt({
    orderId: 123,
    productId: 1000,
    name: "Test Tester",
    addr: "100 Test St",
    zip: "12345-6789",
  });

  expect(trackingId).toEqual(789);
});