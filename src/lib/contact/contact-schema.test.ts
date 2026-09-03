import { describe, expect, it } from "vitest";

import { contactSubmissionSchema } from "./contact-schema";

describe("contactSubmissionSchema", () => {
  it("trims fields and lowercases the email", () => {
    expect(
      contactSubmissionSchema.parse({
        name: "  Mark Visitor  ",
        email: "  VISITOR@Example.COM  ",
        message: "  A useful project inquiry.  ",
        website: "",
      }),
    ).toEqual({
      name: "Mark Visitor",
      email: "visitor@example.com",
      message: "A useful project inquiry.",
      website: "",
    });
  });

  it.each([
    { name: "M", email: "visitor@example.com", message: "A useful message", website: "" },
    { name: "Mark", email: "not-an-email", message: "A useful message", website: "" },
    { name: "Mark", email: "visitor@example.com", message: "short", website: "" },
    { name: "Mark\nBcc: victim@example.com", email: "visitor@example.com", message: "A useful message", website: "" },
    { name: "Mark", email: "visitor@example.com", message: "A useful message", website: "bot value" },
    { name: "Mark", email: "visitor@example.com", message: "A useful message", website: "", extra: true },
  ])("rejects invalid or bot-shaped input %#", (input) => {
    expect(contactSubmissionSchema.safeParse(input).success).toBe(false);
  });
});
