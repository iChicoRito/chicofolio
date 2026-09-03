import type { Redis } from "@upstash/redis";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { RedisContactStore } from "./contact-store";
import type { ContactReservation } from "./contact-types";

const reservation: ContactReservation = { id: "claim-1", device: "device", email: "email", ip: "ip" };
const evalMock = vi.fn();
const redis = { eval: evalMock } as unknown as Redis;
const store = new RedisContactStore(redis, {
  namespace: "test",
  pendingTtlSeconds: 172800,
  rateLimitMax: 5,
  rateWindowSeconds: 3600,
});

describe("RedisContactStore", () => {
  beforeEach(() => evalMock.mockReset());

  it.each([
    [1, "reserved"],
    [2, "duplicate"],
    [3, "rate_limited"],
  ] as const)("maps reserve result %i to %s", async (raw, expected) => {
    evalMock.mockResolvedValue(raw);
    await expect(store.reserve(reservation)).resolves.toBe(expected);
    expect(evalMock).toHaveBeenCalledOnce();
  });

  it("commits only when both keys are still owned by the reservation", async () => {
    evalMock.mockResolvedValue(1);
    await expect(store.commit(reservation, "email-id")).resolves.toBe(true);
  });

  it("releases only the caller-owned provisional keys", async () => {
    evalMock.mockResolvedValue(2);
    await expect(store.release(reservation)).resolves.toBeUndefined();
  });
});
