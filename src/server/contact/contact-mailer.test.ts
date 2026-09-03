import { describe, expect, it, vi } from "vitest";

import { createContactMailer } from "./contact-mailer";

const submission = {
  name: "Visitor <script>",
  email: "visitor@example.com",
  message: "Hello <script>alert(1)</script>\nSecond line",
};

describe("createContactMailer", () => {
  it("sends escaped HTML, plain text, and reply-to", async () => {
    const send = vi.fn().mockResolvedValue({ data: { id: "email-id" }, error: null });
    const mailer = createContactMailer(send, {
      fromEmail: "contact@mail.example.com",
      toEmail: "owner@example.com",
    });

    await expect(mailer.send(submission)).resolves.toEqual({ messageId: "email-id" });
    expect(send).toHaveBeenCalledWith(
      expect.objectContaining({
        from: "ChicoFolio <contact@mail.example.com>",
        to: ["owner@example.com"],
        replyTo: "visitor@example.com",
        text: expect.stringContaining("Hello <script>alert(1)</script>"),
        html: expect.not.stringContaining("<script>alert(1)</script>"),
      }),
    );
  });

  it("throws a generic error when Resend rejects the send", async () => {
    const send = vi.fn().mockResolvedValue({ data: null, error: { message: "provider detail" } });
    const mailer = createContactMailer(send, {
      fromEmail: "contact@mail.example.com",
      toEmail: "owner@example.com",
    });

    await expect(mailer.send(submission)).rejects.toThrow("Email delivery was not accepted.");
  });
});
