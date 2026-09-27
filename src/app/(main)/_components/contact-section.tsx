import type { CSSProperties } from "react";

import { ArrowUpRight, Link2 } from "lucide-react";
import { siGithub } from "simple-icons";

import { SimpleIcon } from "@/components/simple-icon";
import { profile } from "@/data/profile";

import ContactForm from "./contact-form";
import SectionHeader from "./section-header";

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
    <section id="contact" className="scroll-mt-14 border-border border-t py-20 md:py-28">
      <div className="mx-auto w-full max-w-6xl px-4 md:px-8">
        <SectionHeader index="04" label="Contact" title="Let's work together" />

        <div className="mt-12 grid items-start gap-12 md:mt-16 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.3fr)] md:gap-16">
          <div className="reveal">
            <p className="text-foreground/80 text-lg leading-relaxed">
              Have a product, workflow, or visual experience that needs more clarity? I would love to hear what you are
              building.
            </p>
            <p className="mt-10 font-medium text-sm">Find me online</p>
            <nav aria-label="Social profiles" className="mt-3">
              <ul className="divide-y divide-border border-border border-y">
                {profile.socials.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Open ${social.label} profile in a new tab`}
                      className="group flex items-center gap-4 py-4 transition-colors duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-muted transition-colors duration-300 ease-out group-hover:bg-foreground/10">
                        <SocialIcon label={social.label} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate font-medium">{social.label}</span>
                        <span className="block truncate text-muted-foreground text-sm">
                          {new URL(social.href).hostname.replace(/^www\./, "")}
                        </span>
                      </span>
                      <ArrowUpRight
                        aria-hidden="true"
                        className="size-5 shrink-0 text-muted-foreground transition-[translate,color] duration-300 ease-out group-hover:text-foreground motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div
            className="reveal rounded-2xl bg-muted/40 p-6 ring-1 ring-border md:p-8"
            style={{ "--reveal-i": 1 } as CSSProperties}
          >
            <p className="font-heading font-semibold text-xl tracking-tight">Send a message</p>
            <ContactForm />
          </div>
        </div>

        <footer className="mt-20 border-border border-t pt-6 text-muted-foreground text-sm">
          <p>
            © {new Date().getFullYear()} {profile.name}.
          </p>
        </footer>
      </div>
    </section>
  );
}
