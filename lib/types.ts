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
