"use client";

import { type FormEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";

type FormState = {
  kind: "idle" | "submitting" | "sent" | "error";
  message: string;
};

const initialState: FormState = { kind: "idle", message: "" };

async function readCode(response: Response) {
  try {
    const body: unknown = await response.json();
    if (typeof body === "object" && body !== null && "code" in body && typeof body.code === "string") {
      return body.code;
    }
  } catch {
    return null;
  }
  return null;
}

export default function ContactForm() {
  const [state, setState] = useState<FormState>(initialState);
  const locked = state.kind === "submitting" || state.kind === "sent";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (locked) return;

    const form = event.currentTarget;
    const data = new FormData(form);
    setState({ kind: "submitting", message: "Sending your message…" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: String(data.get("name") ?? ""),
          email: String(data.get("email") ?? ""),
          message: String(data.get("message") ?? ""),
          website: String(data.get("website") ?? ""),
        }),
      });
      const code = await readCode(response);

      if (response.ok && code === "sent") {
        form.reset();
        setState({ kind: "sent", message: "Thanks — your message was sent." });
        return;
      }
      if (response.status === 409) {
        setState({ kind: "error", message: "This browser or email has already sent a message." });
        return;
      }
      if (response.status === 429) {
        setState({ kind: "error", message: "Too many attempts. Please try again later." });
        return;
      }
      setState({ kind: "error", message: "Your message could not be sent. Please try again." });
    } catch {
      setState({ kind: "error", message: "Your message could not be sent. Please try again." });
    }
  }

  return (
    <form className="mt-10 max-w-3xl space-y-6" onSubmit={handleSubmit}>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="contact-name">Name</Label>
          <Input
            id="contact-name"
            name="name"
            autoComplete="name"
            minLength={2}
            maxLength={80}
            placeholder="Your name"
            disabled={locked}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="contact-email">Email</Label>
          <Input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            maxLength={254}
            placeholder="you@example.com"
            disabled={locked}
            required
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="contact-message">Message</Label>
        <Textarea
          id="contact-message"
          name="message"
          minLength={10}
          maxLength={5000}
          placeholder="Tell me a little about what you are building."
          rows={6}
          disabled={locked}
          required
        />
      </div>
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="contact-website">Website</label>
        <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" disabled={locked}>
          {state.kind === "submitting" && <Spinner aria-hidden="true" />}
          {state.kind === "submitting" ? "Sending…" : state.kind === "sent" ? "Message sent" : "Send message"}
        </Button>
        {state.message && (
          <p
            className={state.kind === "error" ? "text-destructive text-sm" : "text-muted-foreground text-sm"}
            role={state.kind === "error" ? "alert" : "status"}
            aria-live="polite"
          >
            {state.message}
          </p>
        )}
      </div>
    </form>
  );
}
