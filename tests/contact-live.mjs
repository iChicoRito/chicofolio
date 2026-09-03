import assert from "node:assert/strict";

function required(name) {
  const value = process.env[name]?.trim();
  assert.ok(value, `${name} is required`);
  return value;
}

const baseUrl = required("CONTACT_E2E_BASE_URL").replace(/\/$/, "");
const verificationApiKey = required("RESEND_VERIFICATION_API_KEY");
const origin = new URL(baseUrl).origin;
const runId = `${Date.now()}-${Math.random().toString(16).slice(2)}`;

async function submit(email, cookie) {
  const response = await fetch(`${baseUrl}/api/contact`, {
    method: "POST",
    headers: {
      origin,
      "content-type": "application/json",
      ...(cookie ? { cookie } : {}),
    },
    body: JSON.stringify({
      name: `Contact E2E ${runId}`,
      email,
      message: `Live contact delivery verification ${runId}.`,
      website: "",
    }),
  });
  const body = await response.json();
  return { response, body, cookie: response.headers.get("set-cookie")?.split(";", 1)[0] };
}

async function waitForDelivered(reference) {
  const deadline = Date.now() + 120_000;
  while (Date.now() < deadline) {
    const response = await fetch(`https://api.resend.com/emails/${reference}`, {
      headers: { authorization: `Bearer ${verificationApiKey}` },
    });
    assert.equal(response.status, 200, `Resend lookup returned ${response.status}`);
    const email = await response.json();
    if (email.last_event === "delivered") return email;
    if (["bounced", "failed", "complained", "canceled"].includes(email.last_event)) {
      assert.fail(`Email ${reference} ended as ${email.last_event}`);
    }
    await new Promise((resolve) => setTimeout(resolve, 3000));
  }
  assert.fail(`Email ${reference} did not reach delivered within 120 seconds`);
}

const emailA = `contact-e2e-${runId}@example.com`;
const emailB = `contact-e2e-new-${runId}@example.com`;
const first = await submit(emailA);
assert.equal(first.response.status, 201);
assert.equal(first.body.code, "sent");
assert.ok(first.body.reference);
assert.ok(first.cookie);

const sameEmailNewDevice = await submit(emailA);
assert.equal(sameEmailNewDevice.response.status, 409);
assert.equal(sameEmailNewDevice.body.code, "duplicate");

const sameDeviceNewEmail = await submit(emailB, first.cookie);
assert.equal(sameDeviceNewEmail.response.status, 409);
assert.equal(sameDeviceNewEmail.body.code, "duplicate");

const newDeviceAndEmail = await submit(emailB);
assert.equal(newDeviceAndEmail.response.status, 201);
assert.equal(newDeviceAndEmail.body.code, "sent");
assert.ok(newDeviceAndEmail.body.reference);

const [deliveredA, deliveredB] = await Promise.all([
  waitForDelivered(first.body.reference),
  waitForDelivered(newDeviceAndEmail.body.reference),
]);
assert.equal(deliveredA.last_event, "delivered");
assert.equal(deliveredB.last_event, "delivered");
console.log(
  JSON.stringify({
    firstReference: deliveredA.id,
    secondReference: deliveredB.id,
    firstStatus: deliveredA.last_event,
    secondStatus: deliveredB.last_event,
    subject: deliveredA.subject,
  }),
);
