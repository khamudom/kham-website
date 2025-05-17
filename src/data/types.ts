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
  id: string;
  name: string;
  description: string;
}

export interface Skill extends BaseEntity {
  id: string;
  name: string;
  description: string;
  iconName: string;
  category: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  summary: string;
  description: string[];
  coverImage: string;
  technologies: string[];
  skills: string[];
  category: string[];
  links?: {
    live?: string;
    github?: string;
  };
  gallery?: {
    id: string;
    url: string;
    alt: string;
    caption: string;
    createdAt: string;
    updatedAt: string;
  }[];
  featured?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Profile {
  id: string;
  name: string;
  title: string;
  bio: string[];
  coverImage: string;
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

export interface Experience {
  id: string;
  title: string;
  company: string;
  period: string;
  description: string;
  type: "work" | "education";
}

export interface ContactInfo {
  email: string;
  phone?: string;
  location: string;
  socialLinks: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
}
