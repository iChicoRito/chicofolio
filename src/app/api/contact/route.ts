import { type NextRequest, NextResponse } from "next/server";

import { Resend } from "resend";

import { getContactConfig } from "@/server/contact/contact-config";
import { handleContactPost } from "@/server/contact/contact-handler";
import { createContactMailer } from "@/server/contact/contact-mailer";
import { submitContact } from "@/server/contact/contact-service";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const config = getContactConfig();
    const resend = new Resend(config.resendApiKey);
    const mailer = createContactMailer((message) => resend.emails.send(message), {
      fromEmail: config.fromEmail,
      toEmail: config.toEmail,
    });

    return handleContactPost(request, (submission) => submitContact(submission, { mailer }));
  } catch {
    return NextResponse.json({ ok: false, code: "unavailable" }, { status: 503 });
  }
}
