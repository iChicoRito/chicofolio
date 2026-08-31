"use client";

import Image from "next/image";

import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { designProjects } from "@/data/design-projects";

export default function DesignProjectGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {designProjects.map((project) => (
        <Dialog key={project.id}>
          <DialogTrigger asChild>
            <button
              type="button"
              aria-label={`Open ${project.title} fullscreen`}
              className="group/design-card relative block w-full overflow-hidden rounded-xl bg-card text-left outline-none ring-1 ring-foreground/10 transition-shadow hover:shadow-md focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              <div className="relative aspect-square overflow-hidden rounded-xl bg-muted/50">
                <Image
                  src={project.src}
                  alt={project.alt}
                  fill
                  sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-300 group-hover/design-card:scale-105"
                />
              </div>
            </button>
          </DialogTrigger>
          <DialogContent
            className="h-[calc(100svh-2rem)] max-w-none grid-rows-[1fr] overflow-hidden bg-background/95 p-2 sm:max-w-none sm:p-4"
            aria-describedby={undefined}
          >
            <DialogTitle className="sr-only">{project.title}</DialogTitle>
            <div className="relative size-full min-h-0">
              <Image src={project.src} alt={project.alt} fill sizes="100vw" className="object-contain" />
            </div>
          </DialogContent>
        </Dialog>
      ))}
    </div>
  );
}
