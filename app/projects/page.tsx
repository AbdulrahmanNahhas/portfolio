import { getAllProjects } from "@/api/get-all-projects";
import ProjectCard from "@/components/project-card";
import { ProjectsTable } from "@/components/projects/projects-table";
import { Suspense } from "react";

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

export default async function ProjectsPage() {
  const AllProjects = await getAllProjects();
  const selectedProjects = AllProjects.filter((project) => project.selected);
  // const projects = AllProjects.filter((project) => !project.selected);
  const projects = AllProjects;

  return (
    <div className="container max-w-5xl mx-auto pt-24 px-6 md:px-0">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Projects</h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          A collection of projects I&apos;ve built — each one reflecting
          creativity, problem-solving, and growth through code and design.
        </p>
      </div>

      {/* Featured Projects Section */}
      {selectedProjects.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-6">Featured</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
        <h2 className="text-2xl font-semibold mb-6">All Projects</h2>
        <Suspense fallback={<TableSkeleton />}>
          <ProjectsTable projects={projects} />
        </Suspense>
      </div>
    </div>
  );
}

export const dynamic = "force-static";
