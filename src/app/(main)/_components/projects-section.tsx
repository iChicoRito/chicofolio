import Link from "next/link";

import { ExternalLink, GitBranch, MoreVertical } from "lucide-react";

import { SimpleIcon } from "@/components/simple-icon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { projects } from "@/data/projects";

export default function ProjectsSection() {
  return (
    <section id="projects" className="scroll-mt-14 py-16 md:py-20">
      <div className="mx-auto w-full max-w-6xl px-4 md:px-8">
        <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">02 - Projects</p>
        <h2 className="font-heading mt-3 text-3xl font-semibold tracking-tight md:text-4xl">Featured work</h2>
        <p className="mt-4 max-w-2xl text-base text-muted-foreground">
          A selection of side projects and experiments built with modern tooling, from design to deployment.
        </p>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <Card key={project.id} className="relative transition-shadow group/project hover:shadow-md">
              <Link href={`/projects/${project.id}`} aria-label={project.title} className="absolute inset-0 z-0" />
              <CardContent>
                <div className="relative flex h-36 items-center justify-center overflow-hidden rounded-lg bg-muted/50">
                  {project.coverImage ? (
                    <img src={project.coverImage} alt={`${project.title} cover`} className="size-full object-cover" />
                  ) : project.bannerDark && project.bannerLight ? (
                    <>
                      <img
                        src={project.bannerDark}
                        alt={`${project.title} banner`}
                        className="size-full object-cover dark:hidden"
                      />
                      <img
                        src={project.bannerLight}
                        alt={`${project.title} banner`}
                        className="hidden size-full object-cover dark:block"
                      />
                    </>
                  ) : project.banner ? (
                    <img src={project.banner} alt={`${project.title} banner`} className="size-full object-cover" />
                  ) : (
                    <SimpleIcon icon={project.icon} className="size-12 text-muted-foreground" />
                  )}
                </div>
              </CardContent>
              <CardHeader>
                <CardTitle className="truncate text-primary">{project.title}</CardTitle>
                <CardAction>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        aria-label={`Actions for ${project.title}`}
                        className="relative z-10"
                      >
                        <MoreVertical />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-48" align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/projects/${project.id}`}>
                          <ExternalLink />
                          View project
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <a href={project.repositoryUrl} target="_blank" rel="noreferrer">
                          <GitBranch />
                          GitHub repo
                        </a>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardAction>
                <CardDescription>{project.description}</CardDescription>
                <div className="flex flex-wrap gap-2 pt-2">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
