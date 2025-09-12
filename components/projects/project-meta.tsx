import React from "react";
import { Badge } from "@/components/ui/badge";
import { Calendar, Code, Globe, PlayCircle } from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";

type ProjectMetaProps = {
  tech: string[];
  role: string;
  status: string;
  startDate: Date;
  endDate?: Date;
  links: {
    website: string;
    repository: string;
    demo?: string;
  };
};

const ProjectMeta = ({
  tech,
  role,
  status,
  startDate,
  endDate,
  links,
}: ProjectMetaProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
      <div className="space-y-5">
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-2">
            ROLE
          </h3>
          <p className="text-base font-medium">{role}</p>
        </div>

        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-2">
            STATUS
          </h3>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
            {status}
          </span>
        </div>

        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-2">
            TIMELINE
          </h3>
          <div className="flex items-center space-x-2 text-sm">
            <Calendar className="h-4 w-4" />
            {format(startDate, "dd MMMM, yyyy")}
            <span className="px-2">—</span>
            {endDate ? format(endDate, "dd MMMM, yyyy") : "Present"}
          </div>
        </div>
      </div>

      <div className="space-y-5">
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-2">
            TECHNOLOGIES
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {tech.map((item) => (
              <Badge
                key={item}
                variant="default"
                className="rounded-full text-xs py-0.5 px-3"
              >
                {item}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-2">
            LINKS
          </h3>
          <div className="flex flex-col space-y-1.5">
            {links.website && (
              <Link
                href={links.website}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ variant: "link" }),
                  "text-start justify-start !px-0 !py-1 gap-2 h-auto"
                )}
              >
                <Globe className="h-4 w-4" />
                Website
              </Link>
            )}
            {links.repository && (
              <Link
                href={links.repository}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ variant: "link" }),
                  "text-start justify-start !px-0 !py-1 gap-2 h-auto"
                )}
              >
                <Code className="h-4 w-4" />
                Repository
              </Link>
            )}
            {links.demo && (
              <Link
                href={links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ variant: "link" }),
                  "text-start justify-start !px-0 !py-1 gap-2 h-auto"
                )}
              >
                <PlayCircle className="h-4 w-4" />
                Demo
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectMeta;
