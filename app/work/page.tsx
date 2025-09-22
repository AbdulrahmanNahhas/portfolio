import { WorkExperienceType } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { MapPinIcon, ClockIcon } from "lucide-react";

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
    location: "Homs, Syria",
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
    icon: "/work/thabat.png",
  },
  {
    id: "3",
    company: "Promise for Truth and Justice",
    position: "Head of Technology Department",
    location: "Homs, Syria",
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
    type: "part-time",
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

function TimelineItem({ experience }: { experience: WorkExperienceType }) {
  return (
    <div className="relative flex gap-6 border-b last:border-b-0">
      <Card className="hover:bg-accent/5 transition-all duration-200 gap-4 bg-background border-0 w-full">
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
              <div className="text-right">
                <p className="text-sm text-muted-foreground">
                  {formatDate(experience.startDate)} -{" "}
                  {experience.endDate
                    ? formatDate(experience.endDate)
                    : "Present"}
                </p>
                <p className="text-xs text-foreground/50 flex items-center justify-end gap-1">
                  <ClockIcon className="size-3" />
                  {calculateDuration(experience.startDate, experience.endDate)}
                </p>
              </div>
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
                    <span className="text-secondary-foregroundmt-0 flex-shrink-0">
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
  );
}

// Work Statistics
const workStats = {
  totalExperience: "2+ years",
  organizations: 3,
  currentRoles: 2,
  totalProjects: 15,
  teamMembersLed: 25,
  technologiesUsed: 12,
};

// Skills developed through work
// const workSkills = [
//   {
//     category: "Leadership",
//     skills: [
//       "Team Management",
//       "Strategic Planning",
//       "Cross-functional Collaboration",
//     ],
//   },
//   {
//     category: "Technology",
//     skills: [
//       "Full-stack Development",
//       "Database Design",
//       "System Architecture",
//       "Security Implementation",
//     ],
//   },
//   {
//     category: "Humanitarian",
//     skills: [
//       "Crisis Response",
//       "Community Support",
//       "Resource Management",
//       "Stakeholder Communication",
//     ],
//   },
//   {
//     category: "Project Management",
//     skills: [
//       "Agile Methodologies",
//       "Timeline Management",
//       "Risk Assessment",
//       "Quality Assurance",
//     ],
//   },
// ];

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
    <div className="min-h-screen bg-background pt-10">
      {/* Header Section */}
      <div className="max-w-5xl mx-auto border-x border-t">
        <div className="p-6 border-b">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground uppercase tracking-wide mb-4">
            Work Experience
          </h1>
          <p className="text-lg text-foreground/70 max-w-2xl leading-relaxed">
            A journey through my professional experience, from humanitarian work
            during crisis response to building platforms for justice and
            education. Each role has shaped my commitment to using technology
            for meaningful impact.
          </p>
        </div>

        {/* Statistics Section */}
        <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-0 border-b">
          <div className="border-r p-4 text-center">
            <div className="text-2xl font-bold text-foreground mb-1">
              {workStats.totalExperience}
            </div>
            <div className="text-sm text-foreground/70 uppercase tracking-wide">
              Experience
            </div>
          </div>
          <div className="border-r p-4 text-center">
            <div className="text-2xl font-bold text-foreground mb-1">
              {workStats.organizations}
            </div>
            <div className="text-sm text-foreground/70 uppercase tracking-wide">
              Organizations
            </div>
          </div>
          <div className="border-r p-4 text-center">
            <div className="text-2xl font-bold text-foreground mb-1">
              {workStats.currentRoles}
            </div>
            <div className="text-sm text-foreground/70 uppercase tracking-wide">
              Current Roles
            </div>
          </div>
          {/* <div className="border-r p-4 text-center">
            <div className="text-2xl font-bold text-foreground mb-1">
              {workStats.totalProjects}
            </div>
            <div className="text-sm text-foreground/70 uppercase tracking-wide">
              Projects
            </div>
          </div> */}
          {/* <div className="border-r p-4 text-center">
            <div className="text-2xl font-bold text-foreground mb-1">
              {workStats.teamMembersLed}
            </div>
            <div className="text-sm text-foreground/70 uppercase tracking-wide">
              Team Members
            </div>
          </div>
          <div className="p-4 text-center">
            <div className="text-2xl font-bold text-foreground mb-1">
              {workStats.technologiesUsed}
            </div>
            <div className="text-sm text-foreground/70 uppercase tracking-wide">
              Technologies
            </div>
          </div> */}
        </div>

        {/* Skills Developed Section */}
        {/* <div className="border-b">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-foreground uppercase tracking-wide mb-6">
              Skills Developed
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {workSkills.map((skillGroup, index) => (
                <div key={index} className="border bg-card p-4">
                  <h3 className="font-semibold text-foreground mb-3 uppercase tracking-wide text-sm">
                    {skillGroup.category}
                  </h3>
                  <ul className="space-y-2">
                    {skillGroup.skills.map((skill, skillIndex) => (
                      <li
                        key={skillIndex}
                        className="text-sm text-foreground/70 flex items-center gap-2"
                      >
                        <span className="text-primary">•</span>
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div> */}
      </div>

      {/* Timeline */}
      <div className="max-w-5xl mx-auto border-x">
        {sortedWorkExperiences.map((experience) => (
          <TimelineItem key={experience.id} experience={experience} />
        ))}
      </div>

      {/* Footer Note */}
      <div className="max-w-5xl mx-auto border">
        <div className="p-4 text-center">
          <p className="text-sm text-foreground/50">
            This timeline represents my journey in using technology for social
            impact.
            <br />
            Each experience has contributed to my growth as both a developer and
            a humanitarian.
          </p>
        </div>
      </div>
    </div>
  );
}
