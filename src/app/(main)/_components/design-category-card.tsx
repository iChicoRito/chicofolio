import Image from "next/image";
import Link from "next/link";

import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card";
import type { DesignCategory } from "@/data/design-categories";

type DesignCategoryCardProps = {
  category: DesignCategory;
  count: number;
};

export default function DesignCategoryCard({ category, count }: DesignCategoryCardProps) {
  return (
    <Card className="flex h-full flex-col overflow-hidden transition-shadow hover:shadow-md">
      <CardContent className="p-0">
        <div className="relative aspect-square overflow-hidden bg-muted/50">
          <Image
            src={category.coverSrc}
            alt={category.coverAlt}
            fill
            sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </CardContent>
      <CardHeader className="flex-1">
        <h3 className="font-heading font-medium text-base leading-snug">
          <Link
            href={category.href}
            className="underline-offset-4 hover:underline focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {category.title}
          </Link>
        </h3>
        <CardDescription className="leading-relaxed">
          {category.description} · {count} designs
        </CardDescription>
      </CardHeader>
      <CardFooter className="border-t-0 bg-transparent pt-0">
        <Button asChild size="sm">
          <Link href={category.href} aria-label={`View Designs: ${category.title}`}>
            View Designs
            <ArrowRight aria-hidden="true" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
