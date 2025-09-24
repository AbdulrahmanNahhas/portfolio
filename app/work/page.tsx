import { WorkExperienceType, WorkStatistics, WorkType } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { MapPinIcon, ClockIcon } from "lucide-react";

// Work experience data - automatically calculates statistics
const WORK_EXPERIENCES: WorkExperienceType[] = [
  {
    id: "1",
    company: "NAVIGATE",
    position: "Co-Founder & Chief Technology Officer (CTO)",
    location: "Remote",
    startDate: new Date("2025-10-01"),
    description:
      "Co-founded NAVIGATE, a Syrian consultancy that helps startups with business planning, digital tools, and technical solutions.",
    responsibilities: [
      "Led the technical side of the company, including websites, platforms, and infrastructure",
      "Worked with founders to align technical solutions with business goals",
    ],
    type: "full-time",
    current: true,
    // companyUrl: "https://navigate-tech.com",
    category: "Startup",
    icon: "/work/navigate.png",
  },
  {
    id: "2",
    company: "New Syria Movement",
    position: "Member",
    location: "Syria",
    startDate: new Date("2025-09-25"),
    description:
      "Joined the New Syria Movement, a political party in Syria that works on change and rebuilding the country’s future.",
    responsibilities: [
      "Participated as a regular member in discussions and community activities",
    ],
    type: "volunteer",
    current: true,
    companyUrl: "https://syriamovement.com",
    category: "Other",
    icon: "/work/New-Syria-Movement.jpg",
  },
  {
    id: "3",
    company: "Promise for Justice & Truth",
    position: "Chief Technology Officer (CTO)",
    location: "Homs, Syria",
    startDate: new Date("2025-08-20"),
    description:
      "CTO at Promise for Justice & Truth, a human rights organization focused on documenting and addressing cases of detainees and the disappeared in Syria.",
    responsibilities: [
      "Built secure databases and digital infrastructure",
      "Provided technical support for legal and research teams",
    ],
    highlights: ["Introduced digital security measures for sensitive records"],
    type: "part-time",
    current: true,
    // companyUrl: "https://alwad.org",
    category: "Non-profit",
    icon: "/work/promise.png",
  },
  {
    id: "4",
    company: "Thabat Association",
    position: "Technical & Media Lead (Volunteer)",
    location: "Homs, Syria",
    startDate: new Date("2024-08-01"),
    description:
      "Thabat – The Islamic Association for Da‘wah, Education, and Culture is a non-profit organization dedicated to Islamic education, cultural activities, and da‘wah. It focuses on spreading knowledge, providing educational programs, and supporting community development.",
    responsibilities: [
      "Managed technical systems and digital platforms",
      "Led media production and digital presence",
    ],
    type: "volunteer",
    current: true,
    // companyUrl: "https://thabat.org",
    category: "Non-profit",
    icon: "/work/thabat.png",
  },
  {
    id: "5",
    company: "Insan for Psychosocial Support",
    position: "Volunteer",
    location: "Fatih, Istanbul",
    startDate: new Date("2023-02-01"),
    endDate: new Date("2023-02-28"),
    description:
      "Volunteered with Insan for Psychosocial Support during the Turkey-Syria earthquake response in February 2023.",
    responsibilities: [
      "Assisted in distributing relief supplies and supporting affected families",
    ],
    type: "volunteer",
    current: false,
    companyUrl: "https://insanps.org",
    category: "Non-profit",
    icon: "/work/insanps.png",
  },
];

/**
 * Formats a date to a readable string format (e.g., "Jan 2023")
 */
function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  });
}

/**
 * Calculates the duration between two dates in a human-readable format
 */
function calculateDuration(startDate: Date, endDate?: Date): string {
  const end = endDate || new Date();
  const diffTime = Math.abs(end.getTime() - startDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 30) {
    return `${diffDays} days`;
  } else if (diffDays < 365) {
    const months = Math.floor(diffDays / 30);
    return `${months} month${months > 1 ? "s" : ""}`;
  } else {
    const years = Math.floor(diffDays / 365);
    const remainingMonths = Math.floor((diffDays % 365) / 30);
    if (remainingMonths > 0) {
      return `${years} year${years > 1 ? "s" : ""} ${remainingMonths} month${
        remainingMonths > 1 ? "s" : ""
      }`;
    }
    return `${years} year${years > 1 ? "s" : ""}`;
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
}: {
  experience: WorkExperienceType;
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
                {experience.type.replace("-", " ")}
              </Badge>
              {experience.category && (
                <Badge
                  variant="secondary"
                  className="text-xs font-medium bg-green-700"
                >
                  {experience.category}
                </Badge>
              )}
              {experience.current && (
                <Badge
                  variant="secondary"
                  className="text-xs font-medium px-3 py-1 bg-amber-700"
                >
                  Current
                </Badge>
              )}
            </div>
            <div className="text-left sm:text-right lg:text-right">
              <p className="text-sm font-medium text-foreground">
                {formatDate(experience.startDate)} -{" "}
                {experience.endDate
                  ? formatDate(experience.endDate)
                  : "Present"}
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
              Key Responsibilities
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
              Key Highlights
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
              Achievements
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
  experiences: WorkExperienceType[]
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

  const diffTime = latestEndDate.getTime() - earliestStartDate.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30.44)); // More accurate month calculation
  const diffYears = Math.floor(diffDays / 365.25); // Account for leap years

  let totalExperience: string;
  if (diffYears >= 2) {
    totalExperience = `${diffYears}+ years`;
  } else if (diffYears === 1) {
    const remainingMonths = Math.floor((diffDays % 365.25) / 30.44);
    totalExperience = remainingMonths > 0 ? `1+ years` : `1 year`;
  } else {
    totalExperience = `${diffMonths} months`;
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
  // Sort work experiences by start date (latest first)
  const sortedExperiences = [...WORK_EXPERIENCES].sort((a, b) => {
    // If one is current and the other isn't, current comes first
    if (a.current && !b.current) return -1;
    if (!a.current && b.current) return 1;

    // Otherwise, sort by start date (most recent first)
    return b.startDate.getTime() - a.startDate.getTime();
  });

  // Calculate statistics automatically
  const statistics = calculateWorkStatistics(WORK_EXPERIENCES);

  return (
    <div className="min-h-screen bg-background pt-10">
      {/* Header Section */}
      <div className="max-w-5xl mx-auto border-x border-t">
        <div className="p-8 border-b">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Work Experience
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            A journey through my professional experience, from humanitarian work
            during crisis response to building platforms for justice and
            education. Each role has shaped my commitment to using technology
            for meaningful impact.
          </p>
        </div>

        {/* Statistics Section */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-0 border-b">
          <div className="border-r p-6 text-center hover:bg-accent/50">
            <div className="text-2xl font-bold text-foreground mb-1">
              {statistics.totalExperience}
            </div>
            <div className="text-sm text-muted-foreground">Experience</div>
          </div>
          <div className="border-r p-6 text-center hover:bg-accent/50">
            <div className="text-2xl font-bold text-foreground mb-1">
              {statistics.organizations}
            </div>
            <div className="text-sm text-muted-foreground">Organizations</div>
          </div>
          <div className="p-6 text-center hover:bg-accent/50">
            <div className="text-2xl font-bold text-foreground mb-1">
              {statistics.currentRoles}
            </div>
            <div className="text-sm text-muted-foreground">Current Roles</div>
          </div>
        </div>
      </div>

      {/* Work Experiences */}
      <div className="max-w-5xl mx-auto border-x border-b mb-1">
        {sortedExperiences.map((experience) => (
          <WorkExperienceCard key={experience.id} experience={experience} />
        ))}
      </div>
    </div>
  );
}
