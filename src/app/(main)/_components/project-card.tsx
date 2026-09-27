import Image from "next/image";
import Link from "next/link";

import { ArrowRight, ArrowUpRight, ExternalLink } from "lucide-react";

import { SimpleIcon } from "@/components/simple-icon";
import Spotlight from "@/components/spotlight";
import { StackIcons } from "@/components/stack-icon";
import type { Project } from "@/data/projects";

type ProjectCardProps = {
  project: Project;
};

export default function ProjectCard({ project }: ProjectCardProps) {
  const imageSource = project.banner ?? project.bannerDark ?? project.bannerLight ?? project.coverImage;
  const externalAction = project.liveUrl
    ? { label: "Live demo", href: project.liveUrl }
    : { label: "Repository", href: project.repositoryUrl };

  return (
    <Spotlight className="group/card h-full rounded-2xl transition-[translate] duration-500 ease-out motion-safe:hover:-translate-y-1">
      <article className="relative flex h-full flex-col rounded-2xl bg-card p-2 ring-1 ring-border transition-[box-shadow] duration-500 ease-out hover:shadow-xl has-[a:focus-visible]:ring-2 has-[a:focus-visible]:ring-ring">
        <div className="relative flex aspect-2/1 items-center justify-center overflow-hidden rounded-xl bg-muted">
          {imageSource ? (
            <Image
              src={imageSource}
              alt=""
              fill
              sizes="(min-width: 1280px) 22rem, (min-width: 640px) calc(50vw - 2rem), calc(100vw - 2rem)"
              className="object-cover transition-transform duration-700 ease-out motion-safe:group-hover/card:scale-105"
            />
          ) : (
            <SimpleIcon icon={project.icon} className="size-12 text-muted-foreground" />
          )}
          <span
            aria-hidden="true"
            className="absolute top-3 right-3 flex size-9 items-center justify-center rounded-full bg-background/90 text-foreground opacity-0 shadow-sm backdrop-blur-sm transition-[opacity,translate] duration-300 ease-out group-hover/card:opacity-100 motion-safe:translate-y-1 motion-safe:group-hover/card:translate-y-0"
          >
            <ArrowUpRight className="size-4" />
          </span>
        </div>

        <div className="flex flex-1 flex-col px-3 pt-4 pb-2">
          <ul className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-muted-foreground text-xs">
            {project.tags.map((tag) => (
              <li key={tag} className="inline-flex items-center gap-1.5">
                <StackIcons name={tag} className="size-3.5" />
                {tag}
              </li>
            ))}
          </ul>
          <h3 className="mt-2 font-heading font-semibold text-lg tracking-tight">
            <Link
              href={`/projects/${project.id}`}
              className="rounded-sm after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-none"
            >
              {project.title}
            </Link>
          </h3>
          <p className="mt-1.5 text-muted-foreground text-sm leading-relaxed">{project.outcome}</p>

          <div className="mt-auto flex items-center justify-between gap-3 pt-6">
            <span aria-hidden="true" className="inline-flex items-center gap-1.5 font-medium text-sm">
              Read the story
              <ArrowRight className="size-4 transition-transform duration-300 ease-out motion-safe:group-hover/card:translate-x-1" />
            </span>
            <a
              href={externalAction.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${externalAction.label} for ${project.title} (opens in a new tab)`}
              className="relative z-10 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-muted-foreground text-xs ring-1 ring-border transition-colors duration-300 ease-out hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {externalAction.label}
              <ExternalLink aria-hidden="true" className="size-3.5" />
            </a>
          </div>
        </div>
      </article>
    </Spotlight>
  );
}
