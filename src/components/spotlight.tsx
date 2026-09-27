"use client";

import type { MouseEvent, ReactNode } from "react";

import { cn } from "@/lib/utils";

// A soft glow that follows the cursor over its children. Purely visual: it adds no interaction.
export default function Spotlight({ children, className }: { children: ReactNode; className?: string }) {
  function handleMove(e: MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
  }

  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: hover-only visual effect; links inside handle interaction
    <div onMouseMove={handleMove} className={cn("group/spot relative", className)}>
      {children}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[radial-gradient(28rem_circle_at_var(--spot-x,50%)_var(--spot-y,50%),color-mix(in_oklab,var(--color-primary)_10%,transparent),transparent_70%)] opacity-0 transition-opacity duration-500 ease-out group-hover/spot:opacity-100"
      />
    </div>
  );
}
