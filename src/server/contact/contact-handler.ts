import { type NextRequest, NextResponse } from "next/server";

import { contactSubmissionSchema } from "@/lib/contact/contact-schema";

import type { ContactResult, SubmitContact } from "./contact-types";
import { randomUUID } from "node:crypto";

const MAX_BODY_BYTES = 8192;
const DEVICE_COOKIE = "chicofolio-contact-device";
const DEVICE_MAX_AGE_SECONDS = 60 * 60 * 24 * 400;

function responseFor(result: ContactResult) {
  if (result.kind === "sent") {
    return NextResponse.json({ ok: true, code: "sent", reference: result.reference }, { status: 201 });
  }
  if (result.kind === "duplicate") {
    return NextResponse.json({ ok: false, code: "duplicate" }, { status: 409 });
  }
  if (result.kind === "rate_limited") {
    return NextResponse.json({ ok: false, code: "rate_limited" }, { status: 429, headers: { "retry-after": "3600" } });
  }
  return NextResponse.json({ ok: false, code: "unavailable" }, { status: 503 });
}

function clientIp(request: NextRequest, fallback: string) {
  const forwarded = request.headers.get("x-vercel-forwarded-for") ?? request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || `device:${fallback}`;
}

function withDeviceCookie(response: NextResponse, request: NextRequest, deviceId: string, hadCookie: boolean) {
  if (!hadCookie) {
    response.cookies.set(DEVICE_COOKIE, deviceId, {
      httpOnly: true,
      sameSite: "lax",
      secure: request.nextUrl.protocol === "https:",
      path: "/",
      maxAge: DEVICE_MAX_AGE_SECONDS,
    });
  }
  return response;
}

export async function handleContactPost(
  request: NextRequest,
  submitContact: SubmitContact,
  createDeviceId: () => string = randomUUID,
) {
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

  const existingDevice = request.cookies.get(DEVICE_COOKIE)?.value;
  const deviceId = existingDevice ?? createDeviceId();
  try {
    const result = await submitContact(parsed.data, {
      deviceId,
      ipAddress: clientIp(request, deviceId),
    });
    return withDeviceCookie(responseFor(result), request, deviceId, Boolean(existingDevice));
  } catch {
    return withDeviceCookie(
      NextResponse.json({ ok: false, code: "unavailable" }, { status: 503 }),
      request,
      deviceId,
      Boolean(existingDevice),
    );
  }
}
