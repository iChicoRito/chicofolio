// ponytail: landing-local copy of analytics-kpi-strip, 3 portfolio stats (template untouched)

import { Badge } from "@/components/ui/badge";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { projects } from "@/data/projects";
import { techStackGroups } from "@/data/tech-stack";

export function KpiStrip() {
  const liveDemoCount = projects.filter((project) => project.liveUrl).length;
  const projectCount = projects.length;
  const totalTech = techStackGroups.reduce((sum, group) => sum + group.items.length, 0);

  return (
    <div className="overflow-hidden rounded-xl bg-card shadow-xs ring-1 ring-foreground/10">
      <div className="grid divide-y *:data-[slot=card]:rounded-none *:data-[slot=card]:ring-0 md:grid-cols-2 md:divide-x md:divide-y-0 xl:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="font-normal text-sm">Selected Projects</CardTitle>
            <CardAction>
              <Badge className="bg-green-500/10 text-green-700 dark:bg-green-500/15 dark:text-green-300">
                Selected work
              </Badge>
            </CardAction>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="text-2xl leading-none tracking-tight">{projectCount}</div>
            <div className="flex items-center gap-2 text-muted-foreground text-xs">
              <span>web and mobile products with case studies</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-normal text-sm">Technologies Used</CardTitle>
            <CardAction>
              <Badge className="bg-green-500/10 text-green-700 dark:bg-green-500/15 dark:text-green-300">
                Current list
              </Badge>
            </CardAction>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="text-2xl leading-none tracking-tight">{totalTech}</div>
            <div className="flex items-center gap-2 text-muted-foreground text-xs">
              <span>design, frontend, backend, and AI tools</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-normal text-sm">Live Demos</CardTitle>
            <CardAction>
              <Badge className="bg-green-500/10 text-green-700 dark:bg-green-500/15 dark:text-green-300">
                Public links
              </Badge>
            </CardAction>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="text-2xl leading-none tracking-tight">{liveDemoCount}</div>
            <div className="flex items-center gap-2 text-muted-foreground text-xs">
              <span>linked from the selected project work</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
