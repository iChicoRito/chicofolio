"use client";

import { ExternalLink, Link2 } from "lucide-react";
import { siGithub } from "simple-icons";

import { SimpleIcon } from "@/components/simple-icon";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { profile } from "@/data/profile";

const socialIcons = {
  GitHub: siGithub,
} as const;

function SocialIcon({ label }: { label: string }) {
  const icon = socialIcons[label as keyof typeof socialIcons];

  if (icon) {
    return (
      <SimpleIcon
        icon={icon}
        aria-hidden="true"
        className="size-5 fill-muted-foreground transition-colors group-hover:fill-foreground"
      />
    );
  }

  return (
    <Link2 aria-hidden="true" className="size-5 text-muted-foreground transition-colors group-hover:text-foreground" />
  );
}

export default function ContactSection() {
  return (
    <section id="contact" className="scroll-mt-14 border-border border-t py-16 md:py-20">
      <div className="mx-auto w-full max-w-6xl px-4 md:px-8">
        <p className="font-medium text-muted-foreground text-sm uppercase tracking-widest">04 - Contact</p>
        <div className="mt-3 max-w-2xl">
          <h2 className="font-heading font-semibold text-3xl tracking-tight md:text-4xl">Let's work together</h2>
          <p className="mt-4 text-base text-muted-foreground leading-relaxed">
            Have a product, workflow, or visual experience that needs more clarity? I would love to hear what you are
            building.
          </p>
        </div>

        <form className="mt-10 max-w-3xl space-y-6" onSubmit={(event) => event.preventDefault()}>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="contact-name">Name</Label>
              <Input id="contact-name" name="name" placeholder="Your name" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-email">Email</Label>
              <Input id="contact-email" name="email" type="email" placeholder="you@example.com" required />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="contact-message">Message</Label>
            <Textarea
              id="contact-message"
              name="message"
              placeholder="Tell me a little about what you are building."
              rows={6}
              required
            />
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Button type="submit">Send message</Button>
          </div>
        </form>

        <div className="mt-12 grid items-start gap-8 border-border border-t pt-8 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:gap-12">
          <div className="max-w-sm">
            <h3 className="font-heading font-semibold text-xl tracking-tight">Find me online</h3>
            <p className="mt-3 text-muted-foreground text-sm leading-relaxed">
              Explore more of my work and connect with me across the web.
            </p>
          </div>
          <Card className="shadow-xs">
            <CardHeader>
              <CardTitle>Social profiles</CardTitle>
              <CardAction>
                <span className="text-muted-foreground text-xs">{profile.socials.length} public links</span>
              </CardAction>
            </CardHeader>
            <CardContent>
              <nav aria-label="Social profiles">
                <ul className="flex flex-col gap-4">
                  {profile.socials.map((social) => (
                    <li key={social.label}>
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Open ${social.label} profile in a new tab`}
                        className="group flex min-h-14 w-full items-start gap-4 rounded-lg px-2 py-1.5 text-left transition-colors hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        <SocialIcon label={social.label} />
                        <span className="min-w-0 flex-1">
                          <span className="block truncate font-medium text-sm leading-none">{social.label}</span>
                          <span className="mt-1 block truncate text-muted-foreground text-xs">
                            {new URL(social.href).hostname.replace(/^www\./, "")} · Public profile
                          </span>
                        </span>
                        <ExternalLink
                          aria-hidden="true"
                          className="mt-0.5 size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground"
                        />
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </CardContent>
          </Card>
        </div>
        <footer className="mt-16 border-border border-t pt-6 text-muted-foreground text-sm">
          <p>
            © {new Date().getFullYear()} {profile.name}.
          </p>
        </footer>
      </div>
    </section>
  );
}
