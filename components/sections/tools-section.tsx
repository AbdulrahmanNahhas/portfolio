"use client";

import {
  Nextjs,
  ReactIcon,
  NodeJS,
  Git,
  Supabase,
  PostgreSQL,
  GitLab,
  RaspberryPI,
  C,
} from "../icons";
import { ESPIDF } from "../icons/ESPIDF";
import Link from "next/link";

import {
  Marquee,
  MarqueeContent,
  MarqueeFade,
  MarqueeItem,
} from "@/components/ui/kibo-ui/marquee";

const technologies = [
  { name: "React", component: ReactIcon },
  { name: "Next.js", component: Nextjs },
  { name: "Git", component: Git },
  { name: "Gitlab", component: GitLab },
  { name: "C++", component: C },
  { name: "ESP-IDF", component: ESPIDF },
  { name: "RaspberryPI", component: RaspberryPI },
  { name: "Node.js", component: NodeJS },
  { name: "PostgreSQL", component: PostgreSQL },
  { name: "Supabase", component: Supabase },
];

const ToolsSection = () => {
  return (
    <Marquee
      dir="ltr"
      className="flex size-full items-center justify-center bg-background container border"
    >
      <MarqueeFade side="left" />
      <MarqueeFade side="right" />
      <MarqueeContent>
        {[...technologies, ...technologies, ...technologies].map(
          (tech, index) => {
            const IconComponent = tech.component;
            return (
              <MarqueeItem
                key={`${tech.name}-${index}`}
                className="mx-0 border-r"
              >
                <Link
                  href={`https://duckduckgo.com/?q=${tech.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 group transition-all duration-0 hover:bg-accent/50 py-4 px-6"
                >
                  <IconComponent className="h-7 w-7 transition-transform group-hover:scale-110 opacity-60" />
                  <span className="text-lg font-medium text-(--white-icon) w-full">
                    {tech.name.charAt(0).toUpperCase() + tech.name.slice(1)}
                  </span>
                </Link>
              </MarqueeItem>
            );
          }
        )}
      </MarqueeContent>
    </Marquee>
  );
};

export default ToolsSection;
