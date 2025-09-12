"use client";

import { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { Search, Filter } from "lucide-react";
import { ProjectMetadataType } from "@/lib/types";
import Image from "next/image";
import { Avatar, AvatarImage } from "../ui/avatar";
import { cn } from "@/lib/utils";
import Link from "next/link";

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

interface ProjectsTableProps {
  projects: ProjectMetadataType[];
}

export function ProjectsTable({ projects }: ProjectsTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<FilterOption>("all");
  const [sort, setSort] = useState<SortOption>("newest");

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
    <div className="flex flex-col gap-0 w-full overflow-x-scroll max-w-screen md:max-w-[calc(100%-48px)] m-0 md:m-0 md:border md:rounded-2xl md:mt-0 bg-background">
      {/* Search and Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4 p-3 border-b">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Select
            value={filter}
            onValueChange={(value) => setFilter(value as FilterOption)}
          >
            <SelectTrigger className="w-[200px] text-start">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue
                placeholder="Filter by status"
                className="text-start"
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Projects</SelectItem>
              <SelectItem value="active">Active Projects</SelectItem>
              <SelectItem value="completed">Completed Projects</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={sort}
            onValueChange={(value) => setSort(value as SortOption)}
          >
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="name">Name</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Projects Table */}
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="min-w-[240px]">Project Title</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="min-w-[160px]">Start Date</TableHead>
            <TableHead className="min-w-[160px]">End Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredAndSortedProjects.map((item) => (
            <TableRow
              key={item.slug}
              className="hover:bg-accent/50 transition-colors"
            >
              <TableCell>
                <div className="flex items-center gap-3">
                  {item.icon ? (
                    <div
                      className={cn(
                        "size-10 p-1 rounded-sm overflow-hidden border flex items-center justify-center bg-white",
                        item.iconSize === "fit" && "p-0"
                      )}
                    >
                      <Image
                        className="w-10 object-cover h-auto"
                        src={
                          item.icon ||
                          `https://api.dicebear.com/7.x/initials/svg?seed=${item.slug}&backgroundType=gradientLinear`
                        }
                        width={72}
                        height={72}
                        alt={item.slug}
                      />
                    </div>
                  ) : (
                    <Avatar className="size-10 rounded-full border flex items-center justify-center p-0 bg-transparent">
                      <AvatarImage
                        src={`https://api.dicebear.com/7.x/initials/svg?seed=${item.slug}`}
                        alt={item.slug}
                        className="w-auto h-full object-contain"
                      />
                    </Avatar>
                  )}
                  <div className="flex flex-col">
                    <Link
                      href={`/projects/${item.slug}`}
                      className="font-medium underline hover:opacity-60 transition-colors"
                    >
                      {item.title}
                    </Link>
                    <span className="mt-0.5 text-xs text-muted-foreground">
                      {item.role}
                    </span>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <StatusBadge status={item.status as ProjectStatus} />
              </TableCell>
              <TableCell>
                <Badge variant="outline">{item.category}</Badge>
              </TableCell>
              <TableCell className="text-left">
                {format(item.startDate, "dd MMMM, yyyy")}
              </TableCell>
              <TableCell className="text-left">
                {item.endDate ? format(item.endDate, "dd MMMM, yyyy") : "-"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function StatusBadge({ status }: { status: ProjectStatus }) {
  const config = statusConfig[status] || statusConfig.Archived;

  return (
    <div className="flex items-center gap-2">
      <Badge className={`${config.color} rounded-full`}>{config.label}</Badge>
      <span className="sr-only">{config.description}</span>
    </div>
  );
}
