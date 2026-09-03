import { type NextRequest, NextResponse } from "next/server";

import { contactSubmissionSchema } from "@/lib/contact/contact-schema";

import type { ContactResult, SubmitContact } from "./contact-types";

const MAX_BODY_BYTES = 8192;

function responseFor(result: ContactResult) {
  if (result.kind === "sent") {
    return NextResponse.json({ ok: true, code: "sent", reference: result.reference }, { status: 201 });
  }
  return NextResponse.json({ ok: false, code: "unavailable" }, { status: 503 });
}

export async function handleContactPost(request: NextRequest, submitContact: SubmitContact) {
  if (request.headers.get("origin") !== request.nextUrl.origin) {
    return NextResponse.json({ ok: false, code: "forbidden" }, { status: 403 });
  }
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
    return NextResponse.json({ ok: false, code: "unsupported_media_type" }, { status: 415 });
  }

  const contentLength = Number(request.headers.get("content-length") ?? "0");
  if (Number.isFinite(contentLength) && contentLength > MAX_BODY_BYTES) {
    return NextResponse.json({ ok: false, code: "payload_too_large" }, { status: 413 });
  }

  let rawBody: string;
  try {
    rawBody = await request.text();
  } catch {
    return NextResponse.json({ ok: false, code: "invalid_request" }, { status: 400 });
  }
  if (new TextEncoder().encode(rawBody).byteLength > MAX_BODY_BYTES) {
    return NextResponse.json({ ok: false, code: "payload_too_large" }, { status: 413 });
  }

  let candidate: unknown;
  try {
    candidate = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ ok: false, code: "invalid_request" }, { status: 400 });
  }
  const parsed = contactSubmissionSchema.safeParse(candidate);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, code: "invalid_request" }, { status: 400 });
  }

  try {
    return responseFor(await submitContact(parsed.data));
  } catch {
    return NextResponse.json({ ok: false, code: "unavailable" }, { status: 503 });
  }
}
