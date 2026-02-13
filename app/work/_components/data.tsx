import { WorkExperienceType, WorkStatistics } from "@/lib/types";
import { differenceInMonths } from "date-fns";
import { useTranslations } from "next-intl";

type TranslationFn = ReturnType<typeof useTranslations<"WorkPage">>;

export function getExperiences(t: TranslationFn): WorkExperienceType[] {
  return [
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
      endDate: new Date("2026-01-01"),
      description: t("experiences.promiseForJustice.description"),
      responsibilities: t.raw("experiences.promiseForJustice.responsibilities"),
      highlights: t.raw("experiences.promiseForJustice.highlights"),
      type: "part-time",
      current: false,
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
      category: "Non-profit Association",
      icon: "/work/joud.png",
    },
  ];
}


// Statistics (calculated)

export function computeStatistics(experiences: WorkExperienceType[], locale: string): WorkStatistics {
  const now = new Date();

  const currentCount = experiences.filter((e) => e.current).length;
  const uniqueCompanies = new Set(experiences.map((e) => e.company)).size;

  const earliest = new Date(Math.min(...experiences.map((e) => e.startDate.getTime())));
  const latest = new Date(
    Math.max(...experiences.map((e) => (e.endDate ?? now).getTime()))
  );

  const totalMonths = differenceInMonths(latest, earliest);
  const years = Math.floor(totalMonths / 12);

  const totalExpStr =
    years >= 2
      ? `${years}+ ${locale === "ar" ? "سنوات" : "years"}`
      : totalMonths >= 1
        ? `${totalMonths} ${locale === "ar" ? "أشهر" : "months"}`
        : "—";

  return {
    totalExperience: totalExpStr,
    organizations: uniqueCompanies,
    currentRoles: currentCount,
    // You can make these dynamic later if you have more data
    totalProjects: 15,
    teamMembersLed: 25,
    technologiesUsed: 12,
  };
}
