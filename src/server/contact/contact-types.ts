import type { ContactSubmission } from "@/lib/contact/contact-schema";

export interface ContactMailer {
  send(submission: ContactSubmission): Promise<{ messageId: string }>;
}

export type ContactResult = { kind: "sent"; reference: string } | { kind: "unavailable" };

export type SubmitContact = (submission: ContactSubmission) => Promise<ContactResult>;
