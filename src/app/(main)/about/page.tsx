import Image from "next/image";
import Link from "next/link";

import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Download,
  GraduationCap,
  type LucideIcon,
  MapPin,
  Sparkles,
} from "lucide-react";

import SplitText from "@/components/split-text";
import TiltedCard from "@/components/tilted-card";
import { Button } from "@/components/ui/button";
import { profile } from "@/data/profile";

import SectionHeader from "../_components/section-header";
import SiteHeader from "../_components/site-header";

const facts: { label: string; Icon: LucideIcon; value: string }[] = [
  { label: "Based in", Icon: MapPin, value: profile.location },
  { label: "Focus", Icon: Sparkles, value: "Product design + full-stack development" },
  { label: "Education", Icon: GraduationCap, value: profile.education.degree },
  { label: "Status", Icon: BadgeCheck, value: profile.availability },
];

type TimelineEntry = { period: string; place: string; title: string; points: readonly string[] };

function Timeline({ entries }: { entries: TimelineEntry[] }) {
  return (
    <ol className="mt-12 flex flex-col md:mt-16">
      {entries.map((entry) => (
        <li key={entry.title} className="reveal grid gap-3 md:grid-cols-[13rem_minmax(0,1fr)] md:gap-10">
          <div>
            <p className="font-heading font-semibold text-foreground tabular-nums">{entry.period}</p>
            <p className="mt-1 text-muted-foreground text-sm leading-relaxed">{entry.place}</p>
          </div>
          <div className="group/entry relative border-border border-l pb-12 pl-7">
            <span
              aria-hidden="true"
              className="absolute top-1.5 -left-[5px] size-2.5 rounded-full bg-primary ring-4 ring-background transition-transform duration-300 ease-out motion-safe:group-hover/entry:scale-150"
            />
            <h3 className="font-heading font-semibold text-foreground text-lg leading-snug">{entry.title}</h3>
            <ul className="mt-4 flex flex-col gap-2.5">
              {entry.points.map((point) => (
                <li key={point} className="flex gap-3 text-muted-foreground leading-relaxed">
                  <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-muted-foreground/50" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </li>
      ))}
    </ol>
  );
}

export default function AboutPage() {
  const work = profile.experience.map((job) => ({
    period: job.period,
    place: job.company,
    title: job.role,
    points: job.points,
  }));
  const practice = profile.personalExperience.map((item) => ({
    period: item.period,
    place: item.context,
    title: item.title,
    points: item.points,
  }));

  return (
    <div className="flex min-h-svh flex-col">
      <SiteHeader />
      <main id="main-content" className="flex-1">
        <article className="mx-auto w-full max-w-6xl px-4 pt-12 pb-20 md:px-8 md:pt-16 md:pb-28">
          <Button asChild variant="ghost" className="group/back -ml-2">
            <Link href="/">
              <ArrowLeft className="transition-transform duration-300 ease-out motion-safe:group-hover/back:-translate-x-1" />
              Back
            </Link>
          </Button>

          <header className="mt-10 flex flex-col gap-8 md:flex-row md:items-center md:gap-14">
            <TiltedCard
              className="aspect-square h-auto w-56 shrink-0 self-center md:w-72 md:self-auto"
              glareClassName="rounded-[2.5rem] bg-muted"
              scaleOnHover={1.04}
              rotateAmplitude={10}
            >
              <Image
                src="/assets/img/profile-photo.png"
                alt={`${profile.name} profile photo`}
                fill
                sizes="(min-width: 768px) 288px, 224px"
                className="object-cover dark:hidden"
                priority
              />
              <Image
                src="/assets/img/profile-photo-1.png"
                alt={`${profile.name} profile photo`}
                fill
                sizes="(min-width: 768px) 288px, 224px"
                className="hidden object-cover dark:block"
                priority
              />
            </TiltedCard>
            <div className="min-w-0">
              <p className="flex items-center gap-3 text-sm">
                <span className="font-heading font-semibold text-foreground">About me</span>
                <span aria-hidden="true" className="h-px w-10 bg-border" />
                <span className="text-muted-foreground">{profile.location}</span>
              </p>
              <SplitText
                tag="h1"
                text={profile.name}
                textAlign="left"
                splitType="words"
                delay={60}
                duration={0.9}
                rootMargin="0px"
                className="mt-4 text-balance font-heading font-semibold text-4xl leading-tight tracking-tight md:text-6xl"
              />
              <p className="mt-5 max-w-2xl text-lg text-muted-foreground leading-relaxed md:text-xl">
                {profile.heroDescription}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg" className="group/cta">
                  <Link href="/#contact">
                    Get in touch
                    <ArrowRight className="transition-transform duration-300 ease-out motion-safe:group-hover/cta:translate-x-1" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <a href="/resume.pdf" download="Salunga-Resume.pdf">
                    <Download aria-hidden="true" />
                    Download resume
                  </a>
                </Button>
              </div>
            </div>
          </header>

          <dl className="mt-16 grid divide-y divide-border rounded-2xl bg-muted/30 ring-1 ring-border sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
            {facts.map(({ label, Icon, value }) => (
              <div
                key={label}
                className="group/fact min-w-0 p-5 transition-colors duration-300 ease-out hover:bg-muted/50 md:p-6"
              >
                <dt className="flex items-center gap-2 text-muted-foreground text-sm">
                  <Icon
                    aria-hidden="true"
                    className="size-4 transition-colors duration-300 ease-out group-hover/fact:text-foreground"
                  />
                  {label}
                </dt>
                <dd className="mt-3 text-foreground leading-relaxed">{value}</dd>
              </div>
            ))}
          </dl>

          <p className="reveal mt-16 max-w-3xl text-foreground/80 text-xl leading-relaxed md:mt-20 md:text-2xl">
            {profile.aboutDetails}
          </p>

          <section className="mt-24 md:mt-32">
            <SectionHeader index="01" label="Experience" title="Work experience" />
            <Timeline entries={work} />
          </section>

          <section className="mt-16 md:mt-24">
            <SectionHeader
              index="02"
              label="AI practice"
              title="Personal experience"
              description="Self-directed AI practice alongside formal roles — two years of learning to work with AI, not just chat with it."
            />
            <Timeline entries={practice} />
          </section>

          <section className="mt-16 md:mt-24">
            <SectionHeader index="03" label="Education" title="Education" />
            <div className="reveal mt-12 flex flex-col gap-4 rounded-2xl bg-muted/40 p-6 ring-1 ring-border sm:flex-row sm:items-center md:mt-16 md:p-8">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-background ring-1 ring-border">
                <GraduationCap aria-hidden="true" className="size-5" />
              </span>
              <div>
                <h3 className="font-heading font-semibold text-foreground text-lg">{profile.education.degree}</h3>
                <p className="mt-1 text-muted-foreground">{profile.education.school}</p>
                <p className="mt-0.5 text-muted-foreground text-sm">{profile.education.details}</p>
              </div>
            </div>
          </section>

          <Link
            href="/#contact"
            className="group mt-24 flex flex-col gap-6 rounded-2xl bg-muted/50 p-8 ring-1 ring-border transition-[translate,box-shadow] duration-500 ease-out hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-safe:hover:-translate-y-1 sm:flex-row sm:items-center sm:justify-between md:mt-32 md:p-12"
          >
            <div>
              <span className="text-muted-foreground text-sm">Have something in mind?</span>
              <span className="mt-2 block font-heading font-semibold text-3xl tracking-tight md:text-4xl">
                Let's work together
              </span>
            </div>
            <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-foreground text-background transition-transform duration-500 ease-out motion-safe:group-hover:translate-x-1 motion-safe:group-hover:-rotate-45">
              <ArrowRight aria-hidden="true" className="size-6" />
            </span>
          </Link>
        </article>
      </main>
    </div>
  );
}
