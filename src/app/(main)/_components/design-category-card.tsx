import Image from "next/image";
import Link from "next/link";

import { ArrowRight, ArrowUpRight } from "lucide-react";

import Spotlight from "@/components/spotlight";
import type { DesignCategory } from "@/data/design-categories";

type DesignCategoryCardProps = {
  category: DesignCategory;
  count: number;
};

export default function DesignCategoryCard({ category, count }: DesignCategoryCardProps) {
  return (
    <Spotlight className="group/card h-full rounded-2xl transition-[translate] duration-500 ease-out motion-safe:hover:-translate-y-1">
      <article className="relative flex h-full flex-col rounded-2xl bg-card p-2 ring-1 ring-border transition-[box-shadow] duration-500 ease-out hover:shadow-xl has-[a:focus-visible]:ring-2 has-[a:focus-visible]:ring-ring">
        <div className="relative aspect-square overflow-hidden rounded-xl bg-muted">
          <Image
            src={category.coverSrc}
            alt={category.coverAlt}
            fill
            sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 ease-out motion-safe:group-hover/card:scale-105"
          />
          <span
            aria-hidden="true"
            className="absolute top-3 right-3 flex size-9 items-center justify-center rounded-full bg-background/90 text-foreground opacity-0 shadow-sm backdrop-blur-sm transition-[opacity,translate] duration-300 ease-out group-hover/card:opacity-100 motion-safe:translate-y-1 motion-safe:group-hover/card:translate-y-0"
          >
            <ArrowUpRight className="size-4" />
          </span>
        </div>
        <div className="flex flex-1 flex-col px-3 pt-4 pb-2">
          <p className="text-muted-foreground text-xs">{count} designs</p>
          <h3 className="mt-2 font-heading font-semibold text-lg leading-snug tracking-tight">
            <Link href={category.href} className="relative z-10 rounded-sm focus-visible:outline-none">
              {category.title}
            </Link>
          </h3>
          <p className="mt-1.5 text-muted-foreground text-sm leading-relaxed">{category.description}</p>
          <div className="mt-auto pt-6">
            <Link
              href={category.href}
              aria-label={`View Designs: ${category.title}`}
              className="inline-flex items-center gap-1.5 rounded-sm font-medium text-sm after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-none"
            >
              View Designs
              <ArrowRight
                aria-hidden="true"
                className="size-4 transition-transform duration-300 ease-out motion-safe:group-hover/card:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </article>
    </Spotlight>
  );
}
