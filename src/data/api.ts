import React from "react";
import type {
  Project as ProjectType,
  Image,
  Technology as TechnologyType,
  Skill as SkillType,
} from "./types";

export interface Profile {
  id: string;
  name: string;
  bio: string[];
  coverImage: string;
}

export type Technology = TechnologyType;
export type Skill = SkillType;
export type Project = ProjectType;

export interface Experience {
  id: string;
  title: string;
  company: string;
  period: string;
  description: string;
  type: "work" | "education";
}

export async function getProfile(): Promise<Profile> {
  // Mock data - replace with actual API call
  return {
    id: "1",
    name: "Kham Udom",
    bio: [
      "I'm a passionate software developer with expertise in web development.",
      "I love creating beautiful and functional applications that solve real-world problems.",
    ],
    coverImage: "/images/placeholder.jpg",
  };
}

export async function getSkills(): Promise<Skill[]> {
  // Mock data - replace with actual API call
  return [
    {
      id: "1",
      name: "React",
      description: "Frontend development with React",
      iconName: "code-2",
      category: "technical",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    // Add more skills as needed
  ];
}

export async function getExperience(): Promise<Experience[]> {
  // Mock data - replace with actual API call
  return [
    {
      id: "1",
      title: "Senior Software Engineer",
      company: "Tech Company",
      period: "2020 - Present",
      description: "Leading development of web applications.",
      type: "work",
    },
    // Add more experience items as needed
  ];
}

export async function getProjects(): Promise<Project[]> {
  // Mock data - replace with actual API call
  return [
    {
      id: "1",
      title: "Portfolio Website",
      slug: "portfolio-website",
      summary: "A modern portfolio website built with Next.js and Material-UI.",
      description: [
        "Built with Next.js 13+ and App Router",
        "Styled with Material-UI and CSS Modules",
        "Optimized for performance and SEO",
      ],
      coverImage: "/images/placeholder.jpg",
      technologies: ["Next.js", "React", "TypeScript", "Material-UI"],
      gallery: [
        {
          id: "1",
          url: "/images/portfolio-1.jpg",
          alt: "Portfolio Screenshot 1",
          caption: "Home page design",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: "2",
          url: "/images/portfolio-2.jpg",
          alt: "Portfolio Screenshot 2",
          caption: "Projects page",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: "3",
          url: "/images/portfolio-3.jpg",
          alt: "Portfolio Screenshot 3",
          caption: "Contact page",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ],
      links: {
        live: "https://portfolio.example.com",
        github: "https://github.com/example/portfolio",
      },
      category: ["web-development"],
      featured: true,
      skills: ["frontend", "react", "typescript"],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    // Add more projects as needed
  ];
}

export async function getFeaturedProjects(): Promise<Project[]> {
  // For now, we'll just return all projects
  // In a real application, you might want to add a 'featured' flag to projects
  // and filter based on that
  const projects = await getProjects();
  return projects.slice(0, 3); // Return first 3 projects as featured
}

export async function getProjectWithRelations(
  slug: string
): Promise<
  (Project & { technologyDetails: Technology[]; skillDetails: Skill[] }) | null
> {
  const projects = await getProjects();
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return null;
  }

  return {
    ...project,
    technologyDetails: project.technologies.map((tech) => ({
      id: tech.toLowerCase().replace(/\s+/g, "-"),
      name: tech,
      category: "framework",
      icon: "code-2",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })),
    skillDetails: [], // Add skill details if needed
  };
}
