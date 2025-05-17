export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  liveUrl?: string;
  githubUrl?: string;
  slug: string;
  summary: string;
  coverImage: string;
  category: "all" | "enterprise" | "open-source" | "personal";
  featured: boolean;
  gallery?: {
    id: string;
    url: string;
    alt: string;
    caption?: string;
  }[];
  links: {
    live?: string;
    github?: string;
    documentation?: string;
  };
  skills: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  description: string[];
  technologies: string[];
}

export interface Skill {
  id: string;
  name: string;
  category: "frontend" | "backend" | "tools" | "other";
  proficiency: number; // 1-5
}

export interface PortfolioData {
  projects: Project[];
  experience: Experience[];
  skills: Skill[];
  about: {
    bio: string;
    email: string;
    location: string;
    socialLinks: {
      github?: string;
      linkedin?: string;
      twitter?: string;
    };
  };
}
