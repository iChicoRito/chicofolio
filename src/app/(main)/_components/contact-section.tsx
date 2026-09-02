import { ExternalLink } from "lucide-react";

import { Button } from "@/components/ui/button";
import { profile } from "@/data/profile";

const githubUrl = "https://github.com/iChicoRito";

export default function ContactSection() {
  return (
    <section id="contact" className="scroll-mt-14 border-border border-t py-16 md:py-20">
      <div className="mx-auto w-full max-w-6xl px-4 md:px-8">
        <p className="font-medium text-muted-foreground text-sm uppercase tracking-widest">04 - Contact</p>
        <div className="mt-3 flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <h2 className="font-heading font-semibold text-3xl tracking-tight md:text-4xl">Let's work together</h2>
            <p className="mt-4 text-base text-muted-foreground leading-relaxed">
              Have a product, workflow, or visual experience that needs more clarity? I would love to hear what you are
              building.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 md:min-w-80">
            <div className="rounded-lg border bg-card p-4">
              <p className="font-medium text-muted-foreground text-sm">Location</p>
              <p className="mt-1 text-sm">{profile.location}</p>
            </div>
            <div className="rounded-lg border bg-card p-4">
              <p className="font-medium text-muted-foreground text-sm">Availability</p>
              <p className="mt-1 text-sm">{profile.availability}</p>
            </div>
          </div>
        </div>
        <div className="mt-10 flex flex-wrap items-center gap-4 border-border border-t pt-6">
          <Button asChild>
            <a href={githubUrl} target="_blank" rel="noopener noreferrer">
              GitHub profile
              <ExternalLink aria-hidden="true" />
            </a>
          </Button>
          <p className="text-muted-foreground text-sm">See selected work and public code on GitHub.</p>
        </div>
        <footer className="mt-16 border-border border-t pt-6 text-muted-foreground text-sm">
          <p>
            © {new Date().getFullYear()} {profile.name}. Built with care.
          </p>
        </footer>
      </div>
    </section>
  );
}
