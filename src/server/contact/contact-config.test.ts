import { describe, expect, it } from "vitest";

import { getContactConfig } from "./contact-config";

const validEnvironment = {
  RESEND_API_KEY: "re_test",
  CONTACT_TO_EMAIL: "owner@example.com",
  CONTACT_FROM_EMAIL: "contact@mail.example.com",
};

describe("getContactConfig", () => {
  it("parses the Resend and contact mailbox settings", () => {
    expect(getContactConfig(validEnvironment)).toEqual({
      resendApiKey: "re_test",
      toEmail: "owner@example.com",
      fromEmail: "contact@mail.example.com",
    });
  });

  it("rejects an invalid contact mailbox", () => {
    expect(() => getContactConfig({ ...validEnvironment, CONTACT_TO_EMAIL: "not-an-email" })).toThrow();
  });
});
