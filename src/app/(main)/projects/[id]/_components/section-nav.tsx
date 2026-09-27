"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

type SectionNavProps = {
  sections: { key: string; label: string }[];
};

// Highlights the section currently in the upper part of the screen.
export default function SectionNav({ sections }: SectionNavProps) {
  const [active, setActive] = useState(sections[0]?.key);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-20% 0px -70% 0px" },
    );
    for (const { key } of sections) {
      const el = document.getElementById(key);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [sections]);

  return (
    <nav aria-label="Project sections" className="sticky top-24 flex flex-col">
      <p className="mb-3 font-medium text-foreground text-sm">On this page</p>
      <ul className="flex flex-col border-border border-l">
        {sections.map((s) => (
          <li key={s.key}>
            <a
              href={`#${s.key}`}
              aria-current={active === s.key ? "true" : undefined}
              className={cn(
                "-ml-px block border-l py-1.5 pl-4 text-sm transition-colors duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                active === s.key
                  ? "border-foreground font-medium text-foreground"
                  : "border-transparent text-muted-foreground hover:border-muted-foreground/50 hover:text-foreground",
              )}
            >
              {s.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
