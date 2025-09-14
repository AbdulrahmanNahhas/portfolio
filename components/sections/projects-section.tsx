import { getAllProjects } from "@/api/get-all-projects";
import ProjectCard from "@/components/project-card";

const ProjectsSection = async () => {
  const allProjects = await getAllProjects();
  const featuredProjects = allProjects.filter((project) => project.selected);

  if (featuredProjects.length === 0) {
    return null;
  }

  return (
    <section className="mt-12 pt-12 border-t px-6 lg:px-0">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <h3 className="text-foreground text-3xl md:text-4xl font-semibold">
            Featured Projects
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredProjects.map((project) => (
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
    </section>
  );
};

export default ProjectsSection;
