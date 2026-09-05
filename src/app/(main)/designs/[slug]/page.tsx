import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { designCategories } from "@/data/design-categories";
import { designProjects } from "@/data/design-projects";

import SiteHeader from "../../_components/site-header";

export function generateStaticParams() {
  return designCategories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const category = designCategories.find((item) => item.slug === slug);
  if (!category) return {};
  const title = `${category.title} — ChicoFolio`;
  return { title, description: category.description, openGraph: { title, description: category.description } };
}

export default async function DesignGalleryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = designCategories.find((item) => item.slug === slug);
  if (!category) notFound();
  const items = designProjects.filter((project) => project.category === category.slug);

  return (
    <div className="flex min-h-svh flex-col">
      <SiteHeader />
      <main id="main-content" className="flex-1">
        <section className="py-16 md:py-20">
          <div className="mx-auto w-full max-w-6xl px-4 md:px-8">
            <Button asChild variant="ghost" className="-ml-2 mb-8">
              <Link href="/#projects">
                <ArrowLeft />
                Back to designs
              </Link>
            </Button>
            <p className="font-medium text-muted-foreground text-sm uppercase tracking-widest">Designs</p>
            <h1 className="mt-3 font-heading font-semibold text-3xl tracking-tight md:text-4xl">{category.title}</h1>
            <p className="mt-4 max-w-2xl text-base text-muted-foreground">
              {category.description} · {items.length} designs
            </p>
            <div className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {items.map((project) => (
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
          </div>
        </section>
      </main>
    </div>
  );
}
