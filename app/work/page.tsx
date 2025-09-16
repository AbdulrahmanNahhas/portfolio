import { WorkExperienceType } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { MapPinIcon } from "lucide-react";

const workExperiences: WorkExperienceType[] = [
  {
    id: "1",
    company: "Insan for Psychosocial Support",
    position: "Volunteer",
    location: "Fatih, Istanbul",
    startDate: new Date("2023-02-01"),
    endDate: new Date("2023-02-28"),
    description:
      "First volunteer experience, providing direct humanitarian support in response to the Turkey-Syria earthquake in February 2023.",
    responsibilities: [
      "Delivered on-site humanitarian assistance to earthquake-affected communities",
      "Supported relief distribution including food, water, and essential supplies",
      "Assisted with administrative and logistical tasks as needed",
    ],
    type: "volunteer",
    current: false,
    companyUrl: "https://insanps.org",
    teamSize: "25 volunteers",
    category: "Non-profit",
    icon: "/work/insanps.png",
  },
  {
    id: "2",
    company: "Thabat Association",
    position: "Head of Technology Department (Volunteer)",
    location: "Istanbul, Turkey",
    startDate: new Date("2024-08-01"),
    description:
      "Leading the Technology Department at Thabat Association, overseeing all IT operations and driving digital transformation across the organization.",
    responsibilities: [
      "Directed all IT systems, infrastructure, and technical operations",
      "Designed, developed, and maintained digital platforms and internal tools",
      "Provided technical training and support for staff and volunteers",
      "Implemented automation and digital workflows to streamline operations",
      "Advised leadership on technology strategy, security, and innovation",
    ],
    type: "volunteer",
    current: true,
    companyUrl: "https://thabat.org", // update with real URL if available
    teamSize: "Core tech team with cross-department collaboration",
    category: "Non-profit",
    // icon: "/work/thabat.png",
  },
  {
    id: "3",
    company: "Promise for Truth and Justice",
    position: "Head of Technology Department",
    location: "Istanbul, Turkey",
    startDate: new Date("2025-08-20"),
    description:
      "Head of Technology at Promise for Truth and Justice, a human rights organization focused on documenting and addressing cases of detainees and the disappeared in Syria. Responsible for building and managing all technical infrastructure, web platforms, and data systems.",
    responsibilities: [
      "Developed and launched the organization’s official website",
      "Designed and maintained secure databases for sensitive human rights records",
      "Managed and optimized servers to ensure stability and data protection",
      "Implemented advanced digital security measures to safeguard information",
      "Collaborated with legal and research teams to provide technical solutions for data analysis and reporting",
    ],
    type: "full-time",
    current: true,
    companyUrl: "https://alwad.org", // update with real URL if available
    highlights: [
      "Established the organization’s complete technical infrastructure from the ground up",
      "Introduced secure and efficient digital workflows for operations",
    ],
    achievements: [
      "Built and deployed the organization’s first official website",
      "Implemented secure systems for managing and protecting detainee data",
    ],
    teamSize: "Solo lead with cross-functional collaboration",
    category: "Non-profit",
    // icon: "/work/promise.png",
  },
];

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  });
}

function getTypeColor(type: WorkExperienceType["type"]): string {
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

function TimelineItem({
  experience,
  isLast,
}: {
  experience: WorkExperienceType;
  isLast: boolean;
}) {
  return (
    <div className="relative flex gap-6">
      {/* Timeline line - Left positioned */}
      <div className="flex flex-col items-center flex-shrink-0 w-6">
        <div className="w-3 h-3 rounded-full bg-primary border-2 border-background shadow-sm z-10" />
        {!isLast && <div className="w-0.5 h-full bg-border mt-2" />}
      </div>

      {/* Content */}
      <div className="flex-1 pb-12 min-w-0">
        <Card className="hover:shadow-md transition-shadow duration-200 gap-4">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div className="min-w-0 flex-1">
                <div className="flex items-start gap-4 mb-0">
                  {experience.icon && (
                    <div className="flex-shrink-0">
                      <Image
                        src={experience.icon}
                        alt={`${experience.company} logo`}
                        width={100}
                        height={100}
                        className="size-20 bg-white p-1 object-contain rounded-2xl"
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-xl mb-0">
                      {experience.position}
                    </CardTitle>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
                      {experience.companyUrl ? (
                        <a
                          href={experience.companyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="cursor-target text-lg text-muted-foreground font-medium hover:text-primary transition-colors inline-flex items-center gap-1 px-1"
                        >
                          {experience.company}
                          <svg
                            className="w-4 h-4"
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
                        <p className="text-lg text-muted-foreground font-medium">
                          {experience.company}
                        </p>
                      )}
                      {experience.category && (
                        <span className="text-sm text-muted-foreground/70 bg-muted px-2 py-1 rounded-md">
                          {experience.category}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                      <MapPinIcon className="size-4" />
                      {experience.location}
                    </p>
                  </div>
                </div>
              </div>

              {/* Badges and Date */}
              <div className="flex flex-col sm:items-end gap-2">
                <div className="flex gap-2">
                  <Badge
                    variant="outline"
                    className={getTypeColor(experience.type)}
                  >
                    {experience.type.replace("-", " ")}
                  </Badge>
                  {experience.current && (
                    <Badge variant="destructive">Current</Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  {formatDate(experience.startDate)} -{" "}
                  {experience.endDate
                    ? formatDate(experience.endDate)
                    : "Present"}
                </p>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              {experience.description}
            </p>

            {/* Key Responsibilities */}
            <div>
              <h4 className="font-semibold mb-3">Key Responsibilities</h4>
              <ul className="space-y-2">
                {experience.responsibilities.map((responsibility, index) => (
                  <li
                    key={index}
                    className="text-sm text-muted-foreground flex items-start gap-3"
                  >
                    <span className="text-primary mt-0 flex-shrink-0">•</span>
                    <span>{responsibility}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Highlights */}
            {experience.highlights && experience.highlights.length > 0 && (
              <div>
                <h4 className="font-semibold mb-3">Key Highlights</h4>
                <ul className="space-y-2">
                  {experience.highlights.map((highlight, index) => (
                    <li
                      key={index}
                      className="text-sm text-muted-foreground flex items-start gap-3"
                    >
                      <span className="text-secondary mt-0 flex-shrink-0">
                        ★
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
                <h4 className="font-semibold mb-3">Achievements</h4>
                <ul className="space-y-2">
                  {experience.achievements.map((achievement, index) => (
                    <li
                      key={index}
                      className="text-sm text-muted-foreground flex items-start gap-3"
                    >
                      <span className="text-accent mt-0 flex-shrink-0">🏆</span>
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function WorkPage() {
  // Sort work experiences by start date (latest first)
  const sortedWorkExperiences = [...workExperiences].sort((a, b) => {
    // If one is current and the other isn't, current comes first
    if (a.current && !b.current) return -1;
    if (!a.current && b.current) return 1;

    // Otherwise, sort by start date (most recent first)
    return b.startDate.getTime() - a.startDate.getTime();
  });

  return (
    <div className="container max-w-5xl mx-auto pt-24 px-6">
      {/* Header Section */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Work Experience</h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          A journey through my professional experience, from humanitarian work
          during crisis response to building platforms for justice and
          education. Each role has shaped my commitment to using technology for
          meaningful impact.
        </p>
      </div>

      {/* Timeline */}
      <div className="relative">
        {sortedWorkExperiences.map((experience, index) => (
          <TimelineItem
            key={experience.id}
            experience={experience}
            isLast={index === sortedWorkExperiences.length - 1}
          />
        ))}
      </div>
    </div>
  );
}
