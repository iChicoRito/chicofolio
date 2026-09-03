import { Redis } from "@upstash/redis";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

import { RedisContactStore } from "./contact-store";
import type { ContactReservation } from "./contact-types";
import crypto from "node:crypto";

const runIntegration = process.env.RUN_CONTACT_REDIS_INTEGRATION === "1";

describe.skipIf(!runIntegration)("RedisContactStore integration", () => {
  const namespace = `chicofolio:test:${crypto.randomUUID()}`;
  const generatedKeys: string[] = [];

  let redis: Redis;
  let store: RedisContactStore;

  const keyFor = (kind: "email" | "device" | "rate", digest: string) => `${namespace}:${kind}:${digest}`;
  const track = (kind: "email" | "device" | "rate", digest: string) => {
    const key = keyFor(kind, digest);
    if (!generatedKeys.includes(key)) generatedKeys.push(key);
  };

  beforeAll(() => {
    redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL as string,
      token: process.env.UPSTASH_REDIS_REST_TOKEN as string,
    });
    store = new RedisContactStore(redis, {
      namespace,
      pendingTtlSeconds: 172800,
      rateLimitMax: 5,
      rateWindowSeconds: 3600,
    });
  });

  afterAll(async () => {
    for (const key of generatedKeys) {
      await redis.del(key);
    }
  });

  const makeReservation = (id: string, device: string, email: string, ip: string): ContactReservation => {
    track("email", email);
    track("device", device);
    track("rate", ip);
    return { id, device, email, ip };
  };

  it("exactly one of 20 concurrent same-email reservations wins and blocks every other path", async () => {
    const email = `concurrent-${crypto.randomUUID()}`;
    const results = await Promise.all(
      Array.from({ length: 20 }, (_, index) =>
        store.reserve(makeReservation(`claim-${index}`, `device-${index}`, email, "203.0.113.50")),
      ),
    );

    expect(results.filter((result) => result === "reserved")).toHaveLength(1);
    expect(results.filter((result) => result === "duplicate")).toHaveLength(19);

    const winnerIndex = results.indexOf("reserved");
    const winner = makeReservation(`claim-${winnerIndex}`, `device-${winnerIndex}`, email, "203.0.113.50");
    await expect(store.commit(winner, "email-id-1")).resolves.toBe(true);

    await expect(store.reserve(makeReservation("claim-other", "device-other", email, "203.0.113.51"))).resolves.toBe(
      "duplicate",
    );

    const committedWinner = makeReservation(`claim-${winnerIndex}`, `device-${winnerIndex}`, email, "203.0.113.50");
    await expect(store.commit(committedWinner, "email-id-2")).resolves.toBe(false);

    await expect(
      store.reserve(
        makeReservation(
          "claim-r2",
          `device-r2-${crypto.randomUUID()}`,
          `other-${crypto.randomUUID()}@example.com`,
          "203.0.113.52",
        ),
      ),
    ).resolves.toBe("reserved");

    await expect(
      store.release(makeReservation("claim-stale", `device-${winnerIndex}`, email, "203.0.113.50")),
    ).resolves.toBeUndefined();
  });
});
