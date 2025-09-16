import HeroSection from "@/components/sections/hero-section";
import ProjectsSection from "@/components/sections/projects-section";
import SkillsSection from "@/components/sections/skills-section";
import TechnologiesSection from "@/components/sections/technologies-section";

export default function Home() {
  return (
    <div className="pt-10 pb-0 container max-w-5xl mx-auto border-x">
      <HeroSection />
      <TechnologiesSection />
      <SkillsSection />
      <ProjectsSection />
    </div>
  );
}
