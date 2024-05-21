import { describe, test, expect, beforeAll, afterAll, vi } from "vitest";
import * as shipping from "../shipItApi.js";
import request from "supertest";
import app from "../app.js";

describe("POST /orders/:id/ship", function () {
  test("valid", async function () {
    const resp = await request(app).post("/orders/123/ship").send({
      productId: 1000,
      name: "Test Tester",
      addr: "100 Test St",
      zip: "12345-6789",
    });

    expect(resp.body).toEqual({
      cost: expect.any(String),
      trackingId: expect.any(Number),
      orderId: 123,
    });
  });

  test("throws error if empty request body", async function () {
    const resp = await request(app)
      .post("/orders/123/ship")
      .send();
    expect(resp.statusCode).toEqual(400);
  });
});
