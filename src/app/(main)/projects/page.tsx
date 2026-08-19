import ProjectsSection from "../_components/projects-section";
import SiteHeader from "../_components/site-header";
import TechStackSection from "../_components/tech-stack-section";

export default function ProjectsPage() {
  return (
    <div className="flex min-h-svh flex-col">
      <SiteHeader />
      <main className="flex-1">
        <ProjectsSection />
        <TechStackSection variant="wallet" />
      </main>
    </div>
  );
}
