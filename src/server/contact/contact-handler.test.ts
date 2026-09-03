import { NextRequest } from "next/server";

import { describe, expect, it, vi } from "vitest";

import { handleContactPost } from "./contact-handler";

function request(body: unknown, headers: Record<string, string> = {}) {
  return new NextRequest("https://portfolio.example/api/contact", {
    method: "POST",
    headers: {
      origin: "https://portfolio.example",
      "content-type": "application/json",
      ...headers,
    },
    body: JSON.stringify(body),
  });
}

describe("handleContactPost", () => {
  it("returns 201 and submits normalized data", async () => {
    const submit = vi.fn().mockResolvedValue({ kind: "sent", reference: "email-id" });
    const response = await handleContactPost(
      request({ name: "Visitor", email: "VISITOR@example.com", message: "A useful inquiry." }),
      submit,
    );

    expect(response.status).toBe(201);
    await expect(response.json()).resolves.toEqual({ ok: true, code: "sent", reference: "email-id" });
    expect(submit).toHaveBeenCalledWith({
      name: "Visitor",
      email: "visitor@example.com",
      message: "A useful inquiry.",
    });
  });

  it("allows repeated submissions", async () => {
    const submit = vi.fn().mockResolvedValue({ kind: "sent", reference: "email-id" });
    const body = { name: "Visitor", email: "visitor@example.com", message: "A useful inquiry." };

    const first = await handleContactPost(request(body), submit);
    const second = await handleContactPost(request(body), submit);

    expect(first.status).toBe(201);
    expect(second.status).toBe(201);
    expect(submit).toHaveBeenCalledTimes(2);
  });

  it("returns 503 when the submission is unavailable", async () => {
    const submit = vi.fn().mockResolvedValue({ kind: "unavailable" });
    const response = await handleContactPost(
      request({ name: "Visitor", email: "visitor@example.com", message: "A useful inquiry." }),
      submit,
    );

    expect(response.status).toBe(503);
  });

  it("returns 503 when the submission throws", async () => {
    const submit = vi.fn().mockRejectedValue(new Error("boom"));
    const response = await handleContactPost(
      request({ name: "Visitor", email: "visitor@example.com", message: "A useful inquiry." }),
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

  it("returns 400 on validation failure", async () => {
    const submit = vi.fn();
    const response = await handleContactPost(
      request({ name: "M", email: "visitor@example.com", message: "A useful inquiry." }),
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
        { name: "Visitor", email: "visitor@example.com", message: "A useful inquiry." },
        { origin: "https://evil.example" },
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
      request({ name: "Visitor", email: "visitor@example.com", message: "é".repeat(6000) }),
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
});
