import AboutSection from "./_components/about-section";
import HeroSection from "./_components/hero-section";
import { KpiStrip } from "./_components/kpi-strip";
import ProjectsSection from "./_components/projects-section";
import SiteHeader from "./_components/site-header";
import TechStackSection from "./_components/tech-stack-section";

export default function HomePage() {
  return (
    <div className="flex min-h-svh flex-col">
      <SiteHeader />
      <main className="flex-1">
        <HeroSection />
        <div className="mx-auto w-full max-w-6xl px-4 py-4 md:px-8">
          <KpiStrip />
        </div>
        <AboutSection />
        <ProjectsSection />
        <TechStackSection />
      </main>
    </div>
  );
}
