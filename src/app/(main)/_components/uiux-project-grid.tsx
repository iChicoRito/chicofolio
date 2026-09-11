import { uiuxProjects } from "@/data/uiux-projects";

import UiuxProjectCard from "./uiux-project-card";

export default function UiuxProjectGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {uiuxProjects.map((project) => (
        <UiuxProjectCard key={project.slug} project={project} />
      ))}
    </div>
  );
}
