import HeroSection from "@/components/sections/hero-section";
import ProjectsSection from "@/components/sections/projects-section";
import SkillsSection from "@/components/sections/skills-section";
import TechnologiesSection from "@/components/sections/technologies-section";

export default function Home() {
  return (
    <div className="my-20 container max-w-5xl mx-auto">
      <HeroSection />
      <TechnologiesSection />
      <SkillsSection />
      <ProjectsSection />
    </div>
  );
}
