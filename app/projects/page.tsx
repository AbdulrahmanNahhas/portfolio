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
    <div className="md:container bg-transparent flex flex-col gap-6 !max-w-5xl mx-auto py-26">
      {/* Header Section */}
      <div className="pb-0 flex flex-col gap-4 px-6 lg:px-0">
        <h1 className="font-semibold text-3xl">My Projects</h1>
        <p className="md:text-lg text-muted-foreground">
          I love creating meaningful and exciting projects. This space is a
          curated collection of the things I&apos;ve built — each one reflecting
          a story of creativity, problem-solving, and growth. Take a look around
          and explore the ideas I&apos;ve brought to life through code and
          design.
        </p>
      </div>

      {/* Featured Projects Section */}
      {selectedProjects.length > 0 && (
        <div className="flex flex-col gap-4">
          <h2 className="px-6 lg:px-0 text-xl font-semibold">
            Featured Projects
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 sm:rounded-2xl overflow-hidden border m-0 md:m-0 sm:my-0 bg-background">
            {selectedProjects.map((project) => (
              <ProjectCard
                key={project.slug}
                slug={project.slug}
                title={project.title}
                description={project.description}
                icon={project.icon}
                image={project.cover[0]}
                iconSize={project.iconSize}
              />
            ))}
          </div>
        </div>
      )}

      {/* All Projects Section */}
      <div className="flex flex-col gap-4 w-full">
        <h2 className="px-6 lg:px-0 text-xl font-semibold">All Projects</h2>
        <div className="container p-0 m-0 mt-0 w-full min-w-full max-w-none">
          <Suspense fallback={<TableSkeleton />}>
            <ProjectsTable projects={projects} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export const dynamic = "force-static";
