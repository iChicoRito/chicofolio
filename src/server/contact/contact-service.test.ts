import { describe, expect, it, vi } from "vitest";

import { submitContact } from "./contact-service";
import type { ContactMailer, ContactStore } from "./contact-types";

const submission = {
  name: "Visitor",
  email: "visitor@example.com",
  message: "A useful project inquiry.",
  website: "",
};
const identity = { deviceId: "device-1", ipAddress: "203.0.113.10" };

describe("submitContact", () => {
  it("commits a reserved submission after one accepted email", async () => {
    const store: ContactStore = {
      reserve: vi.fn().mockResolvedValue("reserved"),
      commit: vi.fn().mockResolvedValue(true),
      release: vi.fn().mockResolvedValue(undefined),
    };
    const mailer: ContactMailer = {
      send: vi.fn().mockResolvedValue({ messageId: "email-id" }),
    };

    await expect(
      submitContact(submission, identity, {
        store,
        mailer,
        dedupeSecret: "s".repeat(32),
        createId: () => "claim-id",
      }),
    ).resolves.toEqual({ kind: "sent", reference: "email-id" });
    expect(mailer.send).toHaveBeenCalledWith(submission, expect.stringMatching(/^contact\/[a-f0-9]{64}$/));
    expect(store.commit).toHaveBeenCalledWith(expect.objectContaining({ id: "claim-id" }), "email-id");
    expect(store.release).not.toHaveBeenCalled();
  });

  it("returns duplicate and never calls the mailer", async () => {
    const store: ContactStore = {
      reserve: vi.fn().mockResolvedValue("duplicate"),
      commit: vi.fn().mockResolvedValue(true),
      release: vi.fn().mockResolvedValue(undefined),
    };
    const mailer: ContactMailer = { send: vi.fn() };

    await expect(
      submitContact(submission, identity, {
        store,
        mailer,
        dedupeSecret: "s".repeat(32),
        createId: () => "claim-id",
      }),
    ).resolves.toEqual({ kind: "duplicate" });
    expect(mailer.send).not.toHaveBeenCalled();
    expect(store.commit).not.toHaveBeenCalled();
    expect(store.release).not.toHaveBeenCalled();
  });

  it("returns rate_limited and never calls the mailer", async () => {
    const store: ContactStore = {
      reserve: vi.fn().mockResolvedValue("rate_limited"),
      commit: vi.fn().mockResolvedValue(true),
      release: vi.fn().mockResolvedValue(undefined),
    };
    const mailer: ContactMailer = { send: vi.fn() };

    await expect(
      submitContact(submission, identity, {
        store,
        mailer,
        dedupeSecret: "s".repeat(32),
        createId: () => "claim-id",
      }),
    ).resolves.toEqual({ kind: "rate_limited" });
    expect(mailer.send).not.toHaveBeenCalled();
  });

  it("releases the reservation and returns unavailable when the mailer rejects", async () => {
    const store: ContactStore = {
      reserve: vi.fn().mockResolvedValue("reserved"),
      commit: vi.fn().mockResolvedValue(true),
      release: vi.fn().mockResolvedValue(undefined),
    };
    const mailer: ContactMailer = { send: vi.fn().mockRejectedValue(new Error("Email delivery was not accepted.")) };

    await expect(
      submitContact(submission, identity, {
        store,
        mailer,
        dedupeSecret: "s".repeat(32),
        createId: () => "claim-id",
      }),
    ).resolves.toEqual({ kind: "unavailable" });
    expect(store.release).toHaveBeenCalledOnce();
    expect(store.release).toHaveBeenCalledWith(expect.objectContaining({ id: "claim-id" }));
    expect(store.commit).not.toHaveBeenCalled();
  });

  it("keeps the pending reservation when the commit loses ownership", async () => {
    const store: ContactStore = {
      reserve: vi.fn().mockResolvedValue("reserved"),
      commit: vi.fn().mockResolvedValue(false),
      release: vi.fn().mockResolvedValue(undefined),
    };
    const mailer: ContactMailer = { send: vi.fn().mockResolvedValue({ messageId: "email-id" }) };

    await expect(
      submitContact(submission, identity, {
        store,
        mailer,
        dedupeSecret: "s".repeat(32),
        createId: () => "claim-id",
      }),
    ).resolves.toEqual({ kind: "unavailable" });
    expect(store.release).not.toHaveBeenCalled();
  });

  it("never calls the mailer when the store fails", async () => {
    const store: ContactStore = {
      reserve: vi.fn().mockRejectedValue(new Error("redis down")),
      commit: vi.fn().mockResolvedValue(true),
      release: vi.fn().mockResolvedValue(undefined),
    };
    const mailer: ContactMailer = { send: vi.fn() };

    await expect(
      submitContact(submission, identity, {
        store,
        mailer,
        dedupeSecret: "s".repeat(32),
        createId: () => "claim-id",
      }),
    ).rejects.toThrow("redis down");
    expect(mailer.send).not.toHaveBeenCalled();
  });
});
