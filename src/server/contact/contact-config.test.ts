import { describe, expect, it } from "vitest";

import { getContactConfig } from "./contact-config";

const validEnvironment = {
  RESEND_API_KEY: "re_test",
  CONTACT_TO_EMAIL: "owner@example.com",
  CONTACT_FROM_EMAIL: "contact@mail.example.com",
  CONTACT_DEDUPE_SECRET: "a".repeat(32),
  UPSTASH_REDIS_REST_URL: "https://example.upstash.io",
  UPSTASH_REDIS_REST_TOKEN: "token",
};

describe("getContactConfig", () => {
  it("parses secrets and applies the namespace default", () => {
    expect(getContactConfig(validEnvironment)).toMatchObject({
      redisNamespace: "chicofolio:contact:v1",
      toEmail: "owner@example.com",
    });
  });

  it("rejects a short dedupe secret", () => {
    expect(() => getContactConfig({ ...validEnvironment, CONTACT_DEDUPE_SECRET: "short" })).toThrow();
  });
});
