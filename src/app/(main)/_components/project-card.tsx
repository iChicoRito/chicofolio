import Image from "next/image";
import Link from "next/link";

import { ArrowUpRight, ExternalLink } from "lucide-react";

import { SimpleIcon } from "@/components/simple-icon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import type { Project } from "@/data/projects";

type ProjectCardProps = {
  project: Project;
};

export default function ProjectCard({ project }: ProjectCardProps) {
  const imageSource = project.banner ?? project.bannerDark ?? project.bannerLight ?? project.coverImage;
  const externalAction = project.liveUrl
    ? { label: "Live demo", href: project.liveUrl }
    : { label: "View repository", href: project.repositoryUrl };

  return (
    <Card className="flex h-full flex-col transition-shadow hover:shadow-md">
      <CardContent>
        <div className="relative flex h-36 items-center justify-center overflow-hidden rounded-lg bg-muted/50">
          {imageSource ? (
            <Image
              src={imageSource}
              alt={`${project.title} banner`}
              fill
              sizes="(min-width: 1280px) 22rem, (min-width: 640px) calc(50vw - 2rem), calc(100vw - 2rem)"
              className="object-cover"
            />
          ) : (
            <SimpleIcon icon={project.icon} className="size-12 text-muted-foreground" />
          )}
        </div>
      </CardContent>
      <CardHeader className="flex-1">
        <CardTitle className="text-primary">
          <Link
            href={`/projects/${project.id}`}
            className="underline-offset-4 hover:underline focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {project.title}
          </Link>
        </CardTitle>
        <CardDescription className="leading-relaxed">{project.outcome}</CardDescription>
        <div className="space-y-1 pt-2">
          <p className="font-medium text-muted-foreground text-xs uppercase tracking-wider">Role</p>
          <p className="text-muted-foreground text-sm">{project.role}</p>
        </div>
        <div className="flex flex-wrap gap-2 pt-2">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </CardHeader>
      <CardFooter className="flex flex-wrap gap-2 border-t-0 bg-transparent pt-0">
        <Button asChild size="sm">
          <Link href={`/projects/${project.id}`}>
            Case study
            <ArrowUpRight aria-hidden="true" />
          </Link>
        </Button>
        <Button asChild size="sm" variant="outline">
          <a href={externalAction.href} target="_blank" rel="noopener noreferrer">
            {externalAction.label}
            <ExternalLink aria-hidden="true" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}
