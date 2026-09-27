import type { ReactNode } from "react";

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  ExternalLink,
  Layers,
  type LucideIcon,
  Target,
  UserRound,
  Wrench,
  X,
} from "lucide-react";
import type { Metadata } from "next";
import type { SimpleIcon as SimpleIconType } from "simple-icons";

import { SimpleIcon } from "@/components/simple-icon";
import SplitText from "@/components/split-text";
import { StackIconGroup, StackIcons } from "@/components/stack-icon";
import TiltedCard from "@/components/tilted-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { type CaseStudy, type Project, placeholderCaseStudy, projects } from "@/data/projects";

import SiteHeader from "../../_components/site-header";
import SectionNav from "./_components/section-nav";

type ContentSectionKey = Exclude<keyof CaseStudy, "problemNotes" | "solutionNotes" | "designPrinciples">;

const sections: { key: ContentSectionKey | "problemSolution"; label: string }[] = [
  { key: "overview", label: "What it is" },
  { key: "problemSolution", label: "The problem and the fix" },
  { key: "role", label: "What I did" },
  { key: "designProcess", label: "How I designed it" },
  { key: "keyFeatures", label: "Main features" },
  { key: "techStack", label: "Tech Stack" },
  { key: "challenges", label: "Hard parts and how I solved them" },
  { key: "finalProduct", label: "How it works" },
  { key: "results", label: "Results" },
  { key: "lessons", label: "What I learned" },
];

// One group spans the full width (its list splits into two columns); two or three groups sit side by side.
const lessonGridCols = ["", "md:grid-cols-2", "md:grid-cols-3"];
const panel = "rounded-2xl bg-muted/50 p-6 md:p-8";
const bodyText = "text-muted-foreground leading-relaxed";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const project = projects.find((item) => String(item.id) === id);

  if (!project) {
    return {};
  }

  const title = `${project.title} — ChicoFolio`;

  return {
    title,
    description: project.description,
    openGraph: {
      title,
      description: project.description,
      type: "article",
      images: project.banner ? [{ url: project.banner, alt: `${project.title} banner` }] : undefined,
    },
  };
}

export function generateStaticParams() {
  return projects.map((project) => ({ id: String(project.id) }));
}

function OverviewIcon({ icon }: { icon: SimpleIconType | LucideIcon }) {
  if ("path" in icon) {
    return <SimpleIcon icon={icon} className="size-12 text-muted-foreground" />;
  }
  const Icon = icon;
  return <Icon className="size-12 text-muted-foreground" />;
}

function ProjectBanner({ project, sizes, className }: { project: Project; sizes: string; className?: string }) {
  if (project.bannerDark && project.bannerLight) {
    return (
      <>
        <Image
          src={project.bannerDark}
          alt={`${project.title} banner`}
          fill
          sizes={sizes}
          className={`object-cover dark:hidden ${className ?? ""}`}
        />
        <Image
          src={project.bannerLight}
          alt={`${project.title} banner`}
          fill
          sizes={sizes}
          className={`hidden object-cover dark:block ${className ?? ""}`}
        />
      </>
    );
  }
  const src = project.banner ?? project.coverImage;
  if (!src && project.image) {
    return (
      <>
        <Image
          src={project.image}
          alt=""
          fill
          sizes="160px"
          className={`object-contain p-[18%] ${project.imageDark ? "dark:hidden" : ""}`}
        />
        {project.imageDark ? (
          <Image
            src={project.imageDark}
            alt=""
            fill
            sizes="160px"
            className="hidden object-contain p-[18%] dark:block"
          />
        ) : null}
      </>
    );
  }
  if (!src) return <OverviewIcon icon={project.icon} />;
  return (
    <Image src={src} alt={`${project.title} banner`} fill sizes={sizes} className={`object-cover ${className ?? ""}`} />
  );
}

function Rows({ rows }: { rows: { label: string; text: string }[] }) {
  return (
    <dl className="divide-y divide-border border-border border-y">
      {rows.map((row) => (
        <div key={row.label} className="grid gap-1 py-5 sm:grid-cols-[minmax(0,15rem)_1fr] sm:gap-10">
          <dt className="font-medium text-foreground">{row.label}</dt>
          <dd className={`${bodyText} first-letter:uppercase`}>{row.text}</dd>
        </div>
      ))}
    </dl>
  );
}

function Paragraphs({ text }: { text: string }) {
  return <p className={`max-w-prose whitespace-pre-line ${bodyText}`}>{text}</p>;
}

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = projects.find((p) => String(p.id) === id);

  if (!project) {
    notFound();
  }

  const nextProject = projects[(projects.indexOf(project) + 1) % projects.length];

  // ponytail: shared placeholder until real case studies exist
  const caseStudy = project.caseStudy ?? placeholderCaseStudy;
  const designPrinciples = caseStudy.designPrinciples ?? [];

  const [overviewLead, ...overviewRest] = caseStudy.overview.split("\n\n");

  const roleParts = caseStudy.role.split("\n\n");
  const roleItems = roleParts[0]
    .split("\n")
    .map((line) => line.replace(/^-\s*/, ""))
    .filter(Boolean);
  const roleNote = roleParts[1];

  const keyFeatures = caseStudy.keyFeatures
    .split("\n\n")
    .filter(Boolean)
    .map((block) => {
      const [title, ...rest] = block.split("\n");
      return { title, description: rest.join(" ") };
    });

  const challenges = caseStudy.challenges
    .split("\n\n")
    .filter(Boolean)
    .map((block) => {
      const [title, ...rest] = block.split("\n");
      return { label: title, text: rest.join(" ") };
    });

  const finalProductEntries = caseStudy.finalProduct
    .split("\n\n")
    .filter(Boolean)
    .map((block) => {
      const match = block.match(/^(.+?[.!?])(?:\s+|$)([\s\S]*)$/);
      return { title: match?.[1] ?? block, description: match?.[2] ?? "" };
    });

  const lessonGroups = caseStudy.lessons
    .split("\n\n")
    .filter(Boolean)
    .map((block) => {
      const [title, ...rest] = block.split("\n");
      return { title, items: rest.map((line) => line.replace(/^-\s*/, "")).filter(Boolean) };
    });

  const resultOutcomes = (caseStudy.results.split("\n\n")[0] ?? "")
    .split("\n")
    .filter((line) => line.startsWith("- "))
    .map((line) => line.slice(2))
    .filter((item) => !item.startsWith("On August 17"));

  const techStackParagraphs = caseStudy.techStack.split("\n\n");
  const techStackRows = caseStudy.techStack
    .split("\n")
    .filter((line) => line.startsWith("- "))
    .map((line) => {
      const [name, ...description] = line.slice(2).split(" — ");
      return { label: name, text: description.join(" — ") };
    });

  const proofItems: { label: string; Icon: LucideIcon; value: ReactNode }[] = [
    { label: "Role", Icon: UserRound, value: project.role },
    { label: "Outcome", Icon: Target, value: project.outcome },
    {
      label: "Stack",
      Icon: Layers,
      value: (
        <span className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-2 rounded-full bg-background py-1.5 pr-3.5 pl-2.5 font-medium text-sm ring-1 ring-border"
            >
              <StackIcons name={tag} className="size-4" />
              {tag}
            </span>
          ))}
        </span>
      ),
    },
  ];
  const externalHref = project.liveUrl ?? project.repositoryUrl;
  const externalLabel = project.liveUrl ? "Live demo" : "View repository";
  const hasBanner = Boolean(project.banner || project.bannerDark || project.coverImage);

  const content: Partial<Record<(typeof sections)[number]["key"], ReactNode>> = {
    overview: (
      <div className="flex max-w-prose flex-col gap-4">
        <p className="text-foreground text-lg leading-relaxed md:text-xl">{overviewLead}</p>
        {overviewRest.map((paragraph) => (
          <p key={paragraph} className={bodyText}>
            {paragraph}
          </p>
        ))}
      </div>
    ),
    problemSolution:
      caseStudy.problemNotes?.length && caseStudy.solutionNotes?.length ? (
        <div className="grid gap-4 md:grid-cols-2">
          {[
            { label: "The problem", notes: caseStudy.problemNotes, Icon: X, iconClass: "text-muted-foreground" },
            { label: "The fix", notes: caseStudy.solutionNotes, Icon: Check, iconClass: "text-primary" },
          ].map(({ label, notes, Icon, iconClass }) => (
            <div key={label} className={panel}>
              <h3 className="font-heading font-semibold text-lg">{label}</h3>
              <ul className="mt-5 flex flex-col gap-4">
                {notes.map((note) => (
                  <li key={note.title} className="flex gap-3">
                    <Icon aria-hidden="true" className={`mt-0.5 size-4 shrink-0 ${iconClass}`} />
                    <div>
                      <p className="font-medium text-foreground text-sm">{note.title}</p>
                      <p className="mt-0.5 text-muted-foreground text-sm">{note.detail}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <Paragraphs text={caseStudy.problem} />
          <Paragraphs text={caseStudy.solution} />
        </div>
      ),
    role:
      roleItems.length > 1 ? (
        <div>
          <ul className="grid gap-x-10 gap-y-4 sm:grid-cols-2">
            {roleItems.map((item) => (
              <li key={item} className="flex gap-3">
                <CheckCircle2 aria-hidden="true" className="mt-1 size-4 shrink-0 text-primary" />
                <span className={bodyText}>{item}</span>
              </li>
            ))}
          </ul>
          {roleNote && <p className="mt-8 max-w-prose text-muted-foreground text-sm">{roleNote}</p>}
        </div>
      ) : (
        <Paragraphs text={caseStudy.role} />
      ),
    designProcess:
      designPrinciples.length > 0 ? (
        <ol className="divide-y divide-border border-border border-y">
          {designPrinciples.map((entry, index) => (
            <li key={entry.title} className="grid gap-2 py-5 sm:grid-cols-[2.5rem_1fr_auto] sm:items-start sm:gap-6">
              <span className="font-heading text-muted-foreground text-sm tabular-nums">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <p className="font-medium text-foreground">{entry.title}</p>
                <p className="mt-1 text-muted-foreground text-sm leading-relaxed">{entry.detail}</p>
              </div>
              <Badge variant="outline" className="w-fit">
                {entry.badge}
              </Badge>
            </li>
          ))}
        </ol>
      ) : (
        <Paragraphs text={caseStudy.designProcess} />
      ),
    keyFeatures:
      keyFeatures.length > 1 ? (
        <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
          {keyFeatures.map((feature) => (
            <div key={feature.title} className="border-border border-t pt-5">
              <h3 className="font-medium text-foreground">{feature.title}</h3>
              <p className="mt-2 text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <Paragraphs text={caseStudy.keyFeatures} />
      ),
    techStack:
      techStackRows.length > 0 ? (
        <div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {techStackRows.map((row) => (
              <li
                key={row.label}
                className="group/tech flex gap-4 rounded-2xl bg-card p-4 ring-1 ring-border transition-[background-color,box-shadow] duration-300 ease-out hover:bg-muted/40 hover:shadow-sm md:p-5"
              >
                <StackIconGroup name={row.label} fallback={<Wrench aria-hidden="true" className="size-4.5" />} />
                <div className="min-w-0">
                  <p className="font-medium text-foreground leading-snug">{row.label}</p>
                  <p className="mt-1 text-muted-foreground text-sm leading-relaxed first-letter:uppercase">
                    {row.text}
                  </p>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-5 max-w-prose text-muted-foreground text-sm">
            {techStackParagraphs[techStackParagraphs.length - 1]}
          </p>
        </div>
      ) : (
        <div>
          <Paragraphs text={caseStudy.techStack} />
          <div className="mt-5 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      ),
    challenges: challenges.length > 1 ? <Rows rows={challenges} /> : <Paragraphs text={caseStudy.challenges} />,
    finalProduct:
      finalProductEntries.length > 1 ? (
        <ol className="flex max-w-prose flex-col">
          {finalProductEntries.map((entry, index) => (
            <li
              key={entry.title}
              className="relative pb-10 pl-12 before:absolute before:top-8 before:bottom-0 before:left-3.5 before:w-px before:bg-border last:pb-0 last:before:hidden"
            >
              <span className="absolute top-0 left-0 flex size-7 items-center justify-center rounded-full border border-border bg-background font-medium text-foreground text-xs tabular-nums">
                {index + 1}
              </span>
              <h3 className="font-medium text-foreground leading-7">{entry.title}</h3>
              {entry.description && (
                <p className="mt-2 text-muted-foreground text-sm leading-relaxed">{entry.description}</p>
              )}
            </li>
          ))}
        </ol>
      ) : (
        <Paragraphs text={caseStudy.finalProduct} />
      ),
    results:
      resultOutcomes.length > 0 ? (
        <div className={panel}>
          <ul className="flex flex-col gap-4">
            {resultOutcomes.map((item) => (
              <li key={item} className="flex gap-3">
                <CheckCircle2 aria-hidden="true" className="mt-1 size-4 shrink-0 text-primary" />
                <span className="text-foreground/80 leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <Paragraphs text={caseStudy.results} />
      ),
    lessons: lessonGroups.some((group) => group.items.length > 0) ? (
      <div className={`grid gap-10 md:gap-8 ${lessonGridCols[Math.min(lessonGroups.length, 3) - 1]}`}>
        {lessonGroups.map((group) => (
          <div key={group.title}>
            <h3 className="border-border border-b pb-3 font-heading font-semibold">{group.title}</h3>
            <ul className={`mt-4 grid gap-3 ${lessonGroups.length === 1 ? "sm:grid-cols-2 sm:gap-x-10" : ""}`}>
              {group.items.map((item) => (
                <li key={item} className="flex gap-3 text-muted-foreground text-sm leading-relaxed">
                  <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    ) : (
      <Paragraphs text={caseStudy.lessons} />
    ),
  };

  return (
    <div className="flex min-h-svh flex-col">
      <SiteHeader />
      <main id="main-content" className="flex-1">
        <article className="mx-auto w-full max-w-6xl px-4 pt-12 pb-20 md:px-8 md:pt-16 md:pb-28">
          <Button asChild variant="ghost" className="group/back -ml-2">
            <Link href="/#projects">
              <ArrowLeft className="transition-transform duration-300 ease-out motion-safe:group-hover/back:-translate-x-1" />
              Back to projects
            </Link>
          </Button>

          <header className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8 md:gap-10">
            <TiltedCard
              className="size-24 shrink-0 sm:size-40 md:size-44"
              glareClassName="flex items-center justify-center rounded-[1.75rem] bg-muted text-muted-foreground ring-1 ring-border md:rounded-[2.25rem]"
              scaleOnHover={1.06}
              rotateAmplitude={14}
            >
              {project.id === 10 ? (
                <>
                  <Image
                    src="/assets/icons/qyzen-dark.png"
                    alt={`${project.title} icon`}
                    width={160}
                    height={160}
                    className="absolute inset-0 size-full object-cover dark:hidden"
                  />
                  <Image
                    src="/assets/icons/qyzen-light.png"
                    alt={`${project.title} icon`}
                    width={160}
                    height={160}
                    className="absolute inset-0 hidden size-full object-cover dark:block"
                  />
                </>
              ) : project.image ? (
                <Image
                  src={project.image}
                  alt={`${project.title} icon`}
                  width={160}
                  height={160}
                  className={`absolute inset-0 size-full object-cover ${project.imageDark ? "dark:hidden" : ""}`}
                />
              ) : (
                <SimpleIcon icon={project.icon} className="size-12 md:size-16" />
              )}
              {project.image && project.imageDark && project.id !== 10 ? (
                <Image
                  src={project.imageDark}
                  alt={`${project.title} icon`}
                  width={160}
                  height={160}
                  className="absolute inset-0 hidden size-full object-cover dark:block"
                />
              ) : null}
            </TiltedCard>
            <div className="flex min-w-0 flex-col sm:min-h-40 sm:justify-between md:min-h-44">
              <SplitText
                tag="h1"
                text={project.title}
                textAlign="left"
                delay={30}
                duration={0.9}
                rootMargin="0px"
                className="text-balance font-heading font-semibold text-4xl leading-none tracking-tight sm:text-3xl md:text-4xl lg:text-5xl"
              />
              <p className="mt-3 max-w-2xl text-lg text-muted-foreground leading-relaxed sm:text-base md:text-lg">
                {project.description}
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                {externalHref ? (
                  <Button asChild size="lg">
                    <a href={externalHref} target="_blank" rel="noopener noreferrer">
                      {externalLabel}
                      <ExternalLink />
                    </a>
                  </Button>
                ) : null}
                {project.liveUrl && project.repositoryUrl ? (
                  <Button asChild size="lg" variant="outline">
                    <a href={project.repositoryUrl} target="_blank" rel="noopener noreferrer">
                      View repository
                      <ExternalLink />
                    </a>
                  </Button>
                ) : null}
              </div>
            </div>
          </header>

          <dl className="mt-14 grid divide-y divide-border rounded-2xl bg-muted/30 ring-1 ring-border md:grid-cols-[1fr_1.35fr_1.15fr] md:divide-x md:divide-y-0">
            {proofItems.map(({ label, Icon, value }) => (
              <div
                key={label}
                className="group/proof min-w-0 p-5 transition-colors duration-300 ease-out first:rounded-t-2xl last:rounded-b-2xl hover:bg-muted/50 md:p-6 md:first:rounded-l-2xl md:first:rounded-tr-none md:last:rounded-r-2xl md:last:rounded-bl-none"
              >
                <dt className="flex items-center gap-2 text-muted-foreground text-sm">
                  <Icon
                    aria-hidden="true"
                    className="size-4 transition-colors duration-300 ease-out group-hover/proof:text-foreground"
                  />
                  {label}
                </dt>
                <dd className="mt-3 text-foreground leading-relaxed">{value}</dd>
              </div>
            ))}
          </dl>

          {hasBanner ? (
            <div className="group/banner relative mt-10 flex aspect-2/1 items-center justify-center overflow-hidden rounded-2xl bg-muted/50 ring-1 ring-border">
              <ProjectBanner
                project={project}
                sizes="(min-width: 1152px) 1088px, 100vw"
                className="transition-transform duration-700 ease-out motion-safe:group-hover/banner:scale-[1.02]"
              />
            </div>
          ) : null}

          <nav aria-label="Project sections" className="-mx-4 mt-12 overflow-x-auto border-border border-y md:hidden">
            <div className="flex w-max gap-1 px-4 py-2">
              {sections.map((s) => (
                <Link
                  key={s.key}
                  href={`#${s.key}`}
                  className="shrink-0 whitespace-nowrap rounded-md px-3 py-2 text-muted-foreground text-sm transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {s.label}
                </Link>
              ))}
            </div>
          </nav>

          <div className="mt-12 md:mt-20 md:grid md:grid-cols-[13rem_minmax(0,1fr)] md:gap-16 lg:gap-20">
            <aside className="hidden md:block">
              <SectionNav sections={sections} />
            </aside>

            <div className="min-w-0">
              {sections.map((s) => (
                <section key={s.key} id={s.key} className="scroll-mt-24 py-12 first:pt-0 md:py-16">
                  <SplitText
                    tag="h2"
                    text={s.label}
                    textAlign="left"
                    splitType="words"
                    delay={60}
                    duration={0.8}
                    from={{ opacity: 0, y: 24 }}
                    className="font-heading font-semibold text-2xl tracking-tight md:text-3xl"
                  />
                  <div className="mt-6 md:mt-8">{content[s.key]}</div>
                </section>
              ))}
            </div>
          </div>

          <Link
            href={`/projects/${nextProject.id}`}
            className="group mt-16 grid overflow-hidden rounded-2xl bg-muted/50 ring-1 ring-border transition-shadow duration-300 ease-out hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:mt-24 md:grid-cols-[1fr_1.1fr]"
          >
            <div className="flex flex-col justify-center gap-3 p-6 md:p-10">
              <span className="text-muted-foreground text-sm">Next project</span>
              <span className="font-heading font-semibold text-2xl tracking-tight md:text-3xl">
                {nextProject.title}
              </span>
              <span className="line-clamp-2 text-muted-foreground leading-relaxed">{nextProject.description}</span>
              <span className="mt-2 inline-flex items-center gap-2 font-medium text-foreground text-sm">
                Read the story
                <ArrowRight
                  aria-hidden="true"
                  className="size-4 transition-transform duration-300 ease-out motion-safe:group-hover:translate-x-1"
                />
              </span>
            </div>
            <div className="relative flex aspect-2/1 items-center justify-center overflow-hidden bg-muted">
              <ProjectBanner
                project={nextProject}
                sizes="(min-width: 768px) 560px, 100vw"
                className="transition-transform duration-700 ease-out motion-safe:group-hover:scale-105"
              />
            </div>
          </Link>
        </article>
      </main>
    </div>
  );
}
