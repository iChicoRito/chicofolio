import type { ContactSubmission } from "@/lib/contact/contact-schema";

export type ContactIdentity = {
  deviceId: string;
  ipAddress: string;
};

export type ContactDigests = {
  device: string;
  email: string;
  ip: string;
};

export type ContactReservation = ContactDigests & {
  id: string;
};

export type ReservationResult = "reserved" | "duplicate" | "rate_limited";

export interface ContactStore {
  reserve(reservation: ContactReservation): Promise<ReservationResult>;
  commit(reservation: ContactReservation, providerMessageId: string): Promise<boolean>;
  release(reservation: ContactReservation): Promise<void>;
}

export interface ContactMailer {
  send(submission: ContactSubmission, idempotencyKey: string): Promise<{ messageId: string }>;
}

export type ContactResult =
  | { kind: "sent"; reference: string }
  | { kind: "duplicate" }
  | { kind: "rate_limited" }
  | { kind: "unavailable" };

export type SubmitContact = (submission: ContactSubmission, identity: ContactIdentity) => Promise<ContactResult>;
