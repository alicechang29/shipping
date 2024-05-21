const SHIPIT_SHIP_URL =
  "https://75xrke3xmuc7jp2zeakuczqp3i0vhyvv.lambda-url.us-west-1.on.aws"
const SHIPIT_API_KEY = "xyz123";

/** Ship a single product through the shipit API.
 *
 * Returns trackingId from shipit.
 */

async function shipViaShipIt({ orderId, productId, name, addr, zip }) {
  const resp = await fetch(SHIPIT_SHIP_URL, {
    method: "POST",
    body: JSON.stringify({
      orderId: orderId,
      itemId: productId,
      name,
      addr,
      zip,
      key: SHIPIT_API_KEY,
    }),
    headers: {
      "content-type": "application/json",
    },
  });
  const data = await resp.json();
  if (!resp.ok) throw new Error(data.error);
  return data.trackingId;
}


export { shipViaShipIt, SHIPIT_SHIP_URL };
