"use client"

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { MapPinIcon, ClockIcon } from "@phosphor-icons/react";
import { WorkExperienceType, WorkType } from "@/lib/types";
import { useTranslations } from "next-intl";
import { format, differenceInMonths, differenceInYears, formatDistanceStrict, isAfter } from "date-fns";
import { ar, enUS } from "date-fns/locale";
import { CSSProperties } from "react";

type TranslationFn = ReturnType<typeof useTranslations<"WorkPage">>;

function getDateFnsLocale(locale: string) {
  return locale === "ar" ? ar : enUS;
}

function translateWorkCategory(category: string, t: TranslationFn): string {
  const map: Record<string, string> = {
    Startup: t("workCategories.startup"),
    "Political Party": t("workCategories.politicalParty"),
    "Non-profit Organization": t("workCategories.nonProfitOrganization"),
    "Non-profit Association": t("workCategories.nonProfitAssociation"),
    Government: t("workCategories.government"),
    Other: t("workCategories.other"),
    Freelance: t("workCategories.freelance"),
  };
  return map[category] ?? category;
}

function getWorkTypeBadgeClass(type: WorkType): CSSProperties {
  const styles: Record<WorkType, CSSProperties> = {
    "full-time": { backgroundColor: "#1e293b", color: "#ffffff" }, // Slate 800
    "part-time": { backgroundColor: "#475569", color: "#ffffff" }, // Slate 600
    "internship": { backgroundColor: "#059669", color: "#ffffff" }, // Emerald 600
    "freelance": { backgroundColor: "#7c3aed", color: "#ffffff" }, // Violet 600
    "contract": { backgroundColor: "#ea580c", color: "#ffffff" }, // Orange 600
    "volunteer": { backgroundColor: "#db2777", color: "#ffffff" }, // Pink 600
  };
  return styles[type] ?? { backgroundColor: "#94a3b8", color: "#ffffff" };
}
const statusStyles = {
  category: { backgroundColor: "#0d9488", color: "#ffffff" }, // Teal 600 (Professional/Clean)
  current: { backgroundColor: "#2563eb", color: "#ffffff" },  // Blue 600 (Action/Active)
};

function formatMonthYear(date: Date, locale: string): string {
  return format(date, "MMM yyyy", { locale: getDateFnsLocale(locale) });
}

function formatDuration(start: Date, end?: Date, locale?: string): string {
  const now = new Date();
  const actualEnd = end ?? now;

  if (isAfter(start, actualEnd)) return "—";

  const months = differenceInMonths(actualEnd, start);
  const years = differenceInYears(actualEnd, start);

  if (months < 1) {
    return formatDistanceStrict(actualEnd, start, {
      addSuffix: false,
      locale: getDateFnsLocale(locale ?? "en"),
    });
  }

  if (years >= 1) {
    if (months % 12 === 0) {
      const yearStr =
        locale === "ar"
          ? years > 1
            ? "سنوات"
            : "سنة"
          : years > 1
            ? "years"
            : "year";
      return `${years} ${yearStr}`;
    }
    return `${years}+ ${locale === "ar" ? "سنوات" : "years"}`;
  }

  return `${months} ${locale === "ar" ? "أشهر" : "months"}`;
}

interface WorkExperienceCardProps {
  experience: WorkExperienceType;
  t: TranslationFn;
  locale: string;
}

export function WorkExperienceCard({ experience, t, locale }: WorkExperienceCardProps) {
  const isCurrent = experience.current;

  return (
    <Card className="hover:bg-accent dark:hover:bg-accent/25 transition-all duration-200 bg-background border-transparent w-full border last:border-b-transparent hover:border-border gap-0">
      <CardHeader className="pb-0! mb-0 border-b">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
          <div className="flex items-center gap-4 min-w-0 flex-1">
            {experience.icon && (
              <div className="relative shrink-0">
                <Image
                  src={experience.icon}
                  alt={`${experience.company} logo`}
                  width={64}
                  height={64}
                  className="size-20 bg-white p-1 object-contain rounded-xl shadow-sm border border-border/50"
                />
                {isCurrent && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background animate-pulse" />
                )}
              </div>
            )}

            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                {experience.companyUrl ? (
                  <a
                    href={experience.companyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xl font-semibold text-foreground hover:text-primary transition-colors inline-flex items-center gap-2 group"
                  >
                    {experience.company}
                    <svg
                      className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                ) : (
                  <h2 className="text-xl font-semibold text-foreground">
                    {experience.company}
                  </h2>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MapPinIcon className="size-4" />
                  <span>{experience.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <ClockIcon className="size-4" />
                  <span>
                    {formatDuration(experience.startDate, experience.endDate, locale)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col items-end gap-2">
            <div className="flex gap-1 flex-wrap justify-end">
              {/* Work Type Badge */}
              <Badge
                style={{ ...getWorkTypeBadgeClass(experience.type) }}
              >
                {t(`workTypes.${experience.type}`)}
              </Badge>

              {/* Category Badge */}
              {experience.category && (
                <Badge
                  style={statusStyles.category}
                >
                  {translateWorkCategory(experience.category, t)}
                </Badge>
              )}

              {/* Current Status Badge */}
              {isCurrent && (
                <Badge
                  style={statusStyles.current}
                >
                  {t("badges.current")}
                </Badge>
              )}
            </div>

            <p className="text-sm font-medium text-foreground whitespace-nowrap">
              {formatMonthYear(experience.startDate, locale)} –{" "}
              {experience.endDate
                ? formatMonthYear(experience.endDate, locale)
                : t("dateFormat.present")}
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3 pt-0!">
        <h3 className="text-2xl font-bold text-foreground">
          {experience.position}
        </h3>

        <p className="text-muted-foreground leading-relaxed text-base!">
          {experience.description}
        </p>

        {experience.responsibilities?.length ? (
          <div>
            <h4 className="font-medium text-base text-muted-foreground uppercase tracking-wide mb-3">
              {t("sections.keyResponsibilities")}
            </h4>
            <ul className="space-y-2.5">
              {experience.responsibilities.map((item, i) => (
                <li key={i} className="text-base text-muted-foreground flex items-start gap-3">
                  <span className="text-muted-foreground/60 mt-1 shrink-0 text-xs">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {experience.highlights?.length ? (
          <div>
            <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide mb-3">
              {t("sections.keyHighlights")}
            </h4>
            <ul className="space-y-2.5">
              {experience.highlights.map((item, i) => (
                <li key={i} className="text-sm text-muted-foreground flex items-start gap-3">
                  <span className="text-muted-foreground/60 mt-1 shrink-0 text-xs">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
