import { type NextRequest, NextResponse } from "next/server";

import { Redis } from "@upstash/redis";
import { Resend } from "resend";

import { getContactConfig } from "@/server/contact/contact-config";
import { handleContactPost } from "@/server/contact/contact-handler";
import { createContactMailer } from "@/server/contact/contact-mailer";
import { submitContact } from "@/server/contact/contact-service";
import { RedisContactStore } from "@/server/contact/contact-store";

import { randomUUID } from "node:crypto";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const config = getContactConfig();
    const redis = new Redis({ url: config.redisUrl, token: config.redisToken });
    const resend = new Resend(config.resendApiKey);
    const store = new RedisContactStore(redis, { namespace: config.redisNamespace });
    const mailer = createContactMailer((message, options) => resend.emails.send(message, options), {
      fromEmail: config.fromEmail,
      toEmail: config.toEmail,
    });

    return handleContactPost(request, (submission, identity) =>
      submitContact(submission, identity, {
        store,
        mailer,
        dedupeSecret: config.dedupeSecret,
        createId: randomUUID,
      }),
    );
  } catch {
    return NextResponse.json({ ok: false, code: "unavailable" }, { status: 503 });
  }
}
