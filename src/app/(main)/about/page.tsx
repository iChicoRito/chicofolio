import Image from "next/image";
import Link from "next/link";

import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { profile } from "@/data/profile";

import SiteHeader from "../_components/site-header";

export default function AboutPage() {
  return (
    <div className="flex min-h-svh flex-col">
      <SiteHeader />
      <main id="main-content" className="flex-1">
        <section className="py-16 md:py-20">
          <div className="mx-auto w-full max-w-6xl px-4 md:px-8">
            <Button asChild variant="ghost" className="-ml-2 mb-8">
              <Link href="/">
                <ArrowLeft />
                Back
              </Link>
            </Button>
            <div className="flex flex-col gap-10 md:flex-row md:gap-16">
              <Image
                src="/assets/img/profile-photo.png"
                alt={`${profile.name} profile photo`}
                width={320}
                height={320}
                className="size-56 shrink-0 self-center rounded-[2.5rem] object-cover md:size-72 dark:hidden"
                priority
              />
              <Image
                src="/assets/img/profile-photo-1.png"
                alt={`${profile.name} profile photo`}
                width={320}
                height={320}
                className="hidden size-56 shrink-0 self-center rounded-[2.5rem] object-cover md:size-72 dark:block"
                priority
              />
              <div>
                <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">01 - About Me</p>
                <h1 className="font-heading mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
                  About {profile.name}
                </h1>
                <div className="mt-12 max-w-3xl">
                  <p className="text-muted-foreground leading-relaxed">{profile.aboutDetails}</p>
                </div>
              </div>
            </div>

            <div className="mt-16 md:mt-20">
              <h2 className="font-heading text-2xl font-semibold tracking-tight md:text-3xl">Work Experience</h2>
              <ol className="relative mt-10 ml-3 space-y-12 border-l border-border pl-6">
                {profile.experience.map((job) => (
                  <li key={job.role} className="relative">
                    <span className="absolute top-1.5 -left-[30px] size-2.5 rounded-full bg-primary" />
                    <h3 className="font-heading text-lg font-semibold">{job.role}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {job.company} | {job.period}
                    </p>
                    <ul className="mt-3 list-disc space-y-1 pl-4 text-muted-foreground">
                      {job.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ol>
            </div>

            <div className="mt-16 md:mt-20">
              <h2 className="font-heading text-2xl font-semibold tracking-tight md:text-3xl">Personal Experience</h2>
              <p className="mt-3 max-w-3xl text-muted-foreground leading-relaxed">
                Self-directed AI practice alongside formal roles — two years of learning to work with AI, not just chat
                with it.
              </p>
              <ol className="relative mt-10 ml-3 space-y-12 border-l border-border pl-6">
                {profile.personalExperience.map((item) => (
                  <li key={item.title} className="relative">
                    <span className="absolute top-1.5 -left-[30px] size-2.5 rounded-full bg-primary" />
                    <h3 className="font-heading text-lg font-semibold">{item.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {item.context} | {item.period}
                    </p>
                    <ul className="mt-3 list-disc space-y-1 pl-4 text-muted-foreground">
                      {item.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ol>
            </div>

            <div className="mt-16 md:mt-20">
              <h2 className="font-heading text-2xl font-semibold tracking-tight md:text-3xl">Education</h2>
              <ol className="relative mt-10 ml-3 space-y-12 border-l border-border pl-6">
                <li className="relative">
                  <span className="absolute top-1.5 -left-[30px] size-2.5 rounded-full bg-primary" />
                  <h3 className="font-heading text-lg font-semibold">{profile.education.degree}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{profile.education.school}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{profile.education.details}</p>
                </li>
              </ol>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
