"use client";

import ProjectCard from "@/components/project-card";
import { ProjectsTable } from "@/components/projects/projects-table";
import { Suspense } from "react";
import { useTranslations } from "next-intl";
import { useProjects } from "@/hooks/use-projects";
import { ProjectMetadataType } from "@/lib/types";

// Loading skeleton for the table
function TableSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="h-16 bg-muted/50 rounded-lg animate-pulse" />
      ))}
    </div>
  );
}

// Project statistics calculation
function calculateProjectStats(projects: ProjectMetadataType[]) {
  const totalProjects = projects.length;
  const completedProjects = projects.filter(
    (p) => p.status === "Completed" || p.status === "In Production"
  ).length;
  const activeProjects = projects.filter(
    (p) => p.status === "In Development" || p.status === "Planning"
  ).length;

  // Get all unique technologies
  const allTech = projects.flatMap((p) => p.tech || []);
  const uniqueTech = [...new Set(allTech)].length;

  return {
    totalProjects,
    completedProjects,
    activeProjects,
    uniqueTech,
  };
}

export default function ProjectsPage() {
  const t = useTranslations("ProjectsPage");
  const { projects, loading, error } = useProjects();

  if (loading) {
    return (
      <div className="container max-w-5xl mx-auto pt-10 md:px-0 border-x">
        <div className="p-6 border-b">
          <div className="h-8 bg-muted/50 rounded animate-pulse mb-4" />
          <div className="h-4 bg-muted/50 rounded animate-pulse w-2/3" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-0 border-b">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="p-4">
              <div className="h-6 bg-muted/50 rounded animate-pulse mb-2" />
              <div className="h-4 bg-muted/50 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container max-w-5xl mx-auto pt-10 md:px-0 border-x">
        <div className="p-6 border-b">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground uppercase tracking-wide mb-4 font-header">
            {t("title")}
          </h1>
          <p className="text-lg text-red-500">
            Error loading projects: {error}
          </p>
        </div>
      </div>
    );
  }

  const selectedProjects = projects.filter((project) => project.selected);
  const stats = calculateProjectStats(projects);

  return (
    <div className="container max-w-5xl mx-auto pt-10 md:px-0 border-x">
      {/* Header Section */}
      <div className="max-w-5xl mx-auto">
        <div className="p-6 border-b">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground uppercase tracking-wide mb-4 font-header">
            {t("title")}
          </h1>
          <p className="text-lg text-foreground/70 max-w-2xl leading-relaxed">
            {t("description")}
          </p>
        </div>

        {/* Project Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-0 border-b">
          <div className="border-r p-4 text-center hover:bg-accent/50  border-b lg:border-b-0">
            <div className="text-2xl font-bold text-foreground mb-1">
              {stats.totalProjects}
            </div>
            <div className="text-sm text-foreground/70 uppercase tracking-wide">
              {t("statistics.totalProjects")}
            </div>
          </div>
          <div className="border-r p-4 text-center hover:bg-accent/50 border-b lg:border-b-0">
            <div className="text-2xl font-bold text-foreground mb-1">
              {stats.completedProjects}
            </div>
            <div className="text-sm text-foreground/70 uppercase tracking-wide">
              {t("statistics.completedProjects")}
            </div>
          </div>
          <div className="border-r p-4 text-center hover:bg-accent/50 border-b lg:border-b-0">
            <div className="text-2xl font-bold text-foreground mb-1">
              {stats.activeProjects}
            </div>
            <div className="text-sm text-foreground/70 uppercase tracking-wide">
              {t("statistics.activeProjects")}
            </div>
          </div>
          <div className="p-4 text-center border-r hover:bg-accent/50 lg:border-r-0">
            <div className="text-2xl font-bold text-foreground mb-1">
              {stats.uniqueTech}
            </div>
            <div className="text-sm text-foreground/70 uppercase tracking-wide">
              {t("statistics.technologies")}
            </div>
          </div>
        </div>
      </div>

      {/* Featured Projects Section */}
      {selectedProjects.length > 0 && (
        <div>
          <h3 className="uppercase text-foreground text-2xl md:text-4xl font-semibold text-center mx-auto pt-5 pb-6 font-header">
            {t("sections.featuredProjects")}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {selectedProjects.map((project) => (
              <ProjectCard
                key={project.slug}
                slug={project.slug}
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
      )}

      {/* All Projects Section */}
      <div>
        <h3 className="uppercase text-foreground text-2xl md:text-4xl font-semibold text-center mx-auto pt-5 pb-6 border-b font-header">
          {t("sections.allProjects")}
        </h3>
        <Suspense fallback={<TableSkeleton />}>
          <ProjectsTable projects={projects} />
        </Suspense>
      </div>
    </div>
  );
}
