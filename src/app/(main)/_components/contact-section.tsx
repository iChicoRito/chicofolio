import { ExternalLink, Link2 } from "lucide-react";
import { siGithub } from "simple-icons";

import { SimpleIcon } from "@/components/simple-icon";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { profile } from "@/data/profile";

import ContactForm from "./contact-form";

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

        <ContactForm />

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
