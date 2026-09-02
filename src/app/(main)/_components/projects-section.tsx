import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { projects } from "@/data/projects";

import DesignProjectGrid from "./design-project-grid";
import ProjectCard from "./project-card";

export default function ProjectsSection() {
  return (
    <section id="projects" className="scroll-mt-14 py-16 md:py-20">
      <div className="mx-auto w-full max-w-6xl px-4 md:px-8">
        <Tabs defaultValue="development">
          <div className="flex items-center justify-between gap-2">
            <p className="font-medium text-muted-foreground text-sm uppercase tracking-widest">02 - Projects</p>
            <TabsList aria-label="Project categories" className="ml-auto shrink-0">
              <TabsTrigger value="development">Development</TabsTrigger>
              <TabsTrigger value="design">Design</TabsTrigger>
            </TabsList>
          </div>
          <h2 className="mt-3 font-heading font-semibold text-3xl tracking-tight md:text-4xl">Featured work</h2>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground">
            A selection of side projects and experiments built with modern tooling, from design to deployment.
          </p>
          <TabsContent value="development">
            <div className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="design" className="mt-12">
            <DesignProjectGrid />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
