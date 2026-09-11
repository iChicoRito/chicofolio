import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

import { Button } from "@/components/ui/button";
import { uiuxProjects } from "@/data/uiux-projects";

import SiteHeader from "../../_components/site-header";

export function generateStaticParams() {
  return uiuxProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = uiuxProjects.find((item) => item.slug === slug);
  if (!project) return {};
  const title = `${project.title} — ChicoFolio`;
  return { title, description: project.description, openGraph: { title, description: project.description } };
}

export default async function UiuxProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = uiuxProjects.find((item) => item.slug === slug);
  if (!project) notFound();

  return (
    <div className="flex min-h-svh flex-col">
      <SiteHeader />
      <main id="main-content" className="flex-1">
        <section className="py-16 md:py-20">
          <div className="mx-auto w-full max-w-6xl px-4 md:px-8">
            <Button asChild variant="ghost" className="-ml-2 mb-8">
              <Link href="/#projects">
                <ArrowLeft />
                Back to projects
              </Link>
            </Button>
            <p className="font-medium text-muted-foreground text-sm uppercase tracking-widest">UIUX</p>
            <h1 className="mt-3 font-heading font-semibold text-3xl tracking-tight md:text-4xl">{project.title}</h1>
            <p className="mt-4 max-w-2xl text-base text-muted-foreground">
              {project.description} · {project.screenSrcs.length} screens
            </p>
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {project.screenSrcs.map((src, index) => (
                <div
                  key={src}
                  className="group/screen-card relative w-full overflow-hidden rounded-xl bg-card ring-1 ring-foreground/10 transition-shadow hover:shadow-md"
                >
                  <div className="relative aspect-[393/852] overflow-hidden rounded-xl bg-muted/50">
                    <Image
                      src={src}
                      loading={index < 4 ? "eager" : "lazy"}
                      alt={`${project.title} screen ${String(index + 1).padStart(2, "0")}`}
                      fill
                      sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-300 group-hover/screen-card:scale-105"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
