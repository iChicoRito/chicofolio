import type { Redis } from "@upstash/redis";

import type { ContactReservation, ContactStore, ReservationResult } from "./contact-types";

const RESERVE_SCRIPT = `
if redis.call("EXISTS", KEYS[1]) == 1 or redis.call("EXISTS", KEYS[2]) == 1 then
  return 2
end
local count = redis.call("INCR", KEYS[3])
if count == 1 then
  redis.call("EXPIRE", KEYS[3], ARGV[2])
end
if count > tonumber(ARGV[3]) then
  return 3
end
redis.call("SET", KEYS[1], ARGV[1], "EX", ARGV[4])
redis.call("SET", KEYS[2], ARGV[1], "EX", ARGV[4])
return 1
`;

const COMMIT_SCRIPT = `
if redis.call("GET", KEYS[1]) ~= ARGV[1] or redis.call("GET", KEYS[2]) ~= ARGV[1] then
  return 0
end
redis.call("SET", KEYS[1], "sent:" .. ARGV[2])
redis.call("SET", KEYS[2], "sent:" .. ARGV[2])
return 1
`;

const RELEASE_SCRIPT = `
local released = 0
if redis.call("GET", KEYS[1]) == ARGV[1] then
  released = released + redis.call("DEL", KEYS[1])
end
if redis.call("GET", KEYS[2]) == ARGV[1] then
  released = released + redis.call("DEL", KEYS[2])
end
return released
`;

type StoreOptions = {
  namespace: string;
  pendingTtlSeconds?: number;
  rateLimitMax?: number;
  rateWindowSeconds?: number;
};

export class RedisContactStore implements ContactStore {
  private readonly pendingTtlSeconds: number;
  private readonly rateLimitMax: number;
  private readonly rateWindowSeconds: number;

  constructor(
    private readonly redis: Redis,
    private readonly options: StoreOptions,
  ) {
    this.pendingTtlSeconds = options.pendingTtlSeconds ?? 60 * 60 * 48;
    this.rateLimitMax = options.rateLimitMax ?? 5;
    this.rateWindowSeconds = options.rateWindowSeconds ?? 60 * 60;
  }

  async reserve(reservation: ContactReservation): Promise<ReservationResult> {
    const result = Number(
      await this.redis.eval(
        RESERVE_SCRIPT,
        [this.emailKey(reservation.email), this.deviceKey(reservation.device), this.rateKey(reservation.ip)],
        [reservation.id, String(this.rateWindowSeconds), String(this.rateLimitMax), String(this.pendingTtlSeconds)],
      ),
    );

    if (result === 1) return "reserved";
    if (result === 2) return "duplicate";
    if (result === 3) return "rate_limited";
    throw new Error("Unexpected contact reservation response.");
  }

  async commit(reservation: ContactReservation, providerMessageId: string): Promise<boolean> {
    const result = await this.redis.eval(
      COMMIT_SCRIPT,
      [this.emailKey(reservation.email), this.deviceKey(reservation.device)],
      [reservation.id, providerMessageId],
    );
    return Number(result) === 1;
  }

  async release(reservation: ContactReservation): Promise<void> {
    await this.redis.eval(
      RELEASE_SCRIPT,
      [this.emailKey(reservation.email), this.deviceKey(reservation.device)],
      [reservation.id],
    );
  }

  private emailKey(digest: string) {
    return `${this.options.namespace}:email:${digest}`;
  }

  private deviceKey(digest: string) {
    return `${this.options.namespace}:device:${digest}`;
  }

  private rateKey(digest: string) {
    return `${this.options.namespace}:rate:${digest}`;
  }
}
