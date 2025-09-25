"use client";

import React from "react";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

interface Tool {
  name: string;
  category: string;
  description: string;
  url: string;
  icon?: string;
}

// merged tools array (improved descriptions, categories, and consistency)
const tools: Tool[] = [
  // IDEs & Editors
  {
    name: "Zed",
    category: "IDE",
    description:
      "High-performance code editor built for real-time collaboration and speed.",
    url: "https://zed.dev/",
  },
  {
    name: "Cursor",
    category: "IDE",
    description:
      "AI-enhanced VS Code fork that deeply understands your codebase for faster development.",
    url: "https://cursor.sh/",
  },

  // Version Control & Platforms
  {
    name: "Git",
    category: "Version Control",
    description:
      "The backbone of modern development — distributed version control and collaboration.",
    url: "https://git-scm.com/",
  },
  {
    name: "GitLab",
    category: "DevOps Platform",
    description:
      "Complete DevOps platform with Git hosting, CI/CD pipelines, and project management.",
    url: "https://gitlab.com/",
  },

  // Containerization & Infrastructure
  {
    name: "Docker",
    category: "Containerization",
    description:
      "Build, ship, and run applications consistently across environments with containers.",
    url: "https://www.docker.com/",
  },

  // AI & Local Development
  {
    name: "Gemini CLI",
    category: "AI Assistant",
    description:
      "Open-source command-line AI assistant with a generous free tier — ideal for coding support.",
    url: "https://google-gemini.github.io/gemini-cli/",
  },
  {
    name: "LM Studio",
    category: "AI Assistant",
    description:
      "Run and experiment with large language models locally on your machine with full control.",
    url: "https://lmstudio.ai/",
  },

  // Productivity & Knowledge Management
  {
    name: "Affine",
    category: "Productivity",
    description:
      "Open-source Notion alternative — faster, more private, and built for offline-first workflows.",
    url: "https://affine.pro/",
  },

  // Design & UI/UX
  {
    name: "Figma",
    category: "Design",
    description:
      "Collaborative interface design platform that redefined modern design workflows.",
    url: "https://www.figma.com/",
  },

  // Hardware & Embedded Systems
  {
    name: "ESP-IDF",
    category: "Hardware & IoT",
    description:
      "Espressif’s official framework for ESP32 microcontrollers, from bare-metal to IoT solutions.",
    url: "https://docs.espressif.com/projects/esp-idf/en/latest/",
  },
  {
    name: "KiCad",
    category: "Hardware & IoT",
    description:
      "Open-source suite for PCB design — from schematics to manufacturing-ready layouts.",
    url: "https://www.kicad.org/",
  },

  // Databases
  {
    name: "PostgreSQL",
    category: "Database",
    description:
      "The world’s most advanced open-source relational database with robust features and extensibility.",
    url: "https://www.postgresql.org/",
  },

  // Deployment & Hosting
  {
    name: "Vercel",
    category: "Deployment",
    description:
      "Frontend cloud platform for seamless deployments, edge functions, and Next.js integration.",
    url: "https://vercel.com/",
  },

  // Networking, Security & Domains
  {
    name: "Cloudflare",
    category: "Networking & Security",
    description:
      "DNS, CDN, registrar, and Zero Trust security — DNSSEC, DDoS protection, privacy-first resolver, and more.",
    url: "https://www.cloudflare.com/",
  },

  // API Development & Testing
  {
    name: "Yaak",
    category: "API Client",
    description:
      "Local-first, Git-friendly API client for REST, GraphQL, WebSockets, SSE, and gRPC — fast, private, and extensible.",
    url: "https://yaak.app/",
  },

  // Browsers
  {
    name: "Orion",
    category: "Browser",
    description:
      "Privacy-first WebKit browser by Kagi — zero telemetry, built-in ad/tracker blocking, and advanced privacy controls.",
    url: "https://kagi.com/orion/",
  },
];

const categories = [
  "IDE",
  "Version Control",
  "DevOps Platform",
  "Containerization",
  "AI Assistant",
  "Productivity",
  "Design",
  "Hardware & IoT",
  "Database",
  "Deployment",
  "Networking & Security",
  "API Client",
  "Browser",
];

export default function ToolsPage() {
  return (
    <div className="min-h-screen bg-background max-w-5xl mx-auto pt-10">
      {/* Header */}
      <div className="border-t border-x">
        <div className="max-w-5xl mx-auto p-6">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground uppercase tracking-wide">
            Tools I Use
          </h1>
          <p className="text-lg text-foreground/70 mt-4 max-w-2xl">
            A curated collection of development tools, IDEs, AI assistants, and
            platforms that power my workflow.
          </p>
        </div>
      </div>

      {/* Tools Grid */}
      <div className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
          {tools.map((tool) => (
            <Link
              key={tool.name}
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block border bg-card hover:bg-accent/50 transition-all duration-0 active:scale-[0.98]"
            >
              <div className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-200 truncate">
                      {tool.name}
                    </h3>
                    <span className="inline-block text-xs font-medium text-accent-foreground bg-accent/20 border px-2 py-1 mt-1 uppercase tracking-wide">
                      {tool.category}
                    </span>
                  </div>
                  <ExternalLink
                    size={16}
                    className="text-foreground/50 group-hover:text-foreground transition-colors duration-200 flex-shrink-0 ml-2"
                  />
                </div>
                <p className="text-sm text-foreground/70 leading-relaxed">
                  {tool.description}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Categories Legend */}
        <div className="border-x p-4 flex flex-col gap-2 border-t mt-6">
          <h2 className="text-2xl font-semibold text-foreground  uppercase tracking-wide">
            Categories
          </h2>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <span
                key={category}
                className="text-sm font-medium text-foreground/70 bg-muted/50 border px-3 py-1 uppercase tracking-wide"
              >
                {category}
              </span>
            ))}
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-0 border p-6">
          <p className="text-sm text-foreground/50 text-center">
            This list is constantly evolving as I discover new tools and
            technologies.
            <br />
            Last updated:{" "}
            {new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </div>
    </div>
  );
}
