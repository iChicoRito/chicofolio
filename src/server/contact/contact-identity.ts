import type { ContactDigests } from "./contact-types";
import { createHmac } from "node:crypto";

function digest(secret: string, scope: string, value: string) {
  return createHmac("sha256", secret).update(`${scope}\0${value}`).digest("hex");
}

export function createContactDigests(
  secret: string,
  input: { deviceId: string; email: string; ipAddress: string },
): ContactDigests {
  return {
    device: digest(secret, "device", input.deviceId),
    email: digest(secret, "email", input.email),
    ip: digest(secret, "ip", input.ipAddress),
  };
}
