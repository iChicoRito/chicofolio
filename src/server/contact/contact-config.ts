import { z } from "zod";

const environmentSchema = z.object({
  RESEND_API_KEY: z.string().min(1),
  CONTACT_TO_EMAIL: z.string().trim().email(),
  CONTACT_FROM_EMAIL: z.string().trim().email(),
  CONTACT_DEDUPE_SECRET: z.string().min(32),
  CONTACT_REDIS_NAMESPACE: z
    .string()
    .regex(/^[a-zA-Z0-9:_-]+$/)
    .default("chicofolio:contact:v1"),
  UPSTASH_REDIS_REST_URL: z.string().url(),
  UPSTASH_REDIS_REST_TOKEN: z.string().min(1),
});

export function getContactConfig(environment: NodeJS.ProcessEnv | Record<string, string | undefined> = process.env) {
  const parsed = environmentSchema.parse(environment);

  return {
    resendApiKey: parsed.RESEND_API_KEY,
    toEmail: parsed.CONTACT_TO_EMAIL,
    fromEmail: parsed.CONTACT_FROM_EMAIL,
    dedupeSecret: parsed.CONTACT_DEDUPE_SECRET,
    redisNamespace: parsed.CONTACT_REDIS_NAMESPACE,
    redisUrl: parsed.UPSTASH_REDIS_REST_URL,
    redisToken: parsed.UPSTASH_REDIS_REST_TOKEN,
  } as const;
}
