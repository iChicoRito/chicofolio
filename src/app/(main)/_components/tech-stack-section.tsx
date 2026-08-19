import type { LucideIcon } from "lucide-react";
import type { SimpleIcon as SimpleIconType } from "simple-icons";

import { SimpleIcon } from "@/components/simple-icon";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { type TechStackItem, techStackGroups } from "@/data/tech-stack";
import { cn } from "@/lib/utils";

function TechIcon({ icon, color }: { icon: SimpleIconType | LucideIcon; color?: string }) {
  if ("path" in icon) {
    return <SimpleIcon icon={icon} className="size-4" style={{ fill: color ?? `#${icon.hex}` }} />;
  }
  const Icon = icon;
  return <Icon className="size-4" style={color ? { color } : undefined} />;
}

function TechLogo({ item }: { item: TechStackItem }) {
  return item.img ? (
    <img src={item.img} alt={item.name} className={cn("size-4", item.darkInvert && "dark:invert")} />
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
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex min-w-0 flex-col gap-0.5">
                    <span className="truncate font-medium text-foreground text-sm leading-none">{item.name}</span>
                    <span className="font-normal text-muted-foreground text-xs">{item.description}</span>
                  </div>
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-md border bg-background">
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
    <section id="tech-stack" className="scroll-mt-14 py-16 md:py-20">
      <div className="mx-auto w-full max-w-6xl px-4 md:px-8">
        <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">03 - Tech Stack</p>
        <h2 className="font-heading mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
          Design & Development Stacks
        </h2>
        <p className="mt-4 max-w-2xl text-base text-muted-foreground">
          The tools and technologies I use across graphic design, UI/UX, and full-stack development.
        </p>
        {variant === "wallet" ? (
          <WalletTechStack />
        ) : (
          <div className="mt-12 flex flex-col gap-8">
            {techStackGroups.map((group) => (
              <div key={group.label} className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-heading font-medium text-foreground text-lg">{group.label}</h3>
                  <span className="text-muted-foreground text-xs">{group.items.length} tools</span>
                </div>
                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                  {group.items.map((item) => (
                    <Card key={item.name} size="sm" className="py-3!">
                      <CardHeader>
                        <div className="flex min-w-0 items-start gap-2">
                          <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
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
