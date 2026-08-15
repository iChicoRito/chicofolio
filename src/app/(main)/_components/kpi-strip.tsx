// ponytail: landing-local copy of analytics-kpi-strip, 3 portfolio stats (template untouched)

import { ArrowUpRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function KpiStrip() {
  return (
    <div className="overflow-hidden rounded-xl bg-card shadow-xs ring-1 ring-foreground/10">
      <div className="grid divide-y *:data-[slot=card]:rounded-none *:data-[slot=card]:ring-0 md:grid-cols-2 md:divide-x md:divide-y-0 xl:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="font-normal text-sm">Years of Experience</CardTitle>
            <CardAction>
              <Badge className="bg-green-500/10 text-green-700 dark:bg-green-500/15 dark:text-green-300">
                <ArrowUpRight />
                2020–present
              </Badge>
            </CardAction>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="text-2xl leading-none tracking-tight">5+</div>
            <div className="flex items-center gap-2 text-muted-foreground text-xs">
              <span>across design and development, end to end</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-normal text-sm">Technologies Used</CardTitle>
            <CardAction>
              <Badge className="bg-green-500/10 text-green-700 dark:bg-green-500/15 dark:text-green-300">
                <ArrowUpRight />
                and growing
              </Badge>
            </CardAction>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="text-2xl leading-none tracking-tight">12+</div>
            <div className="flex items-center gap-2 text-muted-foreground text-xs">
              <span>React, Next.js, TypeScript, Figma…</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-normal text-sm">Design & Dev Deliverables</CardTitle>
            <CardAction>
              <Badge className="bg-green-500/10 text-green-700 dark:bg-green-500/15 dark:text-green-300">
                <ArrowUpRight />
                this year
              </Badge>
            </CardAction>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="text-2xl leading-none tracking-tight">120+</div>
            <div className="flex items-center gap-2 text-muted-foreground text-xs">
              <span>UI/UX, graphic, web & mobile projects</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
