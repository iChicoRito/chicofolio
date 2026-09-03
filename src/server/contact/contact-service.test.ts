import { describe, expect, it, vi } from "vitest";

import { submitContact } from "./contact-service";
import type { ContactMailer } from "./contact-types";

const submission = {
  name: "Visitor",
  email: "visitor@example.com",
  message: "A useful project inquiry.",
};

describe("submitContact", () => {
  it("sends an accepted email", async () => {
    const mailer: ContactMailer = {
      send: vi.fn().mockResolvedValue({ messageId: "email-id" }),
    };

    await expect(submitContact(submission, { mailer })).resolves.toEqual({ kind: "sent", reference: "email-id" });
    expect(mailer.send).toHaveBeenCalledWith(submission);
  });

  it("allows another submission from the same email", async () => {
    const mailer: ContactMailer = {
      send: vi.fn().mockResolvedValue({ messageId: "email-id" }),
    };

    await submitContact(submission, { mailer });
    await submitContact({ ...submission, message: "A second project inquiry." }, { mailer });

    expect(mailer.send).toHaveBeenCalledTimes(2);
  });

  it("returns unavailable when the mailer rejects", async () => {
    const mailer: ContactMailer = {
      send: vi.fn().mockRejectedValue(new Error("Email delivery was not accepted.")),
    };

    await expect(submitContact(submission, { mailer })).resolves.toEqual({ kind: "unavailable" });
  });
});
