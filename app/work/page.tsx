import { WorkExperienceType, WorkStatistics, WorkType } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { MapPinIcon, ClockIcon } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import {
  format,
  formatDistanceToNow,
  differenceInDays,
  differenceInMonths,
  differenceInYears,
} from "date-fns";
import { enUS, ar } from "date-fns/locale";

// Type for the translation function
type TranslationFunction = {
  (key: string): string;
  raw: (key: string) => string[];
};

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

// Function to translate work categories
function translateCategory(category: string, t: TranslationFunction): string {
  const categoryMap: Record<string, string> = {
    Startup: t("workCategories.startup"),
    "Political Party": t("workCategories.politicalParty"),
    "Non-profit Organization": t("workCategories.nonProfitOrganization"),
    "Non-profit Association": t("workCategories.nonProfitAssociation"),
    Government: t("workCategories.government"),
    Other: t("workCategories.other"),
    Freelance: t("workCategories.freelance"),
  };
  return categoryMap[category] || category;
}

// Function to get work experiences with translations
function getWorkExperiences(t: TranslationFunction): WorkExperienceType[] {
  return [
    {
      id: "1",
      company: t("experiences.navigate.company"),
      position: t("experiences.navigate.position"),
      location: t("experiences.navigate.location"),
      startDate: new Date("2025-10-01"),
      description: t("experiences.navigate.description"),
      responsibilities: t.raw("experiences.navigate.responsibilities"),
      type: "part-time",
      current: true,
      // companyUrl: "https://navigate-tech.com",
      category: "Startup",
      icon: "/work/navigate.png",
    },
    {
      id: "2",
      company: t("experiences.newSyriaMovement.company"),
      position: t("experiences.newSyriaMovement.position"),
      location: t("experiences.newSyriaMovement.location"),
      startDate: new Date("2025-09-25"),
      description: t("experiences.newSyriaMovement.description"),
      responsibilities: t.raw("experiences.newSyriaMovement.responsibilities"),
      type: "volunteer",
      current: true,
      companyUrl: "https://syriamovement.com",
      category: "Political Party",
      icon: "/work/New-Syria-Movement.jpg",
    },
    {
      id: "3",
      company: t("experiences.promiseForJustice.company"),
      position: t("experiences.promiseForJustice.position"),
      location: t("experiences.promiseForJustice.location"),
      startDate: new Date("2025-08-20"),
      description: t("experiences.promiseForJustice.description"),
      responsibilities: t.raw("experiences.promiseForJustice.responsibilities"),
      highlights: t.raw("experiences.promiseForJustice.highlights"),
      type: "part-time",
      current: true,
      // companyUrl: "https://alwad.org",
      category: "Non-profit Organization",
      icon: "/work/promise.png",
    },
    {
      id: "4",
      company: t("experiences.thabat.company"),
      position: t("experiences.thabat.position"),
      location: t("experiences.thabat.location"),
      startDate: new Date("2024-08-01"),
      description: t("experiences.thabat.description"),
      responsibilities: t.raw("experiences.thabat.responsibilities"),
      type: "volunteer",
      current: true,
      companyUrl: "https://thabat.ngo",
      category: "Non-profit Association",
      icon: "/work/thabat.png",
    },
    {
      id: "5",
      company: t("experiences.joudVolunteers.company"),
      position: t("experiences.joudVolunteers.position"),
      location: t("experiences.joudVolunteers.location"),
      startDate: new Date("2023-02-01"),
      endDate: new Date("2023-03-14"),
      description: t("experiences.joudVolunteers.description"),
      responsibilities: t.raw("experiences.joudVolunteers.responsibilities"),
      type: "volunteer",
      current: false,
      companyUrl: "",
      category: "Non-profit Association",
      icon: "/work/joud.png",
    },
  ];
}

/**
 * Formats a date to a readable string format (e.g., "Jan 2023")
 */
function formatDate(date: Date, locale: string): string {
  const dateLocale = getDateLocale(locale);
  return format(date, "MMM yyyy", { locale: dateLocale });
}

/**
 * Calculates the duration between two dates in a human-readable format
 */
function calculateDuration(
  startDate: Date,
  locale: string,
  endDate?: Date
): string {
  const end = endDate || new Date();
  const dateLocale = getDateLocale(locale);

  const days = differenceInDays(end, startDate);

  if (days < 30) {
    return formatDistanceToNow(startDate, {
      addSuffix: false,
      locale: dateLocale,
    });
  } else if (days < 365) {
    return formatDistanceToNow(startDate, {
      addSuffix: false,
      locale: dateLocale,
    });
  } else {
    return formatDistanceToNow(startDate, {
      addSuffix: false,
      locale: dateLocale,
    });
  }
}

/**
 * Returns the appropriate color class for a work type badge
 */
function getWorkTypeColor(type: WorkType): string {
  const colors = {
    "full-time": "bg-primary text-primary-foreground",
    "part-time": "bg-secondary text-secondary-foreground",
    internship: "bg-accent text-accent-foreground",
    freelance: "bg-muted text-muted-foreground",
    contract: "bg-destructive text-white",
    volunteer: "bg-chart-1 text-white",
  };
  return colors[type];
}

function WorkExperienceCard({
  experience,
  t,
  locale,
}: {
  experience: WorkExperienceType;
  t: TranslationFunction;
  locale: string;
}) {
  return (
    <Card className="hover:bg-accent/5 transition-all duration-200 bg-background border-0 w-full border-b last:border-b-0">
      <CardHeader className="!pb-0 border-b">
        {/* Top Row: Company Info & Badges */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
          <div className="flex items-center gap-4 min-w-0 flex-1">
            {experience.icon && (
              <div className="relative">
                <Image
                  src={experience.icon}
                  alt={`${experience.company} logo`}
                  width={64}
                  height={64}
                  className="size-20 bg-white p-1 object-contain rounded-xl shadow-sm border border-border/50"
                />
                {experience.current && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background animate-pulse"></div>
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
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MapPinIcon className="size-4" />
                  <span>{experience.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <ClockIcon className="size-4" />
                  <span>
                    {calculateDuration(
                      experience.startDate,
                      locale,
                      experience.endDate
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col items-end gap-2">
            <div className="flex gap-1 flex-wrap">
              <Badge
                variant="outline"
                className={`${getWorkTypeColor(
                  experience.type
                )} border text-xs font-medium px-3 py-1`}
              >
                {t(`workTypes.${experience.type}`)}
              </Badge>
              {experience.category && (
                <Badge
                  variant="secondary"
                  className="text-xs font-medium bg-green-700"
                >
                  {translateCategory(experience.category, t)}
                </Badge>
              )}
              {experience.current && (
                <Badge
                  variant="secondary"
                  className="text-xs font-medium px-3 py-1 bg-amber-700"
                >
                  {t("badges.current")}
                </Badge>
              )}
            </div>
            <div className="text-left sm:text-right lg:text-right">
              <p className="text-sm font-medium text-foreground">
                {formatDate(experience.startDate, locale)} -{" "}
                {experience.endDate
                  ? formatDate(experience.endDate, locale)
                  : t("dateFormat.present")}
              </p>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 !pt-0">
        <CardTitle className="text-2xl font-bold text-foreground mb-2">
          {experience.position}
        </CardTitle>
        <p className="text-muted-foreground leading-relaxed">
          {experience.description}
        </p>

        {/* Key Responsibilities */}
        {experience?.responsibilities?.length && (
          <div>
            <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide mb-3">
              {t("sections.keyResponsibilities")}
            </h4>
            <ul className="space-y-2">
              {experience.responsibilities.map((responsibility, index) => (
                <li
                  key={index}
                  className="text-sm text-muted-foreground flex items-start gap-3"
                >
                  <span className="text-muted-foreground/60 mt-1 flex-shrink-0 text-xs">
                    •
                  </span>
                  <span>{responsibility}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Highlights */}
        {experience.highlights && experience.highlights.length > 0 && (
          <div>
            <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide mb-3">
              {t("sections.keyHighlights")}
            </h4>
            <ul className="space-y-2">
              {experience.highlights.map((highlight, index) => (
                <li
                  key={index}
                  className="text-sm text-muted-foreground flex items-start gap-3"
                >
                  <span className="text-muted-foreground/60 mt-1 flex-shrink-0 text-xs">
                    •
                  </span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Achievements */}
        {experience.achievements && experience.achievements.length > 0 && (
          <div>
            <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide mb-3">
              {t("sections.achievements")}
            </h4>
            <ul className="space-y-2">
              {experience.achievements.map((achievement, index) => (
                <li
                  key={index}
                  className="text-sm text-muted-foreground flex items-start gap-3"
                >
                  <span className="text-muted-foreground/60 mt-1 flex-shrink-0 text-xs">
                    •
                  </span>
                  <span>{achievement}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

/**
 * Automatically calculates work statistics from experience data
 * - Total experience in years/months
 * - Number of unique organizations
 * - Number of current roles
 */
function calculateWorkStatistics(
  experiences: WorkExperienceType[],
  locale: "ar" | "en"
): WorkStatistics {
  const currentDate = new Date();
  const currentRoles = experiences.filter((exp) => exp.current).length;
  const organizations = new Set(experiences.map((exp) => exp.company)).size;

  // Calculate total career span from earliest start date to present
  const earliestStartDate = new Date(
    Math.min(...experiences.map((exp) => exp.startDate.getTime()))
  );
  const latestEndDate = new Date(
    Math.max(
      ...experiences.map((exp) => (exp.endDate || currentDate).getTime())
    )
  );

  const diffYears = differenceInYears(latestEndDate, earliestStartDate);
  const diffMonths = differenceInMonths(latestEndDate, earliestStartDate);

  let totalExperience: string;
  if (diffYears >= 2) {
    totalExperience = `${diffYears}+ ${locale === "ar" ? "سنوات" : "years"}`;
  } else if (diffYears === 1) {
    const remainingMonths = diffMonths % 12;
    totalExperience =
      remainingMonths > 0
        ? `1+ ${locale === "ar" ? "شهر" : "months"}`
        : `1 ${locale === "ar" ? "شهر" : "month"}`;
  } else {
    totalExperience = `${diffMonths} ${locale === "ar" ? "شهر" : "months"}`;
  }

  return {
    totalExperience,
    organizations,
    currentRoles,
    totalProjects: 15, // This could be calculated from a projects array if available
    teamMembersLed: 25, // This could be calculated from teamSize data if available
    technologiesUsed: 12, // This could be calculated from tech stacks if available
  };
}

export default function WorkPage() {
  const t = useTranslations("WorkPage");
  const locale = useLocale();

  // Get work experiences with translations
  const workExperiences = getWorkExperiences(t);

  // Sort work experiences by start date (latest first)
  const sortedExperiences = [...workExperiences].sort((a, b) => {
    // If one is current and the other isn't, current comes first
    if (a.current && !b.current) return -1;
    if (!a.current && b.current) return 1;

    // Otherwise, sort by start date (most recent first)
    return b.startDate.getTime() - a.startDate.getTime();
  });

  // Calculate statistics automatically
  const statistics = calculateWorkStatistics(
    workExperiences,
    locale as "ar" | "en"
  );

  return (
    <div className="min-h-screen bg-background pt-10">
      {/* Header Section */}
      <div className="max-w-5xl mx-auto border-x border-t">
        <div className="p-6 border-b">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 uppercase font-header">
            {t("title")}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            {t("description")}
          </p>
        </div>

        {/* Statistics Section */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-0 border-b">
          <div className="border-r p-4 text-center hover:bg-accent/50">
            <div className="text-2xl font-bold text-foreground mb-1">
              {statistics.totalExperience}
            </div>
            <div className="text-sm text-muted-foreground">
              {t("statistics.experience")}
            </div>
          </div>
          <div className="border-r p-4 text-center hover:bg-accent/50">
            <div className="text-2xl font-bold text-foreground mb-1">
              {statistics.organizations}
            </div>
            <div className="text-sm text-muted-foreground">
              {t("statistics.organizations")}
            </div>
          </div>
          <div className="p-4 text-center hover:bg-accent/50">
            <div className="text-2xl font-bold text-foreground mb-1">
              {statistics.currentRoles}
            </div>
            <div className="text-sm text-muted-foreground">
              {t("statistics.currentRoles")}
            </div>
          </div>
        </div>
      </div>

      {/* Work Experiences */}
      <div className="max-w-5xl mx-auto border-x border-b mb-1">
        {sortedExperiences.map((experience) => (
          <WorkExperienceCard
            key={experience.id}
            experience={experience}
            t={t}
            locale={locale}
          />
        ))}
      </div>
    </div>
  );
}
