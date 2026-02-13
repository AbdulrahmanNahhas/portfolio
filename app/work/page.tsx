"use client";

import { useTranslations, useLocale } from "next-intl";
import { WorkExperienceCard } from "./_components/card";
import { computeStatistics, getExperiences } from "./_components/data";

export default function WorkPage() {
  const t = useTranslations("WorkPage");
  const locale = useLocale();

  const experiences = getExperiences(t);
  const sorted = [...experiences].sort((a, b) => {
    if (a.current !== b.current) return a.current ? -1 : 1;
    return b.startDate.getTime() - a.startDate.getTime();
  });

  const stats = computeStatistics(experiences, locale);

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <div className="container border-x border-t">
        <div className="p-6 border-b">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 uppercase font-header">
            {t("title")}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            {t("description")}
          </p>
        </div>
        {/* Statistics Section */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-0">
          <div className="border-r p-4 text-center hover:bg-accent group">
            <div className="text-2xl font-bold text-foreground mb-1 group-hover:text-accent-foreground">
              {stats.totalExperience}
            </div>
            <div className="text-sm text-muted-foreground group-hover:text-accent-foreground">
              {t("statistics.experience")}
            </div>
          </div>
          <div className="border-r p-4 text-center hover:bg-accent group">
            <div className="text-2xl font-bold text-foreground mb-1 group-hover:text-accent-foreground">
              {stats.organizations}
            </div>
            <div className="text-sm text-muted-foreground group-hover:text-accent-foreground">
              {t("statistics.organizations")}
            </div>
          </div>
          <div className="p-4 text-center hover:bg-accent group">
            <div className="text-2xl font-bold text-foreground mb-1 group-hover:text-accent-foreground">
              {stats.currentRoles}
            </div>
            <div className="text-sm text-muted-foreground group-hover:text-accent-foreground">
              {t("statistics.currentRoles")}
            </div>
          </div>
        </div>
      </div>

      {/* Experience Cards */}
      <div className="container space-y-0 px-px">
        {sorted.map((exp) => (
          <WorkExperienceCard key={exp.id} experience={exp} t={t} locale={locale} />
        ))}
      </div>
    </div>
  );
}
