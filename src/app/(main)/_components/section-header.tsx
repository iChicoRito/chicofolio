import type { ReactNode } from "react";

import SplitText from "@/components/split-text";

type SectionHeaderProps = {
  index: string;
  label: string;
  title: string;
  description?: string;
  aside?: ReactNode;
};

export default function SectionHeader({ index, label, title, description, aside }: SectionHeaderProps) {
  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
      <div className="max-w-3xl">
        <p className="flex items-center gap-3 text-sm">
          <span className="font-heading font-semibold text-foreground tabular-nums">{index}</span>
          <span aria-hidden="true" className="h-px w-10 bg-border" />
          <span className="text-muted-foreground">{label}</span>
        </p>
        <SplitText
          tag="h2"
          text={title}
          textAlign="left"
          splitType="words"
          delay={45}
          duration={0.9}
          from={{ opacity: 0, y: 28 }}
          className="mt-4 text-balance font-heading font-semibold text-3xl tracking-tight md:text-5xl"
        />
        {description ? (
          <p className="reveal mt-5 max-w-2xl text-muted-foreground leading-relaxed md:text-lg">{description}</p>
        ) : null}
      </div>
      {aside ? <div className="shrink-0">{aside}</div> : null}
    </div>
  );
}
