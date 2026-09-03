import type { ContactSubmission } from "@/lib/contact/contact-schema";

import { createContactDigests } from "./contact-identity";
import type { ContactIdentity, ContactMailer, ContactResult, ContactStore } from "./contact-types";

type SubmitDependencies = {
  store: ContactStore;
  mailer: ContactMailer;
  dedupeSecret: string;
  createId: () => string;
};

async function releaseQuietly(store: ContactStore, reservation: Parameters<ContactStore["release"]>[0]) {
  try {
    await store.release(reservation);
  } catch {
    return;
  }
}

export async function submitContact(
  submission: ContactSubmission,
  identity: ContactIdentity,
  dependencies: SubmitDependencies,
): Promise<ContactResult> {
  const digests = createContactDigests(dependencies.dedupeSecret, {
    deviceId: identity.deviceId,
    email: submission.email,
    ipAddress: identity.ipAddress,
  });
  const reservation = { id: dependencies.createId(), ...digests };
  const reservationResult = await dependencies.store.reserve(reservation);

  if (reservationResult === "duplicate") return { kind: "duplicate" };
  if (reservationResult === "rate_limited") return { kind: "rate_limited" };

  let messageId: string;
  try {
    const result = await dependencies.mailer.send(submission, `contact/${digests.email}`);
    messageId = result.messageId;
  } catch {
    await releaseQuietly(dependencies.store, reservation);
    return { kind: "unavailable" };
  }

  const committed = await dependencies.store.commit(reservation, messageId);
  if (!committed) return { kind: "unavailable" };
  return { kind: "sent", reference: messageId };
}
