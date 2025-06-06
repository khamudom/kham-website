// Base Entity Type
export interface BaseEntity {
  id: string;
}

// Base API Response Type
export interface ApiResponse<T> {
  data: T;
  error?: string;
  loading: boolean;
}

// API Response with Metadata
export interface ApiResponseWithMetadata<T> {
  data: T[];
  metadata: {
    total: number;
    page: number;
    limit: number;
  };
}

// Image Type
export interface Image extends BaseEntity {
  url: string;
  alt: string;
  caption?: string;
}

// Technology Type
export interface Technology extends BaseEntity {
  name: string;
  description: string;
}

// Profile Types
export interface SocialLinks {
  github: string;
  linkedin: string;
  twitter?: string;
}

export interface ProfileLinks {
  projects: string;
  experience: string;
  skills: string;
}

export interface Profile {
  id: string;
  name: string;
  title: string;
  bio: string;
  coverImage: string;
  email: string;
  location: string;
  socialLinks: SocialLinks;
  links: ProfileLinks;
}

// Project Types
export interface ProjectMedia {
  type: "image" | "video" | "youtube";
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  caption?: string;
  youtubeId?: string;
}

export interface ProjectSection {
  header: string;
  content?: string;
  media?: ProjectMedia[];
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  summary: string;
  description: string[];
  coverImage: string;
  iframeUrl?: string;
  technologies: string[];
  skills?: string[];
  category?: string[];
  links: {
    live?: string;
    github?: string;
  };
  sections?: ProjectSection[];
}

// Experience Types
export interface WorkExperience extends BaseEntity {
  company: string;
  title: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string[];
  technologies: string[];
  achievements: string[];
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  period: string;
  position: string;
  description: string[];
  type: string;
  location: string;
  technologies: string[];
  startDate: string;
  endDate?: string;
}

// Skills Types
export interface Skill extends BaseEntity {
  name: string;
  description: string;
  iconName: string;
  category: string;
  proficiency: number;
  yearsOfExperience: number;
}

// About Types
export interface AboutContent {
  title: string;
  description: string;
  sections: {
    title: string;
    content: string;
  }[];
}
