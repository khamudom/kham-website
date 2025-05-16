// Common types used across the application
export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface Image extends BaseEntity {
  url: string;
  alt: string;
  caption?: string;
}

export interface Technology extends BaseEntity {
  name: string;
  category: "language" | "framework" | "tool" | "platform";
  icon: string;
}

export interface Skill extends BaseEntity {
  name: string;
  description: string;
  iconName: string;
  category: "technical" | "soft" | "domain";
}

export interface Project extends BaseEntity {
  title: string;
  slug: string;
  summary: string;
  description: string[];
  coverImage: string;
  gallery?: Image[];
  category: "enterprise" | "open-source" | "personal";
  featured: boolean;
  technologies: string[]; // Technology IDs
  skills: string[]; // Skill IDs
  links: {
    github?: string;
    live?: string;
    documentation?: string;
  };
  metrics?: {
    users?: number;
    stars?: number;
    downloads?: number;
  };
}

export interface Profile extends BaseEntity {
  name: string;
  title: string;
  summary: string;
  bio: string[];
  location: string;
  email: string;
  socialLinks: {
    github: string;
    linkedin: string;
    twitter?: string;
  };
  skills: string[]; // Skill IDs
  experience: WorkExperience[];
}

export interface WorkExperience extends BaseEntity {
  company: string;
  title: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string[];
  technologies: string[]; // Technology IDs
  achievements: string[];
}
