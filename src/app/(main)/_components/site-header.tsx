"use client";

import Link from "next/link";

import { Command } from "lucide-react";

import { profile } from "@/data/profile";

import { ThemeSettings } from "./theme-settings";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 h-14 w-full border-b bg-background/80 backdrop-blur">
      <div className="flex h-full items-center justify-between gap-4 px-4 md:px-8">
        <Link href="/" className="flex min-w-0 items-center gap-2">
          <div className="flex size-7 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Command className="size-4" />
          </div>
          <span className="truncate font-heading font-semibold">{profile.name}</span>
        </Link>
        <ThemeSettings />
      </div>
    </header>
  );
}
