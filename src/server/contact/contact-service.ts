import type { ContactSubmission } from "@/lib/contact/contact-schema";

import type { ContactMailer, ContactResult } from "./contact-types";

type SubmitDependencies = {
  mailer: ContactMailer;
};

export async function submitContact(
  submission: ContactSubmission,
  dependencies: SubmitDependencies,
): Promise<ContactResult> {
  try {
    const result = await dependencies.mailer.send(submission);
    return { kind: "sent", reference: result.messageId };
  } catch {
    return { kind: "unavailable" };
  }
}
