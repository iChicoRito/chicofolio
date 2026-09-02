import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ArrowLeft, ArrowRight, Check, CheckCircle2, ExternalLink, type LucideIcon, X } from "lucide-react";
import type { Metadata } from "next";
import type { SimpleIcon as SimpleIconType } from "simple-icons";

import { SimpleIcon } from "@/components/simple-icon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { type CaseStudy, placeholderCaseStudy, projects } from "@/data/projects";

import SiteHeader from "../../_components/site-header";

type ContentSectionKey = Exclude<keyof CaseStudy, "problemNotes" | "solutionNotes" | "designPrinciples">;

const sections: { key: ContentSectionKey | "problemSolution"; label: string }[] = [
  { key: "overview", label: "Project Overview" },
  { key: "problemSolution", label: "Problem and Solution" },
  { key: "role", label: "Role & Responsibilities" },
  { key: "designProcess", label: "Design Process" },
  { key: "keyFeatures", label: "Key Features" },
  { key: "techStack", label: "Tech Stack" },
  { key: "challenges", label: "Challenges & Solutions" },
  { key: "finalProduct", label: "Final Product" },
  { key: "results", label: "Results / Outcome" },
  { key: "lessons", label: "Lessons Learned" },
];

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

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = projects.find((p) => String(p.id) === id);

  if (!project) {
    notFound();
  }

  // ponytail: shared placeholder until real case studies exist
  const caseStudy = project.caseStudy ?? placeholderCaseStudy;
  const designProcessEntries = (caseStudy.designPrinciples ?? []).map((entry, index, entries) => {
    const isAccent = index === 0 || index === entries.length - 1;

    return {
      ...entry,
      step: String(index + 1).padStart(2, "0"),
      accent: isAccent ? "bg-green-600 dark:bg-green-400" : "bg-yellow-500 dark:bg-yellow-400",
      badgeClass: isAccent
        ? "rounded-md border-green-600/50 bg-green-50 px-2.5 py-1 font-medium text-[10px] text-green-600 dark:border-green-800/50 dark:bg-green-500/10 dark:text-green-400"
        : "rounded-md border-yellow-600/50 bg-yellow-50 px-2.5 py-1 font-medium text-[10px] text-yellow-700 dark:border-yellow-800/50 dark:bg-yellow-500/10 dark:text-yellow-300",
    };
  });

  const roleParts = caseStudy.role.split("\n\n");
  const roleItems = roleParts[0]
    .split("\n")
    .map((line) => line.replace(/^-\s*/, ""))
    .filter(Boolean);
  const roleNote = roleParts[1];

  const keyFeatureBlocks = caseStudy.keyFeatures.split("\n\n").filter(Boolean);
  const keyFeatures = keyFeatureBlocks.map((block, index) => {
    const [title, ...rest] = block.split("\n");
    return { step: String(index + 1).padStart(2, "0"), title, description: rest.join(" ") };
  });

  const challengeBlocks = caseStudy.challenges.split("\n\n").filter(Boolean);
  const challenges = challengeBlocks.map((block) => {
    const [title, ...rest] = block.split("\n");
    return { title, description: rest.join(" ") };
  });

  const finalProductBlocks = caseStudy.finalProduct.split("\n\n").filter(Boolean);
  const finalProductEntries = finalProductBlocks.map((block) => {
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
  const lessonTotal = lessonGroups.reduce((total, group) => total + group.items.length, 0);

  const resultParagraphs = caseStudy.results.split("\n\n").filter(Boolean);
  const resultItems = (resultParagraphs[0] ?? "")
    .split("\n")
    .filter((line) => line.startsWith("- "))
    .map((line) => line.slice(2));
  const resultOutcomes = resultItems.filter((item) => !item.startsWith("On August 17"));

  const proofItems = [
    { label: "Role", value: project.role },
    { label: "Outcome", value: project.outcome },
    { label: "Stack", value: project.tags.join(" · ") },
  ];
  const externalAction = project.liveUrl
    ? { label: "Live demo", href: project.liveUrl }
    : { label: "View repository", href: project.repositoryUrl };

  const techStackParagraphs = caseStudy.techStack.split("\n\n");
  const techStackRows = caseStudy.techStack
    .split("\n")
    .filter((line) => line.startsWith("- "))
    .map((line) => {
      const [name, ...description] = line.slice(2).split(" — ");
      return { name, description: description.join(" — ") };
    });

  return (
    <div className="flex min-h-svh flex-col">
      <SiteHeader />
      <main id="main-content" className="flex-1">
        <section className="py-16 md:py-20">
          <div className="mx-auto w-full max-w-6xl px-4 md:px-8">
            <Button asChild variant="ghost" className="-ml-2 mb-10">
              <Link href="/#projects">
                <ArrowLeft />
                Back to projects
              </Link>
            </Button>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex min-w-0 items-center gap-4">
                <div className="flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-muted text-muted-foreground">
                  {project.id === 10 ? (
                    <>
                      <Image
                        src="/assets/icons/qyzen-dark.png"
                        alt={`${project.title} icon`}
                        width={56}
                        height={56}
                        className="size-full object-cover dark:hidden"
                      />
                      <Image
                        src="/assets/icons/qyzen-light.png"
                        alt={`${project.title} icon`}
                        width={56}
                        height={56}
                        className="hidden size-full object-cover dark:block"
                      />
                    </>
                  ) : project.image ? (
                    <Image
                      src={project.image}
                      alt={`${project.title} icon`}
                      width={56}
                      height={56}
                      className="size-full object-cover"
                    />
                  ) : (
                    <SimpleIcon icon={project.icon} className="size-7" />
                  )}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">Case Study</p>
                  <h1 className="font-heading mt-2 text-2xl font-semibold tracking-tight md:text-3xl">
                    {project.title}
                  </h1>
                </div>
              </div>
              <div className="flex shrink-0 flex-wrap gap-2">
                <Button asChild>
                  <a href={externalAction.href} target="_blank" rel="noopener noreferrer">
                    {externalAction.label}
                    <ExternalLink className="size-4" />
                  </a>
                </Button>
                {project.liveUrl ? (
                  <Button asChild variant="outline">
                    <a href={project.repositoryUrl} target="_blank" rel="noopener noreferrer">
                      View repository
                      <ExternalLink className="size-4" />
                    </a>
                  </Button>
                ) : null}
              </div>
            </div>
            <p className="mt-6 max-w-3xl text-lg text-muted-foreground">{project.description}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>

            <dl className="mt-8 grid gap-5 border-border border-y py-6 sm:grid-cols-3">
              {proofItems.map((item) => (
                <div key={item.label} className="min-w-0">
                  <dt className="font-medium text-muted-foreground text-xs uppercase tracking-widest">{item.label}</dt>
                  <dd className="mt-2 text-sm leading-relaxed">{item.value}</dd>
                </div>
              ))}
            </dl>

            <nav aria-label="Project sections" className="-mx-4 mt-8 overflow-x-auto border-border border-y md:hidden">
              <div className="flex w-max min-w-full gap-2 px-4 py-3">
                {sections.map((s, index) => (
                  <Link
                    key={s.key}
                    href={`#${s.key}`}
                    className="shrink-0 whitespace-nowrap rounded-md px-3 py-2 text-muted-foreground text-sm transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <span className="mr-2 font-medium text-primary">{String(index + 1).padStart(2, "0")}</span>
                    {s.label}
                  </Link>
                ))}
              </div>
            </nav>

            <div className="mt-16 gap-16 md:grid md:grid-cols-[240px_1fr]">
              <aside className="hidden md:block">
                <nav className="sticky top-24 flex flex-col gap-3 border-l border-border pl-6">
                  <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">On this page</p>
                  {sections.map((s, index) => (
                    <Link
                      key={s.key}
                      href={`#${s.key}`}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <span className="mr-2 font-medium text-primary">{String(index + 1).padStart(2, "0")}</span>
                      {s.label}
                    </Link>
                  ))}
                </nav>
              </aside>

              <div className="min-w-0">
                {sections.map((s, index) => (
                  <div
                    key={s.key}
                    id={s.key}
                    className="scroll-mt-24 border-t border-border py-10 first:border-0 first:pt-0"
                  >
                    <div className="flex items-baseline gap-3">
                      <span className="font-heading text-sm font-semibold text-primary">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <h2 className="font-heading text-2xl font-semibold tracking-tight">{s.label}</h2>
                    </div>
                    {s.key === "overview" ? (
                      <Card className="mt-6">
                        <CardContent>
                          <div className="relative flex h-48 items-center justify-center overflow-hidden rounded-lg bg-muted/50 md:h-64">
                            {project.bannerDark && project.bannerLight ? (
                              <>
                                <Image
                                  src={project.bannerDark}
                                  alt={`${project.title} banner`}
                                  fill
                                  sizes="(max-width: 768px) 100vw, 768px"
                                  className="size-full object-cover dark:hidden"
                                />
                                <Image
                                  src={project.bannerLight}
                                  alt={`${project.title} banner`}
                                  fill
                                  sizes="(max-width: 768px) 100vw, 768px"
                                  className="hidden size-full object-cover dark:block"
                                />
                              </>
                            ) : project.banner ? (
                              <Image
                                src={project.banner}
                                alt={`${project.title} banner`}
                                fill
                                sizes="(max-width: 768px) 100vw, 768px"
                                className="size-full object-cover"
                              />
                            ) : project.coverImage ? (
                              <Image
                                src={project.coverImage}
                                alt={`${project.title} cover`}
                                fill
                                sizes="(max-width: 768px) 100vw, 768px"
                                className="size-full object-cover"
                              />
                            ) : (
                              <OverviewIcon icon={project.icon} />
                            )}
                          </div>
                        </CardContent>
                        <CardHeader>
                          <CardTitle>Project Overview</CardTitle>
                          <CardDescription className="whitespace-pre-line">{caseStudy.overview}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div>
                            <h3 className="font-medium text-muted-foreground text-sm">Tech Stack</h3>
                            <div className="mt-3 flex flex-wrap gap-2">
                              {project.tags.map((tag) => (
                                <Badge key={tag} variant="secondary">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ) : s.key === "problemSolution" ? (
                      <div className="mt-6 grid items-stretch gap-6 md:grid-cols-2">
                        <div>
                          {caseStudy.problemNotes?.length ? (
                            <Card className="mt-3 h-full shadow-xs">
                              <CardHeader>
                                <CardTitle>Problem</CardTitle>
                              </CardHeader>
                              <CardContent className="flex flex-col gap-3">
                                {caseStudy.problemNotes.map((note) => (
                                  <div key={note.title} className="flex items-start gap-4">
                                    <X className="size-4 text-muted-foreground" />
                                    <div className="min-w-0">
                                      <div className="truncate font-medium text-sm leading-none">{note.title}</div>
                                      <div className="text-muted-foreground text-xs">{note.detail}</div>
                                    </div>
                                  </div>
                                ))}
                              </CardContent>
                            </Card>
                          ) : (
                            <p className="mt-2 whitespace-pre-line leading-relaxed text-muted-foreground">
                              {caseStudy.problem}
                            </p>
                          )}
                        </div>
                        <div>
                          {caseStudy.solutionNotes?.length ? (
                            <Card className="mt-3 h-full shadow-xs">
                              <CardHeader>
                                <CardTitle>Solution</CardTitle>
                              </CardHeader>
                              <CardContent className="flex flex-col gap-3">
                                {caseStudy.solutionNotes.map((note) => (
                                  <div key={note.title} className="flex items-start gap-4">
                                    <Check className="size-4 text-muted-foreground" />
                                    <div className="min-w-0">
                                      <div className="truncate font-medium text-sm leading-none">{note.title}</div>
                                      <div className="text-muted-foreground text-xs">{note.detail}</div>
                                    </div>
                                  </div>
                                ))}
                              </CardContent>
                            </Card>
                          ) : (
                            <p className="mt-2 whitespace-pre-line leading-relaxed text-muted-foreground">
                              {caseStudy.solution}
                            </p>
                          )}
                        </div>
                      </div>
                    ) : s.key === "role" && roleItems.length > 1 ? (
                      <div className="mt-6">
                        <ul className="grid gap-3 sm:grid-cols-2">
                          {roleItems.map((item) => (
                            <li key={item} className="flex items-start gap-3">
                              <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                              <span className="text-sm leading-relaxed text-muted-foreground">{item}</span>
                            </li>
                          ))}
                        </ul>
                        {roleNote && <p className="mt-6 max-w-3xl text-sm text-muted-foreground">{roleNote}</p>}
                      </div>
                    ) : s.key === "designProcess" && designProcessEntries.length > 0 ? (
                      <Card className="mt-6 shadow-xs">
                        <CardHeader>
                          <CardTitle className="text-sm">Design Process</CardTitle>
                          <CardAction className="flex items-center gap-1 text-muted-foreground text-xs">
                            {designProcessEntries.length} Principles <ArrowRight className="size-4" />
                          </CardAction>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-0">
                          <div className="flex flex-col divide-y divide-border">
                            {designProcessEntries.map((entry) => (
                              <div
                                key={entry.step}
                                className="grid grid-cols-1 gap-3 bg-card py-3 transition-colors hover:bg-muted/30 sm:grid-cols-[10rem_1fr_auto] sm:items-center"
                              >
                                <div className="flex gap-2">
                                  <div className={`w-1 shrink-0 rounded-md ${entry.accent}`} />
                                  <div className="text-nowrap text-xs">
                                    <div className="font-medium text-foreground">{entry.step}</div>
                                    <div className="text-muted-foreground">Principle</div>
                                  </div>
                                </div>
                                <div className="flex min-w-0 flex-col gap-1">
                                  <div className="truncate font-medium text-foreground text-sm leading-none">
                                    {entry.title}
                                  </div>
                                  <div className="truncate text-muted-foreground text-xs leading-none">
                                    {entry.detail}
                                  </div>
                                </div>
                                <Badge variant="secondary" className={`shrink-0 ${entry.badgeClass}`}>
                                  {entry.badge}
                                </Badge>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ) : s.key === "keyFeatures" && keyFeatures.length > 0 ? (
                      <div className="mt-6 grid auto-rows-fr items-stretch gap-3 sm:grid-cols-2">
                        {keyFeatures.map((feature) => (
                          <Card key={feature.step} size="sm" className="h-full">
                            <CardHeader>
                              <div className="flex min-w-0 items-start gap-2">
                                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted font-medium text-muted-foreground text-sm">
                                  {feature.step}
                                </div>
                                <div className="flex min-w-0 flex-col gap-1">
                                  <CardTitle className="truncate leading-none">{feature.title}</CardTitle>
                                  <CardDescription className="text-sm">{feature.description}</CardDescription>
                                </div>
                              </div>
                            </CardHeader>
                          </Card>
                        ))}
                      </div>
                    ) : s.key === "challenges" && challenges.length > 0 ? (
                      <div className="mt-6 grid gap-5">
                        {challenges.map((challenge) => (
                          <div key={challenge.title} className="border-primary/30 border-l-2 pl-4">
                            <h3 className="font-medium text-foreground">{challenge.title}</h3>
                            <p className="mt-1 max-w-3xl text-muted-foreground text-sm leading-relaxed">
                              {challenge.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : s.key === "finalProduct" && finalProductEntries.length > 0 ? (
                      <ol className="relative mt-6 ml-3 space-y-8 border-l border-border pl-6">
                        {finalProductEntries.map((entry, index) => (
                          <li key={entry.title} className="relative">
                            <span className="absolute top-0.5 -left-[34px] flex size-5 items-center justify-center rounded-full bg-primary font-semibold text-primary-foreground text-[9px]">
                              {String(index + 1).padStart(2, "0")}
                            </span>
                            <h3 className="font-heading text-lg font-semibold tracking-tight">{entry.title}</h3>
                            {entry.description && (
                              <p className="mt-2 max-w-3xl text-muted-foreground text-sm leading-relaxed">
                                {entry.description}
                              </p>
                            )}
                          </li>
                        ))}
                      </ol>
                    ) : s.key === "results" && resultOutcomes.length > 0 ? (
                      <div className="mt-6">
                        <Card className="h-full shadow-xs">
                          <CardHeader>
                            <CardTitle>Delivered outcomes</CardTitle>
                            <CardDescription>What the feature supports in practice</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <ul className="grid gap-3">
                              {resultOutcomes.map((item) => (
                                <li key={item} className="flex items-start gap-3">
                                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                                  <span className="text-muted-foreground text-sm leading-relaxed">{item}</span>
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>
                      </div>
                    ) : s.key === "lessons" && lessonTotal > 0 ? (
                      <Card className="mt-6 h-full">
                        <CardHeader>
                          <CardTitle className="font-normal text-muted-foreground text-sm">Lessons learned</CardTitle>
                          <CardDescription className="text-foreground text-xl tabular-nums leading-none tracking-tight">
                            {lessonTotal} takeaways
                          </CardDescription>
                          <CardAction>
                            <ArrowRight className="size-4" />
                          </CardAction>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-4">
                          <div className="flex flex-col gap-2">
                            <div
                              aria-label="Lessons learned by theme"
                              className="flex h-2 gap-1 overflow-hidden bg-muted"
                              role="img"
                            >
                              {lessonGroups.map((group, index) => (
                                <div
                                  aria-hidden="true"
                                  key={group.title}
                                  className="rounded-md"
                                  style={{
                                    backgroundColor: `var(--chart-${(index % 3) + 1})`,
                                    width: `${(group.items.length / lessonTotal) * 100}%`,
                                  }}
                                />
                              ))}
                            </div>
                            <div className="flex flex-wrap gap-4">
                              {lessonGroups.map((group, index) => (
                                <div className="flex items-center gap-1" key={group.title}>
                                  <span
                                    aria-hidden="true"
                                    className="size-2 rounded-full"
                                    style={{ backgroundColor: `var(--chart-${(index % 3) + 1})` }}
                                  />
                                  <span className="text-muted-foreground text-xs">{group.title}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <Separator />

                          <div className="grid gap-5">
                            {lessonGroups.map((group) => (
                              <div className="space-y-2" key={group.title}>
                                <div className="flex items-center justify-between gap-2">
                                  <span className="font-medium text-sm">{group.title}</span>
                                  <span className="text-muted-foreground text-xs tabular-nums">
                                    {group.items.length}
                                  </span>
                                </div>
                                <ul className="space-y-2">
                                  {group.items.map((item) => (
                                    <li
                                      className="flex items-start gap-2 text-muted-foreground text-sm leading-relaxed"
                                      key={item}
                                    >
                                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                                      <span>{item}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ) : s.key === "techStack" ? (
                      techStackRows.length > 0 ? (
                        <Card className="mt-6">
                          <CardContent className="flex flex-col gap-4">
                            <div className="divide-y">
                              {techStackRows.map((row) => (
                                <div key={row.name} className="flex min-w-0 flex-col gap-0.5 py-4 first:pt-0 last:pb-0">
                                  <span className="truncate font-medium text-foreground text-sm leading-none">
                                    {row.name}
                                  </span>
                                  <span className="font-normal text-muted-foreground text-sm">{row.description}</span>
                                </div>
                              ))}
                            </div>
                            <Separator />
                            <p className="whitespace-pre-line text-muted-foreground text-sm">
                              {techStackParagraphs[techStackParagraphs.length - 1]}
                            </p>
                          </CardContent>
                        </Card>
                      ) : (
                        <>
                          <p className="mt-4 max-w-3xl whitespace-pre-line leading-relaxed text-muted-foreground">
                            {caseStudy[s.key]}
                          </p>
                          <div className="mt-5 flex flex-wrap gap-2">
                            {project.tags.map((tag) => (
                              <Badge key={tag} variant="secondary">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </>
                      )
                    ) : (
                      <p className="mt-4 max-w-3xl whitespace-pre-line leading-relaxed text-muted-foreground">
                        {caseStudy[s.key]}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
