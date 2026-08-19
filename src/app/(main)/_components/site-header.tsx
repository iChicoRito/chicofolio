"use client";

import Link from "next/link";

import { ThemeSettings } from "./theme-settings";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 h-14 w-full border-b bg-background/80 backdrop-blur">
      <div className="flex h-full items-center justify-between gap-4 px-4 md:px-8">
        <Link href="/" className="flex min-w-0 items-center">
          <span className="truncate font-heading font-semibold">ChicoFolio</span>
        </Link>
        <ThemeSettings />
      </div>
    </header>
  );
}
