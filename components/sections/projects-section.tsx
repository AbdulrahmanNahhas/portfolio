"use client";

import ProjectCard from "@/components/project-card";
import { useTranslations } from "next-intl";
import { useProjects } from "@/hooks/use-projects";

const ProjectsSection = () => {
  const t = useTranslations("ProjectsPage");
  const { projects, loading, error } = useProjects();

  if (loading) {
    return (
      <section className="pt-5 border-t px-0">
        <div className="flex flex-col gap-4">
          <div className="h-12 bg-muted/50 rounded animate-pulse" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="h-32 bg-muted/50 rounded animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return null; // Don't show error in home page section
  }

  const featuredProjects = projects.filter((project) => project.selected);

  if (featuredProjects.length === 0) {
    return null;
  }

  return (
    <section className="pt-5 border-t px-0">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col lg:flex-row items-center lg:items-center justify-between gap-4 pb-3">
          <h3 className="uppercase text-foreground text-3xl md:text-5xl font-semibold text-center mx-auto font-header">
            {t("sections.featuredProjects")}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {featuredProjects.map((project) => (
            <ProjectCard
              key={project.slug}
              slug={project.slug}
              color={project.color}
              title={project.title}
              description={project.description}
              icon={project.icon}
              image={project.cover[0]}
              iconSize={project.iconSize}
              category={project.category}
              tech={project.tech}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
