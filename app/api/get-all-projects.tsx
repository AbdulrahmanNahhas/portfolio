import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { ProjectMetadataType } from "@/lib/types";

export async function getAllProjects(): Promise<ProjectMetadataType[]> {
  const projectsDirectory = path.join(process.cwd(), "content/projects");

  const filenames = fs
    .readdirSync(projectsDirectory)
    .filter((file) => file.endsWith(".mdx"));

  const projects: ProjectMetadataType[] = filenames.map((filename) => {
    const filePath = path.join(projectsDirectory, filename);
    const fileContent = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContent);

    const slug = filename.replace(/\.mdx$/, "");

    return {
      ...(data as Omit<ProjectMetadataType, "slug">),
      slug,
      startDate: new Date(data.startDate),
      endDate: data.endDate ? new Date(data.endDate) : undefined,
    };
  });

  const sortedProjects = projects.sort((a, b) => {
    if (!a.endDate && b.endDate) return -1;
    if (a.endDate && !b.endDate) return 1;

    return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
  });

  return sortedProjects;
}
