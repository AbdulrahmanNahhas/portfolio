import { getProjectBySlug } from "@/api/get-project-by-slug";
import { MDXRemote } from "next-mdx-remote/rsc";

import ProjectBanner from "@/components/projects/project-banner";
import ProjectCover from "@/components/projects/project-cover";
import ProjectMeta from "@/components/projects/project-meta";
import { Separator } from "@/components/ui/separator";
import { components } from "@/mdx-components";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const { metadata, content } = getProjectBySlug(slug);

  return (
    <div className="container max-w-5xl mx-auto px-6 md:px-0 py-0">
      <div className="flex flex-col gap-y-6">
        <ProjectBanner
          slug={metadata.slug}
          title={metadata.title}
          iconSize={metadata.iconSize}
          icon={metadata.icon}
          category={metadata.category}
          description={metadata.description}
        />

        <ProjectCover src={metadata.cover} alt={`${metadata.title} Cover`} />

        <div className="bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-border/50">
          <ProjectMeta
            tech={metadata.tech}
            role={metadata.role}
            status={metadata.status}
            startDate={metadata.startDate}
            endDate={metadata.endDate}
            links={metadata.links}
          />
        </div>
      </div>

      <Separator className="my-8" />

      <article className="prose dark:prose-invert max-w-none">
        <MDXRemote source={content} components={components} />
      </article>
    </div>
  );
}

export const dynamic = "force-static";
