import { ArrowRight } from "lucide-react";
import Image from "next/image";
import React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const ProjectCard = ({
  title,
  icon,
  description,
  image,
  slug,
  iconSize,
  category,
  tech,
}: {
  slug: string;
  title: string;
  description?: string;
  icon?: string;
  iconSize?: string;
  image?: string;
  category?: string;
  tech?: string[];
}) => {
  return (
    <Link
      href={`/projects/${slug}`}
      className="group block p-6 border rounded-lg hover:bg-accent/30 transition-colors duration-200"
    >
      <div className="flex items-start gap-4">
        {/* Icon */}
        {icon && (
          <div className="flex-shrink-0">
            <div
              className={cn(
                "size-12 rounded-lg border bg-white p-2 flex items-center justify-center",
                iconSize === "fit" && "p-1 bg-transparent"
              )}
            >
              <Image
                src={icon}
                alt={title}
                width={40}
                height={40}
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-medium text-base leading-tight">{title}</h3>
            <ArrowRight className="size-4 text-muted-foreground group-hover:text-foreground transition-colors flex-shrink-0 mt-0.5" />
          </div>

          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {description}
          </p>

          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            {category && <span>{category}</span>}
            {tech && tech.length > 0 && (
              <>
                {category && <span>•</span>}
                <span>{tech.slice(0, 2).join(", ")}</span>
              </>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
