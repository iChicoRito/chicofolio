import Image from "next/image";

import type { LucideIcon } from "lucide-react";
import type { SimpleIcon as SimpleIconType } from "simple-icons";

import { SimpleIcon } from "@/components/simple-icon";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { type TechStackItem, techStackGroups } from "@/data/tech-stack";
import { cn } from "@/lib/utils";

import SectionHeader from "./section-header";

function TechIcon({ icon, color }: { icon: SimpleIconType | LucideIcon; color?: string }) {
  if ("path" in icon) {
    return <SimpleIcon icon={icon} className="size-4" style={{ fill: color ?? `#${icon.hex}` }} />;
  }
  const Icon = icon;
  return <Icon className="size-4" style={color ? { color } : undefined} />;
}

function TechLogo({ item }: { item: TechStackItem }) {
  return item.img ? (
    <Image
      src={item.img}
      alt={item.name}
      width={16}
      height={16}
      className={cn("size-4", item.darkInvert && "dark:invert")}
    />
  ) : (
    <TechIcon icon={item.icon} color={item.color} />
  );
}

function WalletTechStack() {
  return (
    <Card className="mt-12">
      <CardHeader>
        <CardTitle className="font-normal">Tech Stack</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {techStackGroups.map((group, index) => (
          <div key={group.label} className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="font-medium text-foreground text-sm">{group.label}</span>
              <span className="text-muted-foreground text-xs">{group.items.length} tools</span>
            </div>
            <div className="flex flex-col gap-4">
              {group.items.map((item) => (
                <div key={item.name} className="group flex items-center justify-between">
                  <div className="flex min-w-0 flex-col gap-0.5">
                    <span className="truncate font-medium text-foreground text-sm leading-none">{item.name}</span>
                    <span className="font-normal text-muted-foreground text-xs">{item.description}</span>
                  </div>
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-md border bg-background transition-[scale,border-color] duration-300 ease-out group-hover:border-primary/40 motion-safe:group-hover:scale-110">
                    <TechLogo item={item} />
                  </div>
                </div>
              ))}
            </div>
            {index < techStackGroups.length - 1 && <Separator />}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

interface TechStackSectionProps {
  variant?: "grid" | "wallet";
}

export default function TechStackSection({ variant = "grid" }: TechStackSectionProps) {
  return (
    <section id="tech-stack" className="scroll-mt-14 py-20 md:py-28">
      <div className="mx-auto w-full max-w-6xl px-4 md:px-8">
        <SectionHeader
          index="03"
          label="Tech Stack"
          title="Design & Development Stacks"
          description="The tools I use to design graphics, plan screens, and build apps from front to back."
        />
        {variant === "wallet" ? (
          <WalletTechStack />
        ) : (
          <div className="mt-12 flex flex-col gap-12 md:mt-16">
            {techStackGroups.map((group) => (
              <div key={group.label} className="reveal flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <h3 className="font-heading font-semibold text-foreground text-lg">{group.label}</h3>
                  <span aria-hidden="true" className="h-px flex-1 bg-border" />
                  <span className="rounded-full bg-muted px-2.5 py-0.5 text-muted-foreground text-xs tabular-nums">
                    {group.items.length} tools
                  </span>
                </div>
                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                  {group.items.map((item) => (
                    <Card
                      key={item.name}
                      size="sm"
                      className="group py-3! transition-[translate,box-shadow] duration-300 ease-out hover:shadow-md motion-safe:hover:-translate-y-0.5"
                    >
                      <CardHeader>
                        <div className="flex min-w-0 items-start gap-2">
                          <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground transition-[scale,background-color] duration-300 ease-out group-hover:bg-background group-hover:ring-1 group-hover:ring-border motion-safe:group-hover:scale-110">
                            <TechLogo item={item} />
                          </div>
                          <div className="flex min-w-0 flex-col gap-0.5">
                            <CardTitle className="truncate leading-none text-primary">{item.name}</CardTitle>
                            <CardDescription className="text-xs">{item.description}</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
