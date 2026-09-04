import Image from "next/image";
import Link from "next/link";

import { Download } from "lucide-react";

import { Button } from "@/components/ui/button";
import { profile } from "@/data/profile";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[50svh] items-center justify-center overflow-hidden pt-16 pb-8 text-center md:pt-0 md:text-left"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute top-[-10rem] left-1/2 size-96 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl"
      />
      <div className="relative z-10 flex w-full max-w-6xl flex-col items-center gap-8 px-4 md:flex-row md:gap-10 md:px-8">
        <Image
          src="/assets/img/profile-photo.png"
          alt={`${profile.name} profile photo`}
          width={320}
          height={320}
          className="size-56 rounded-[2.5rem] object-cover md:size-72 dark:hidden"
          priority
        />
        <Image
          src="/assets/img/profile-photo-1.png"
          alt={`${profile.name} profile photo`}
          width={320}
          height={320}
          className="hidden size-56 rounded-[2.5rem] object-cover md:size-72 dark:block"
          priority
        />
        <div className="flex min-w-0 flex-1 flex-col items-center gap-4 md:items-start">
          <h1 className="w-full font-heading font-medium text-3xl tracking-tight md:text-5xl">{profile.name}</h1>
          <p className="max-w-2xl text-base text-muted-foreground md:text-lg">{profile.heroDescription}</p>
          <p className="text-muted-foreground text-sm">
            {profile.location} · {profile.availability}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 md:justify-start">
            <Button asChild size="lg">
              <Link href="#projects">View selected work</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="#contact">Let's work together</Link>
            </Button>
            <Button asChild size="lg" variant="ghost">
              <a href="/resume.pdf" download="Salunga-Resume.pdf">
                <Download aria-hidden="true" className="size-4" />
                Download Resume
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
