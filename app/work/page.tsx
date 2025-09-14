import { WorkExperienceType } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { MapPinIcon } from "lucide-react";

// Sample work experience data - replace with your actual data
const workExperiences: WorkExperienceType[] = [
  {
    id: "1",
    company: "Tech Solutions Inc.",
    position: "Full Stack Developer",
    location: "Remote",
    startDate: new Date("2023-06-01"),
    endDate: new Date("2024-08-31"),
    description:
      "Developed and maintained web applications using modern technologies, focusing on user experience and performance optimization.",
    responsibilities: [
      "Built responsive web applications using React and Next.js",
      "Designed and implemented RESTful APIs using Node.js and Express",
      "Collaborated with cross-functional teams to deliver high-quality software",
      "Optimized application performance and improved loading times by 40%",
      "Mentored junior developers and conducted code reviews",
    ],
    type: "full-time",
    current: false,
    companyUrl: "https://techsolutions.com",
    highlights: [
      "Led development of a customer portal serving 10,000+ users",
      "Reduced page load times by 40% through performance optimization",
      "Mentored 3 junior developers and improved team productivity",
    ],
    achievements: [
      "Employee of the Month - August 2023",
      "Successfully delivered 15+ projects on time and within budget",
    ],
    teamSize: "8 developers",
    category: "Enterprise",
    icon: "/public/svg/next.svg",
  },
  {
    id: "2",
    company: "StartupXYZ",
    position: "Frontend Developer Intern",
    location: "San Francisco, CA",
    startDate: new Date("2022-05-01"),
    endDate: new Date("2022-08-31"),
    description:
      "Gained hands-on experience in frontend development while contributing to the company's main product.",
    responsibilities: [
      "Developed user interfaces using React and TypeScript",
      "Implemented responsive designs using Tailwind CSS",
      "Participated in agile development processes",
      "Fixed bugs and implemented new features based on user feedback",
      "Collaborated with designers to ensure pixel-perfect implementations",
    ],
    type: "internship",
    current: false,
    companyUrl: "https://startupxyz.com",
    highlights: [
      "Contributed to the main product used by 5,000+ daily active users",
      "Implemented 20+ UI components that are still in use today",
    ],
    teamSize: "12 developers",
    category: "Startup",
    icon: "/public/svg/react.svg",
  },
  {
    id: "3",
    company: "Freelance Projects",
    position: "Web Developer",
    location: "Remote",
    startDate: new Date("2021-09-01"),
    endDate: new Date("2023-05-31"),
    description:
      "Provided web development services to various clients, building custom solutions and maintaining existing websites.",
    responsibilities: [
      "Developed custom websites for small businesses",
      "Implemented e-commerce solutions using Shopify and WooCommerce",
      "Provided ongoing maintenance and support for client websites",
      "Communicated directly with clients to understand requirements",
      "Delivered projects on time and within budget",
    ],
    type: "freelance",
    current: false,
    highlights: [
      "Completed 25+ projects for clients across various industries",
      "Maintained 100% client satisfaction rate",
      "Generated $50,000+ in revenue over 2 years",
    ],
    achievements: [
      "Top-rated freelancer on Upwork with 5.0 star rating",
      "100% job success rate across all projects",
    ],
    category: "Consulting",
    icon: "/public/svg/typeScript.svg",
  },
  {
    id: "4",
    company: "Innovation Labs",
    position: "Software Engineer",
    location: "New York, NY",
    startDate: new Date("2024-09-01"),
    description:
      "Currently working on cutting-edge projects involving AI and machine learning integration into web applications.",
    responsibilities: [
      "Developing AI-powered features for web applications",
      "Building scalable microservices architecture",
      "Leading technical decisions for new product features",
      "Mentoring junior developers and conducting technical interviews",
      "Collaborating with data science team on ML model integration",
    ],
    type: "full-time",
    current: true,
    companyUrl: "https://innovationlabs.com",
    highlights: [
      "Leading development of AI-powered recommendation engine",
      "Architected microservices that handle 1M+ requests daily",
      "Mentoring 4 junior developers and 2 interns",
    ],
    achievements: [
      "Promoted to Senior Software Engineer within 6 months",
      "Led team that won company hackathon 2024",
    ],
    teamSize: "15 developers",
    category: "Research",
    icon: "/public/svg/nodejs.svg",
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
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
              <div className="min-w-0 flex-1">
                <CardTitle className="text-xl mb-1">
                  {experience.position}
                </CardTitle>
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    {experience.icon && (
                      <Image
                        src={experience.icon}
                        alt={`${experience.company} logo`}
                        width={20}
                        height={20}
                        className="object-contain"
                      />
                    )}
                    {experience.companyUrl ? (
                      <a
                        href={experience.companyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lg text-muted-foreground font-medium hover:text-primary transition-colors inline-flex items-center gap-1"
                      >
                        {experience.company}
                        <svg
                          className="w-3 h-3"
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
                      <span className="text-base text-muted-foreground/70">
                        • {experience.category}
                      </span>
                    )}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <MapPinIcon className="size-4" />
                  {experience.location}
                </p>
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
                      <span className="text-secondary mt-1 flex-shrink-0">
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
                      <span className="text-accent mt-1 flex-shrink-0">🏆</span>
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
          A journey through my professional experience, showcasing the projects,
          achievements, and growth that have shaped my career as a developer.
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
