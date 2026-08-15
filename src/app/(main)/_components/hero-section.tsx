import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { profile } from "@/data/profile";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[50svh] items-center justify-center overflow-hidden pb-8 pt-16 text-center md:pt-0 md:text-left"
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
          className="size-56 rounded-[2.5rem] object-cover md:size-72"
          priority
        />
        <div className="flex min-w-0 flex-1 flex-col items-center gap-4 md:items-start">
          <h1 className="font-heading w-full text-3xl font-medium tracking-tight md:text-5xl">{profile.name}</h1>
          <p className="font-heading max-w-2xl text-base font-normal text-muted-foreground md:text-lg">
            {profile.role}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 md:justify-start">
            <Button asChild size="lg">
              <Link href="#projects">View Projects</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="#about">About Me</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
