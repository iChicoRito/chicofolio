import { NextRequest } from "next/server";

import { describe, expect, it, vi } from "vitest";

import { handleContactPost } from "./contact-handler";

function request(body: unknown, headers: Record<string, string> = {}) {
  return new NextRequest("https://portfolio.example/api/contact", {
    method: "POST",
    headers: {
      origin: "https://portfolio.example",
      "content-type": "application/json",
      "x-vercel-forwarded-for": "203.0.113.10",
      ...headers,
    },
    body: JSON.stringify(body),
  });
}

describe("handleContactPost", () => {
  it("returns 201 and sets the anonymous device cookie", async () => {
    const submit = vi.fn().mockResolvedValue({ kind: "sent", reference: "email-id" });
    const response = await handleContactPost(
      request({ name: "Visitor", email: "VISITOR@example.com", message: "A useful inquiry.", website: "" }),
      submit,
      () => "device-id",
    );

    expect(response.status).toBe(201);
    await expect(response.json()).resolves.toEqual({ ok: true, code: "sent", reference: "email-id" });
    expect(response.cookies.get("chicofolio-contact-device")?.value).toBe("device-id");
    expect(submit).toHaveBeenCalledWith(expect.objectContaining({ email: "visitor@example.com" }), {
      deviceId: "device-id",
      ipAddress: "203.0.113.10",
    });
  });

  it("returns 409 on duplicate without setting a new device cookie", async () => {
    const submit = vi.fn().mockResolvedValue({ kind: "duplicate" });
    const response = await handleContactPost(
      request({ name: "Visitor", email: "visitor@example.com", message: "A useful inquiry.", website: "" }),
      submit,
      () => "device-id",
    );

    expect(response.status).toBe(409);
    await expect(response.json()).resolves.toEqual({ ok: false, code: "duplicate" });
  });

  it("returns 429 with retry-after on rate limit", async () => {
    const submit = vi.fn().mockResolvedValue({ kind: "rate_limited" });
    const response = await handleContactPost(
      request({ name: "Visitor", email: "visitor@example.com", message: "A useful inquiry.", website: "" }),
      submit,
    );

    expect(response.status).toBe(429);
    expect(response.headers.get("retry-after")).toBe("3600");
  });

  it("returns 503 when the submission is unavailable", async () => {
    const submit = vi.fn().mockResolvedValue({ kind: "unavailable" });
    const response = await handleContactPost(
      request({ name: "Visitor", email: "visitor@example.com", message: "A useful inquiry.", website: "" }),
      submit,
    );

    expect(response.status).toBe(503);
  });

  it("returns 503 when the submission throws", async () => {
    const submit = vi.fn().mockRejectedValue(new Error("boom"));
    const response = await handleContactPost(
      request({ name: "Visitor", email: "visitor@example.com", message: "A useful inquiry.", website: "" }),
      submit,
    );

    expect(response.status).toBe(503);
  });

  it("returns 400 on invalid JSON", async () => {
    const submit = vi.fn();
    const response = await handleContactPost(
      new NextRequest("https://portfolio.example/api/contact", {
        method: "POST",
        headers: { origin: "https://portfolio.example", "content-type": "application/json" },
        body: "{not json",
      }),
      submit,
    );

    expect(response.status).toBe(400);
    expect(submit).not.toHaveBeenCalled();
  });

  it("returns 400 on Zod validation failure", async () => {
    const submit = vi.fn();
    const response = await handleContactPost(
      request({ name: "M", email: "visitor@example.com", message: "A useful inquiry.", website: "" }),
      submit,
    );

    expect(response.status).toBe(400);
    expect(submit).not.toHaveBeenCalled();
  });

  it("returns 403 and never submits on missing or wrong origin", async () => {
    const submit = vi.fn();
    const missing = await handleContactPost(
      new NextRequest("https://portfolio.example/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name: "Visitor", email: "visitor@example.com", message: "A useful inquiry." }),
      }),
      submit,
    );
    const wrong = await handleContactPost(
      request(
        { name: "Visitor", email: "visitor@example.com", message: "A useful inquiry.", website: "" },
        {
          origin: "https://evil.example",
        },
      ),
      submit,
    );

    expect(missing.status).toBe(403);
    expect(wrong.status).toBe(403);
    expect(submit).not.toHaveBeenCalled();
  });

  it("returns 413 when declared content-length exceeds 8192", async () => {
    const submit = vi.fn();
    const response = await handleContactPost(
      new NextRequest("https://portfolio.example/api/contact", {
        method: "POST",
        headers: {
          origin: "https://portfolio.example",
          "content-type": "application/json",
          "content-length": "9000",
        },
        body: JSON.stringify({ name: "Visitor", email: "visitor@example.com", message: "A useful inquiry." }),
      }),
      submit,
    );

    expect(response.status).toBe(413);
    expect(submit).not.toHaveBeenCalled();
  });

  it("returns 413 when the actual UTF-8 body exceeds 8192 despite a lying content-length", async () => {
    const submit = vi.fn();
    const response = await handleContactPost(
      request({ name: "Visitor", email: "visitor@example.com", message: "é".repeat(6000), website: "" }),
      submit,
    );

    expect(response.status).toBe(413);
    expect(submit).not.toHaveBeenCalled();
  });

  it("returns 415 for non-JSON content types", async () => {
    const submit = vi.fn();
    const response = await handleContactPost(
      new NextRequest("https://portfolio.example/api/contact", {
        method: "POST",
        headers: { origin: "https://portfolio.example", "content-type": "text/plain" },
        body: "hello",
      }),
      submit,
    );

    expect(response.status).toBe(415);
    expect(submit).not.toHaveBeenCalled();
  });

  it("reuses an existing device cookie instead of issuing a new one", async () => {
    const submit = vi.fn().mockResolvedValue({ kind: "sent", reference: "email-id" });
    const response = await handleContactPost(
      new NextRequest("https://portfolio.example/api/contact", {
        method: "POST",
        headers: {
          origin: "https://portfolio.example",
          "content-type": "application/json",
          "x-vercel-forwarded-for": "203.0.113.10",
          cookie: "chicofolio-contact-device=existing-device",
        },
        body: JSON.stringify({ name: "Visitor", email: "visitor@example.com", message: "A useful inquiry." }),
      }),
      submit,
      () => "fresh-device",
    );

    expect(response.status).toBe(201);
    expect(submit).toHaveBeenCalledWith(expect.anything(), {
      deviceId: "existing-device",
      ipAddress: "203.0.113.10",
    });
    expect(response.cookies.get("chicofolio-contact-device")).toBeUndefined();
  });
});
