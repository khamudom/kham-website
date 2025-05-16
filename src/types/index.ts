export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export interface Profile {
  name: string;
  title: string;
  bio: string;
  email: string;
  location: string;
  socialLinks: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
}

export interface Skill {
  name: string;
  level: "beginner" | "intermediate" | "advanced";
  category: "frontend" | "backend" | "tools" | "other";
}
