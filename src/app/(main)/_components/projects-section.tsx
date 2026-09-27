import type { CSSProperties } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { projects } from "@/data/projects";

import DesignProjectGrid from "./design-project-grid";
import ProjectCard from "./project-card";
import SectionHeader from "./section-header";
import UiuxProjectGrid from "./uiux-project-grid";

const tabContentMotion =
  "mt-12 motion-safe:data-[state=active]:animate-in motion-safe:data-[state=active]:fade-in-0 motion-safe:data-[state=active]:slide-in-from-bottom-3 motion-safe:data-[state=active]:duration-500";

export default function ProjectsSection() {
  return (
    <section id="projects" className="scroll-mt-14 py-20 md:py-28">
      <div className="mx-auto w-full max-w-6xl px-4 md:px-8">
        <Tabs defaultValue="development">
          <SectionHeader
            index="02"
            label="Projects"
            title="Featured work"
            description="Apps and websites I designed and built, from the first idea to launch."
            aside={
              <TabsList aria-label="Project categories">
                <TabsTrigger value="development">Development</TabsTrigger>
                <TabsTrigger value="design">Design</TabsTrigger>
                <TabsTrigger value="uiux">UIUX</TabsTrigger>
              </TabsList>
            }
          />
          <TabsContent value="development" className={tabContentMotion}>
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {projects.map((project, index) => (
                <div key={project.id} className="reveal" style={{ "--reveal-i": index % 3 } as CSSProperties}>
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="design" className={tabContentMotion}>
            <DesignProjectGrid />
          </TabsContent>
          <TabsContent value="uiux" className={tabContentMotion}>
            <UiuxProjectGrid />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
