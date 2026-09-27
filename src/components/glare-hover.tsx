import type { CSSProperties, ReactNode } from "react";

import { cn } from "@/lib/utils";

// Adapted from React Bits GlareHover (JS-CSS): typed, Tailwind instead of the CSS file, a span so it can sit
// inside a <button>, and it fills its parent instead of fixed width/height/background/border.
type GlareHoverProps = {
  children: ReactNode;
  className?: string;
  glareColor?: string;
  glareOpacity?: number;
  glareAngle?: number;
  glareSize?: number;
  transitionDuration?: number;
  playOnce?: boolean;
};

export default function GlareHover({
  children,
  className,
  glareColor = "#ffffff",
  glareOpacity = 0.5,
  glareAngle = -45,
  glareSize = 250,
  transitionDuration = 650,
  playOnce = false,
}: GlareHoverProps) {
  const style = {
    "--gh-angle": `${glareAngle}deg`,
    "--gh-duration": `${transitionDuration}ms`,
    "--gh-size": `${glareSize}%`,
    "--gh-color": `color-mix(in srgb, ${glareColor} ${glareOpacity * 100}%, transparent)`,
  } as CSSProperties;

  return (
    <span
      style={style}
      className={cn(
        "relative block size-full overflow-hidden",
        "before:pointer-events-none before:absolute before:inset-0 before:z-10 before:content-['']",
        "before:bg-[linear-gradient(var(--gh-angle),transparent_60%,var(--gh-color)_70%,transparent,transparent_100%)]",
        "before:bg-size-[var(--gh-size)_var(--gh-size)] before:bg-position-[-100%_-100%] before:bg-no-repeat",
        "hover:before:bg-position-[100%_100%] motion-safe:before:transition-[background-position] motion-safe:before:duration-(--gh-duration) motion-safe:before:ease-out",
        playOnce && "motion-safe:before:transition-none motion-safe:hover:before:transition-[background-position]",
        className,
      )}
    >
      {children}
    </span>
  );
}
