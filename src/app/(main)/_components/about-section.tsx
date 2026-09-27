import type { CSSProperties } from "react";

import Link from "next/link";

import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { profile } from "@/data/profile";

import SectionHeader from "./section-header";

const skills = ["Graphic design", "UI/UX design", "Web apps", "Mobile apps", "AI automation"];

export default function AboutSection() {
  return (
    <section id="about" className="scroll-mt-14 py-20 md:py-28">
      <div className="mx-auto w-full max-w-6xl px-4 md:px-8">
        <SectionHeader
          index="01"
          label="About me"
          title="Creating products that are easy to use, helpful, and beautifully designed."
        />

        <div className="mt-12 grid gap-12 md:mt-16 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] md:gap-16">
          <div className="reveal">
            <p className="text-foreground/80 text-lg leading-relaxed">{profile.bio}</p>
            <ul className="mt-8 flex flex-wrap gap-2">
              {skills.map((skill) => (
                <li
                  key={skill}
                  className="rounded-full border border-border bg-background px-3.5 py-1.5 text-sm transition-colors duration-300 ease-out hover:border-foreground/30 hover:bg-muted"
                >
                  {skill}
                </li>
              ))}
            </ul>
            <Button asChild variant="outline" size="lg" className="group/more mt-10">
              <Link href="/about">
                More about me
                <ArrowRight className="transition-transform duration-300 ease-out motion-safe:group-hover/more:translate-x-1" />
              </Link>
            </Button>
          </div>

          <div
            className="reveal rounded-2xl bg-muted/40 p-2 ring-1 ring-border"
            style={{ "--reveal-i": 1 } as CSSProperties}
          >
            <p className="px-4 pt-4 pb-2 font-medium text-sm">Experience</p>
            <ul>
              {profile.experience.map((job) => (
                <li
                  key={`${job.role}-${job.company}`}
                  className="flex flex-col gap-1 rounded-xl px-4 py-4 transition-colors duration-300 ease-out hover:bg-background"
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="font-medium text-foreground">{job.role}</span>
                    <span className="shrink-0 text-muted-foreground text-sm tabular-nums">{job.period}</span>
                  </div>
                  <span className="text-muted-foreground text-sm">{job.company}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
