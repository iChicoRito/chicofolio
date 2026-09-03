import { describe, expect, it } from "vitest";

import { createContactDigests } from "./contact-identity";

describe("createContactDigests", () => {
  it("returns stable, scoped digests without retaining raw identifiers", () => {
    const first = createContactDigests("s".repeat(32), {
      deviceId: "device-1",
      email: "person@example.com",
      ipAddress: "203.0.113.10",
    });
    const second = createContactDigests("s".repeat(32), {
      deviceId: "device-1",
      email: "person@example.com",
      ipAddress: "203.0.113.10",
    });

    expect(first).toEqual(second);
    expect(new Set(Object.values(first)).size).toBe(3);
    expect(JSON.stringify(first)).not.toContain("person@example.com");
    expect(Object.values(first).every((value) => /^[a-f0-9]{64}$/.test(value))).toBe(true);
  });
});
