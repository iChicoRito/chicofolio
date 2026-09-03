import { z } from "zod";

const environmentSchema = z.object({
  RESEND_API_KEY: z.string().min(1),
  CONTACT_TO_EMAIL: z.string().trim().email(),
  CONTACT_FROM_EMAIL: z.string().trim().email(),
});

export function getContactConfig(environment: NodeJS.ProcessEnv | Record<string, string | undefined> = process.env) {
  const parsed = environmentSchema.parse(environment);

  return {
    resendApiKey: parsed.RESEND_API_KEY,
    toEmail: parsed.CONTACT_TO_EMAIL,
    fromEmail: parsed.CONTACT_FROM_EMAIL,
  } as const;
}
