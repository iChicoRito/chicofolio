"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";

import { ThemeSettings } from "./theme-settings";

export default function SiteHeader() {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:rounded-md focus:bg-background focus:px-3 focus:py-2 focus:text-sm focus:ring-2 focus:ring-ring"
      >
        Skip to main content
      </a>
      <header className="sticky top-0 z-50 h-14 w-full border-b bg-background/80 backdrop-blur">
        <div className="flex h-full items-center justify-between gap-4 px-4 md:px-8">
          <Link href="/" className="flex min-w-0 items-center">
            <span className="truncate font-heading font-semibold">ChicoFolio</span>
          </Link>
          <div className="ml-auto flex items-center gap-2">
            <Button asChild size="sm" className="hidden sm:inline-flex">
              <Link href="/#contact">Let's work together</Link>
            </Button>
            <Button asChild size="sm" variant="ghost" className="sm:hidden">
              <Link href="/#contact">Contact</Link>
            </Button>
            <ThemeSettings />
          </div>
        </div>
      </header>
    </>
  );
}
