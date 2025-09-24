export type ProjectMetadataType = {
  title: string;
  slug: string;
  description: string;
  icon?: string;
  iconSize?: string;
  cover: string[];
  category: string;
  startDate: Date;
  endDate?: Date;
  selected?: boolean;
  links: {
    website: string;
    repository: string;
    demo?: string;
  };
  tech: string[];
  role: string;
  status: string;
};

export type WorkExperienceType = {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: Date;
  endDate?: Date;
  description: string;
  responsibilities?: string[];
  type: WorkType;
  current?: boolean;
  companyUrl?: string;
  highlights?: string[];
  achievements?: string[];
  teamSize?: string;
  category?: WorkCategory;
  icon?: string;
};

export type WorkType =
  | "full-time"
  | "part-time"
  | "internship"
  | "freelance"
  | "contract"
  | "volunteer";

export type WorkCategory =
  | "Open Source"
  | "Volunteer"
  | "Education"
  | "Startup"
  | "Enterprise"
  | "Non-profit"
  | "Government"
  | "Consulting"
  | "Research"
  | "Other";

export type WorkStatistics = {
  totalExperience: string;
  organizations: number;
  currentRoles: number;
  totalProjects: number;
  teamMembersLed: number;
  technologiesUsed: number;
};
