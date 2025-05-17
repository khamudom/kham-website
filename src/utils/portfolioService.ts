import { PortfolioData, Project, Experience, Skill } from "../types/portfolio";
import portfolioData from "../data/portfolio.json";

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Type assertion for the imported JSON data
const typedPortfolioData = portfolioData as PortfolioData;

export async function getPortfolioData(): Promise<PortfolioData> {
  await delay(300);
  return typedPortfolioData;
}

export async function getProjects(): Promise<Project[]> {
  await delay(300);
  return typedPortfolioData.projects.map((project) => ({
    ...project,
    slug: project.id.toLowerCase().replace(/\s+/g, "-"),
    summary: project.description,
    coverImage: project.imageUrl,
    category: "personal",
    featured: true,
    gallery: [],
    links: {
      live: project.liveUrl,
      github: project.githubUrl,
    },
    skills: project.technologies.map((tech) => tech.toLowerCase()),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }));
}

export async function getProjectById(id: string): Promise<Project | undefined> {
  await delay(300);
  return typedPortfolioData.projects.find(
    (project: Project) => project.id === id
  );
}

export async function getExperience(): Promise<Experience[]> {
  await delay(300);
  return typedPortfolioData.experience;
}

export async function getSkills(): Promise<Skill[]> {
  await delay(300);
  return typedPortfolioData.skills;
}

export async function getAbout(): Promise<PortfolioData["about"]> {
  await delay(300);
  return typedPortfolioData.about;
}
