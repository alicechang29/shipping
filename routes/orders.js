import { Router } from "express";
import jsonschema from "jsonschema";
import { BadRequestError } from "../expressError.js";
import { shipViaShipIt } from "../shipItApi.js";
import { getCost } from "../costs.js";
import ordersSchema from "../schemas/ordersSchema.json" with {type: "json"};

const router = new Router();

/** POST /orders/:id/ship
 *
 * Validates and ships an order coming from json body:
 *   { productId, name, addr, zip }
 *
 * Returns { orderId, trackingId, cost }
 */

router.post("/:orderId/ship", async function (req, res) {
  const orderId = Number(req.params.orderId);
  if (!req.body) throw new BadRequestError("No JSON data sent in request body.");

  const result = jsonschema.validate(
    req.body, ordersSchema, { required: true }
  );

  if (!result.valid) {
    const errs = result.errors.map(err => err.stack);
    throw new BadRequestError(errs);
  }

  const { productId, name, addr, zip } = req.body;
  const cost = getCost(productId);
  const trackingId = await shipViaShipIt(
    { orderId, productId, name, addr, zip });
  return res.json({ orderId, trackingId, cost });
});


export default router;