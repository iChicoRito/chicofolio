import type { CSSProperties, ReactNode } from "react";

import android from "thesvg/android";
import css3 from "thesvg/css3";
import dart from "thesvg/dart";
import expo from "thesvg/expo";
import figma from "thesvg/figma";
import flutter from "thesvg/flutter";
import gmail from "thesvg/gmail";
import google from "thesvg/google";
import groq from "thesvg/groq";
import html5 from "thesvg/html5";
import javascript from "thesvg/javascript";
import kotlin from "thesvg/kotlin";
import laravel from "thesvg/laravel";
import lottiefiles from "thesvg/lottiefiles";
import microsoftExcel from "thesvg/microsoft-excel";
import mysql from "thesvg/mysql";
import nextjs from "thesvg/nextjs";
import nodejs from "thesvg/nodejs";
import php from "thesvg/php";
import pusher from "thesvg/pusher";
import pwa from "thesvg/pwa";
import radixUi from "thesvg/radix-ui";
import react from "thesvg/react";
import reactnative from "thesvg/reactnative";
import shadcnUi from "thesvg/shadcn-ui";
import sqlite from "thesvg/sqlite";
import tailwindcss from "thesvg/tailwindcss";
import threejs from "thesvg/threejs";
import typescript from "thesvg/typescript";
import vite from "thesvg/vite";
import webgl from "thesvg/webgl";
import zod from "thesvg/zod";

import { cn } from "@/lib/utils";

type BrandIcon = { svg: string; variants: Record<string, string> };

// "mono": near-black logo drawn in the text color so it shows in dark mode.
// "invert": black-only logo with no mono variant, flipped in dark mode.
// "themed": logo ships separate light- and dark-background variants.
type StackIconEntry = { pattern: RegExp; icon: BrandIcon; mode?: "mono" | "invert" | "themed" };

// Order does not matter: matches are sorted by where they appear in the name.
// ponytail: Hive (Flutter DB) and Dexie have no icon in thesvg, so they show text only.
const entries: StackIconEntry[] = [
  { pattern: /\bFlutter\b/, icon: flutter },
  { pattern: /\bDart\b/, icon: dart },
  { pattern: /\bKotlin\b/, icon: kotlin },
  { pattern: /\bAndroid\b/, icon: android },
  { pattern: /\bTypeScript\b/, icon: typescript },
  { pattern: /\bReact Native\b/, icon: reactnative },
  { pattern: /\bReact\b(?! Native)/, icon: react },
  { pattern: /\bExpo\b/, icon: expo, mode: "mono" },
  { pattern: /\bLottie\b/, icon: lottiefiles },
  { pattern: /\bFigma\b/, icon: figma },
  { pattern: /\bGroq\b/, icon: groq },
  { pattern: /\bJavaScript\b/, icon: javascript },
  { pattern: /\bHTML\b/, icon: html5 },
  { pattern: /(?<!Tailwind )\bCSS\b/, icon: css3 },
  { pattern: /\bThree\.js\b/, icon: threejs, mode: "invert" },
  { pattern: /\bWebGL\b/, icon: webgl, mode: "themed" },
  { pattern: /\bVite\b/, icon: vite },
  { pattern: /\bNode\.js\b/, icon: nodejs },
  { pattern: /\bPHP\b/, icon: php, mode: "themed" },
  { pattern: /\bLaravel\b/, icon: laravel },
  { pattern: /\bTailwind\b/, icon: tailwindcss },
  { pattern: /\bSQLite\b/, icon: sqlite, mode: "mono" },
  { pattern: /\bMySQL\b/, icon: mysql, mode: "themed" },
  { pattern: /\bGoogle\b/, icon: google },
  { pattern: /\bGmail\b/, icon: gmail },
  { pattern: /\bExcel\b/, icon: microsoftExcel },
  { pattern: /\bPusher\b/, icon: pusher, mode: "mono" },
  { pattern: /\bNext\.js\b/, icon: nextjs, mode: "invert" },
  { pattern: /\bZod\b/, icon: zod },
  { pattern: /\bRadix\b/, icon: radixUi, mode: "mono" },
  { pattern: /\bshadcn\b/, icon: shadcnUi, mode: "mono" },
  { pattern: /\bPWA\b/, icon: pwa },
];

export function findStackIcons(name: string, limit = 3) {
  return entries
    .map((entry) => ({ entry, index: name.search(entry.pattern) }))
    .filter((match) => match.index >= 0)
    .sort((a, b) => a.index - b.index)
    .slice(0, limit)
    .map((match) => match.entry);
}

function StackIcon({ entry, className }: { entry: StackIconEntry; className?: string }) {
  if (entry.mode === "themed") {
    return (
      <>
        <StackIcon
          entry={{ ...entry, mode: undefined, icon: { ...entry.icon, svg: entry.icon.variants.light } }}
          className={cn("dark:hidden", className)}
        />
        <StackIcon
          entry={{ ...entry, mode: undefined, icon: { ...entry.icon, svg: entry.icon.variants.dark } }}
          className={cn("hidden dark:inline-flex", className)}
        />
      </>
    );
  }
  const svg = entry.mode === "mono" ? (entry.icon.variants.mono ?? entry.icon.svg) : entry.icon.svg;
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex size-4 shrink-0 [&>svg]:size-full",
        entry.mode === "mono" && "text-foreground [&>svg]:fill-current",
        entry.mode === "invert" && "dark:invert",
        className,
      )}
      // biome-ignore lint/security/noDangerouslySetInnerHtml: trusted static SVG strings from the thesvg package
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}

/** Brand icons for every known technology named in `name` (e.g. "Flutter and Dart"). Renders nothing if none match. */
export function StackIcons({ name, className, limit }: { name: string; className?: string; limit?: number }) {
  const matches = findStackIcons(name, limit);
  if (matches.length === 0) return null;
  return (
    <span className="inline-flex shrink-0 items-center gap-1">
      {matches.map((entry) => (
        <StackIcon key={entry.pattern.source} entry={entry} className={className} />
      ))}
    </span>
  );
}

/** Overlapping round chips, one per brand found in `name`; shows `fallback` in a single chip when none match. */
export function StackIconGroup({ name, fallback }: { name: string; fallback: ReactNode }) {
  const matches = findStackIcons(name);
  const chip =
    "flex size-10 items-center justify-center rounded-full bg-background ring-1 ring-border transition-transform duration-300 ease-out";
  return (
    <span className="flex shrink-0 -space-x-2.5">
      {matches.length === 0 ? (
        <span className={cn(chip, "text-muted-foreground")}>{fallback}</span>
      ) : (
        matches.map((entry, index) => (
          <span
            key={entry.pattern.source}
            className={cn(chip, "motion-safe:group-hover/tech:translate-x-(--spread)")}
            style={{ "--spread": `${index * 4}px`, zIndex: matches.length - index } as CSSProperties}
          >
            <StackIcon entry={entry} className="size-5" />
          </span>
        ))
      )}
    </span>
  );
}
