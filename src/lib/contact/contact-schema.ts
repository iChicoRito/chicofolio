import { z } from "zod";

export const contactSubmissionSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Name must be at least 2 characters.")
      .max(80, "Name must be at most 80 characters.")
      .refine((value) => !/[\r\n]/.test(value), "Name cannot contain line breaks."),
    email: z.string().trim().toLowerCase().email("Enter a valid email address.").max(254),
    message: z.string().trim().min(10, "Message must be at least 10 characters.").max(5000),
    website: z.string().max(0).optional().default(""),
  })
  .strict();

export type ContactSubmission = z.infer<typeof contactSubmissionSchema>;
