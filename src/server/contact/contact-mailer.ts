import type { ContactSubmission } from "@/lib/contact/contact-schema";

import type { ContactMailer } from "./contact-types";

type SendEmail = (
  message: {
    from: string;
    to: string[];
    replyTo: string;
    subject: string;
    text: string;
    html: string;
  },
  options: { idempotencyKey: string },
) => Promise<{ data: { id: string } | null; error: { message: string } | null }>;

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export function createContactMailer(
  sendEmail: SendEmail,
  config: { fromEmail: string; toEmail: string },
): ContactMailer {
  return {
    async send(submission: ContactSubmission, idempotencyKey) {
      const text = [
        "New ChicoFolio inquiry",
        "",
        `Name: ${submission.name}`,
        `Email: ${submission.email}`,
        "",
        "Message:",
        submission.message,
      ].join("\n");
      const htmlMessage = escapeHtml(submission.message).replaceAll("\n", "<br />");
      const { data, error } = await sendEmail(
        {
          from: `ChicoFolio <${config.fromEmail}>`,
          to: [config.toEmail],
          replyTo: submission.email,
          subject: `New ChicoFolio inquiry from ${submission.name}`,
          text,
          html: `<h1>New ChicoFolio inquiry</h1><p><strong>Name:</strong> ${escapeHtml(submission.name)}</p><p><strong>Email:</strong> ${escapeHtml(submission.email)}</p><p><strong>Message:</strong><br />${htmlMessage}</p>`,
        },
        { idempotencyKey },
      );

      if (error || !data) {
        throw new Error("Email delivery was not accepted.");
      }

      return { messageId: data.id };
    },
  };
}
