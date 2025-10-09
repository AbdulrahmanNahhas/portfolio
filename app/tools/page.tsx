"use client";

import React from "react";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { format } from "date-fns";
import { enUS, ar } from "date-fns/locale";

// Helper function to get date-fns locale
function getDateLocale(locale: string) {
  switch (locale) {
    case "ar":
      return ar;
    case "en":
    default:
      return enUS;
  }
}

interface Tool {
  name: string;
  category: string;
  description: string;
  url: string;
  icon?: string;
}

// Tools data is now handled by getTranslatedTools function

// Type for the translation function
type TranslationFunction = {
  (key: string): string;
};

// Function to get translated tools
function getTranslatedTools(t: TranslationFunction): Tool[] {
  return [
    {
      name: t("tools.zed.name"),
      category: t("categories.ide"),
      description: t("tools.zed.description"),
      url: "https://zed.dev/",
    },
    {
      name: t("tools.cursor.name"),
      category: t("categories.ide"),
      description: t("tools.cursor.description"),
      url: "https://cursor.sh/",
    },
    {
      name: t("tools.git.name"),
      category: t("categories.versionControl"),
      description: t("tools.git.description"),
      url: "https://git-scm.com/",
    },
    {
      name: t("tools.gitlab.name"),
      category: t("categories.devopsPlatform"),
      description: t("tools.gitlab.description"),
      url: "https://gitlab.com/",
    },
    {
      name: t("tools.docker.name"),
      category: t("categories.containerization"),
      description: t("tools.docker.description"),
      url: "https://www.docker.com/",
    },
    {
      name: t("tools.geminiCli.name"),
      category: t("categories.aiAssistant"),
      description: t("tools.geminiCli.description"),
      url: "https://google-gemini.github.io/gemini-cli/",
    },
    {
      name: t("tools.lmStudio.name"),
      category: t("categories.aiAssistant"),
      description: t("tools.lmStudio.description"),
      url: "https://lmstudio.ai/",
    },
    {
      name: t("tools.affine.name"),
      category: t("categories.productivity"),
      description: t("tools.affine.description"),
      url: "https://affine.pro/",
    },
    {
      name: t("tools.figma.name"),
      category: t("categories.design"),
      description: t("tools.figma.description"),
      url: "https://www.figma.com/",
    },
    {
      name: t("tools.espIdf.name"),
      category: t("categories.hardwareIot"),
      description: t("tools.espIdf.description"),
      url: "https://docs.espressif.com/projects/esp-idf/en/latest/",
    },
    {
      name: t("tools.kicad.name"),
      category: t("categories.hardwareIot"),
      description: t("tools.kicad.description"),
      url: "https://www.kicad.org/",
    },
    {
      name: t("tools.postgresql.name"),
      category: t("categories.database"),
      description: t("tools.postgresql.description"),
      url: "https://www.postgresql.org/",
    },
    {
      name: t("tools.vercel.name"),
      category: t("categories.deployment"),
      description: t("tools.vercel.description"),
      url: "https://vercel.com/",
    },
    {
      name: t("tools.cloudflare.name"),
      category: t("categories.networkingSecurity"),
      description: t("tools.cloudflare.description"),
      url: "https://www.cloudflare.com/",
    },
    {
      name: t("tools.yaak.name"),
      category: t("categories.apiClient"),
      description: t("tools.yaak.description"),
      url: "https://yaak.app/",
    },
    {
      name: t("tools.orion.name"),
      category: t("categories.browser"),
      description: t("tools.orion.description"),
      url: "https://kagi.com/orion/",
    },
  ];
}

// Function to get translated categories
function getTranslatedCategories(t: TranslationFunction): string[] {
  return [
    t("categories.ide"),
    t("categories.versionControl"),
    t("categories.devopsPlatform"),
    t("categories.containerization"),
    t("categories.aiAssistant"),
    t("categories.productivity"),
    t("categories.design"),
    t("categories.hardwareIot"),
    t("categories.database"),
    t("categories.deployment"),
    t("categories.networkingSecurity"),
    t("categories.apiClient"),
    t("categories.browser"),
  ];
}

export default function ToolsPage() {
  const t = useTranslations("ToolsPage");
  const locale = useLocale();
  const translatedTools = getTranslatedTools(t);
  const translatedCategories = getTranslatedCategories(t);
  return (
    <div className="min-h-screen bg-background max-w-5xl mx-auto pt-10">
      {/* Header */}
      <div className="border-t border-x">
        <div className="max-w-5xl mx-auto p-6">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground uppercase tracking-wide font-header pb-3">
            {t("title")}
          </h1>
          <p className="text-lg text-foreground/70 mt-4 max-w-2xl">
            {t("description")}
          </p>
        </div>
      </div>

      {/* Tools Grid */}
      <div className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
          {translatedTools.map((tool) => (
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
          <h2 className="text-2xl font-semibold text-foreground  uppercase tracking-wide font-header">
            {t("categories.title")}
          </h2>
          <div className="flex flex-wrap gap-2">
            {translatedCategories.map((category) => (
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
            {t("footer.note")}
            <br />
            {t("footer.lastUpdated")}{" "}
            {format(new Date(), "dd MMMM, yyyy", {
              locale: getDateLocale(locale),
            })}
          </p>
        </div>
      </div>
    </div>
  );
}
