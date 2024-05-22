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

  //TODO: consider submitting one where a field is missing bc JSON schema requires these are required.
  //TODO: add an additional field to test the additional field in schema
  test("throws error if invalid data in request body", async function () {
    const resp = await request(app)
      .post("/orders/123/ship")
      .send({
        "productId": 99,
        "name": 123,
        "addr": 123,
        "zip": 23
      });
    expect(resp.statusCode).toEqual(400);

    expect(resp.body).toEqual(
      {
        "error": {
          "message": [
            "instance.productId must be greater than or equal to 1000",
            "instance.name is not of a type(s) string",
            "instance.addr is not of a type(s) string",
            "instance.zip is not of a type(s) string"
          ],
          "status": 400
        }
      }
    );

    //TODO: can isolate the array of error messages instead resp.body.error.message
  });
});
