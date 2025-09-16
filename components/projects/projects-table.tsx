"use client";

import { useState, useMemo } from "react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter, Grid3X3, List, Clock } from "lucide-react";
import { ProjectMetadataType } from "@/lib/types";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "../ui/button";

// Define status types and their corresponding colors
type ProjectStatus =
  | "Planning"
  | "In Development"
  | "In Production"
  | "Completed"
  | "Archived";

const statusConfig = {
  Planning: {
    label: "Planning",
    color:
      "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
    description: "Project is in planning phase",
  },
  "In Development": {
    label: "In Development",
    color:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
    description: "Project is actively being developed",
  },
  "In Production": {
    label: "In Production",
    color:
      "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
    description: "Project is live and being used",
  },
  Completed: {
    label: "Completed",
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
    description: "Project is finished and no longer maintained",
  },
  Archived: {
    label: "Archived",
    color: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300",
    description: "Project is no longer active",
  },
} as const;

type FilterOption = "all" | "active" | "completed";
type SortOption = "newest" | "oldest" | "name";
type ViewMode = "cards" | "list";

interface ProjectsTableProps {
  projects: ProjectMetadataType[];
}

export function ProjectsTable({ projects }: ProjectsTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<FilterOption>("all");
  const [sort, setSort] = useState<SortOption>("newest");
  const [viewMode, setViewMode] = useState<ViewMode>("cards");

  // Filter and sort projects
  const filteredAndSortedProjects = useMemo(() => {
    let result = [...projects];

    // Apply search filter
    if (searchQuery) {
      result = result.filter(
        (project) =>
          project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.description
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          project.tech.some((tech) =>
            tech.toLowerCase().includes(searchQuery.toLowerCase())
          )
      );
    }

    // Apply status filter
    if (filter !== "all") {
      result = result.filter((project) => {
        if (filter === "active") {
          // Show projects that are not completed or archived
          return !["Completed", "Archived"].includes(project.status);
        } else if (filter === "completed") {
          // Show projects that are completed or archived
          return ["Completed", "Archived"].includes(project.status);
        }
        return true;
      });
    }

    // Apply sorting
    result.sort((a, b) => {
      switch (sort) {
        case "newest":
          return (
            new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
          );
        case "oldest":
          return (
            new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
          );
        case "name":
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    return result;
  }, [projects, searchQuery, filter, sort]);

  return (
    <div className="w-full space-y-0">
      {/* Search and Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-0">
        <div className="cursor-target relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
            className="pl-9 rounded-none bg-background border-y-0"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-0">
          <Select
            value={filter}
            onValueChange={(value) => setFilter(value as FilterOption)}
          >
            <SelectTrigger className="cursor-target w-[130px] border-y-0 rounded-none">
              <span className="flex items-center">
                <Filter className="mr-2 size-3" />
                <SelectValue placeholder="Filter" />
              </span>
            </SelectTrigger>
            <SelectContent>
              <SelectItem className="cursor-target" value="all">
                All
              </SelectItem>
              <SelectItem className="cursor-target" value="active">
                Active
              </SelectItem>
              <SelectItem className="cursor-target" value="completed">
                Completed
              </SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={sort}
            onValueChange={(value) => setSort(value as SortOption)}
          >
            <SelectTrigger className="cursor-target w-[130px] border-y-0 rounded-none">
              <span className="flex items-center">
                <Clock className="mr-2 size-3" />
                <SelectValue placeholder="Sort" />
              </span>
            </SelectTrigger>
            <SelectContent>
              <SelectItem className="cursor-target" value="newest">
                Newest
              </SelectItem>
              <SelectItem className="cursor-target" value="oldest">
                Oldest
              </SelectItem>
              <SelectItem className="cursor-target" value="name">
                Name
              </SelectItem>
            </SelectContent>
          </Select>
          <div className="flex border rounded-none">
            <Button
              variant={viewMode === "cards" ? "default" : "ghost"}
              size="icon"
              onClick={() => setViewMode("cards")}
              className="cursor-target rounded-none h-full"
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="icon"
              onClick={() => setViewMode("list")}
              className="cursor-target rounded-none h-full"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Projects Display */}
      {viewMode === "cards" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 rounded-none overflow-hidden border">
          {filteredAndSortedProjects.map((project, index) => {
            const totalProjects = filteredAndSortedProjects.length;
            const isLastRow = index >= totalProjects - 3;
            const isFirstInRow = index % 3 === 0;
            const isSecondInRow = index % 3 === 1;
            const isThirdInRow = index % 3 === 2;

            let borderClasses =
              "cursor-target group p-3.5 rounded-none bg-background hover:bg-card transition-all duration-200 hover:shadow-sm relative";

            if (isLastRow) {
              // Last row - no bottom borders
              if (isFirstInRow) borderClasses += " border-r";
              else if (isSecondInRow) borderClasses += " border-r";
              else if (isThirdInRow) borderClasses += " border-b";
            } else {
              // All other rows
              if (isFirstInRow) borderClasses += " border-b border-r";
              else if (isSecondInRow) borderClasses += " border-b border-r";
              else if (isThirdInRow) borderClasses += " border-b";
            }

            return (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className={borderClasses}
              >
                <div className="flex items-start justify-end mb-0 absolute top-2.5 right-2.5">
                  <div className="text-xs text-muted-foreground">
                    {format(project.startDate, "MMM yyyy")}
                  </div>
                </div>

                <div className="flex items-start gap-3 mb-3">
                  {project.icon ? (
                    <div
                      className={cn(
                        "size-8 rounded-sm border bg-white p-1 flex items-center justify-center flex-shrink-0",
                        project.iconSize === "fit" && "p-0 bg-transparent"
                      )}
                    >
                      <Image
                        className="w-full h-full object-contain"
                        src={project.icon}
                        width={32}
                        height={32}
                        alt={project.slug}
                      />
                    </div>
                  ) : (
                    <div className="size-8 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-medium text-muted-foreground">
                        {project.title.charAt(0)}
                      </span>
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm leading-tight truncate group-hover:text-foreground transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                      {project.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <StatusBadge status={project.status as ProjectStatus} />
                  <Badge variant="outline" className="text-xs">
                    {project.category}
                  </Badge>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="space-y-0 border rounded-none overflow-hidden">
          {filteredAndSortedProjects.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="cursor-target group block p-4 border-b last:border-b-0 hover:bg-accent/30 transition-colors duration-200"
            >
              <div className="flex items-center gap-4">
                {project.icon ? (
                  <div
                    className={cn(
                      "size-10 rounded-lg border bg-white p-1 flex items-center justify-center flex-shrink-0",
                      project.iconSize === "fit" && "p-0 bg-transparent"
                    )}
                  >
                    <Image
                      className="w-full h-full object-contain"
                      src={project.icon}
                      width={40}
                      height={40}
                      alt={project.slug}
                    />
                  </div>
                ) : (
                  <div className="size-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-medium text-muted-foreground">
                      {project.title.charAt(0)}
                    </span>
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-base leading-tight truncate group-hover:text-foreground transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
                        {project.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 flex-shrink-0">
                      <div className="flex items-center gap-2">
                        <StatusBadge status={project.status as ProjectStatus} />
                        <Badge variant="outline" className="text-xs">
                          {project.category}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground text-right">
                        <div>{format(project.startDate, "MMM yyyy")}</div>
                        {project.endDate && (
                          <div className="text-xs">
                            {format(project.endDate, "MMM yyyy")}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: ProjectStatus }) {
  const config = statusConfig[status] || statusConfig.Archived;

  return (
    <Badge
      variant="secondary"
      className={`${config.color} text-xs px-2 py-1 rounded-md`}
    >
      {config.label}
    </Badge>
  );
}
