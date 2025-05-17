import portfolioData from "./portfolio.json";
import type { Project, Technology, Skill, Profile, Experience } from "./types";

export async function getProjects(): Promise<Project[]> {
  return portfolioData.projects.map((project) => ({
    id: project.id,
    title: project.title,
    slug: project.id.toLowerCase().replace(/\s+/g, "-"),
    summary: project.description,
    description: [project.description],
    coverImage: project.imageUrl,
    technologies: project.technologies,
    skills: [], // Add skills if needed
    category: ["personal"], // Default to personal, adjust as needed
    links: {
      live: project.liveUrl,
      github: project.githubUrl,
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }));
}

export async function getProjectWithRelations(slug: string): Promise<
  | (Project & {
      technologyDetails: Technology[];
      skillDetails: Skill[];
    })
  | null
> {
  const project = (await getProjects()).find((p) => p.slug === slug);
  if (!project) return null;

  return {
    ...project,
    technologyDetails: project.technologies.map((tech) => ({
      id: tech.toLowerCase().replace(/\s+/g, "-"),
      name: tech,
      description: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })),
    skillDetails: [], // Add skill details if needed
  };
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const projects = await getProjects();
  return projects.slice(0, 3); // Return first 3 projects as featured
}

export async function getProfile(): Promise<Profile> {
  return {
    id: "1",
    name: "Kham Udom",
    title: "Frontend UX Engineer",
    bio: [portfolioData.about.bio],
    coverImage: "/images/placeholder.jpg",
  };
}

export async function getSkills(): Promise<Skill[]> {
  return portfolioData.skills.map((skill) => ({
    id: skill.id,
    name: skill.name,
    description: `${skill.name} - ${skill.category}`,
    iconName:
      skill.category === "frontend"
        ? "code-2"
        : skill.category === "backend"
        ? "server"
        : skill.category === "tools"
        ? "wrench"
        : "code-2",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }));
}

export async function getExperience(): Promise<Experience[]> {
  return portfolioData.experience.map((exp) => ({
    id: exp.id,
    title: exp.position,
    company: exp.company,
    period: `${exp.startDate} - ${exp.endDate || "Present"}`,
    description: exp.description.join("\n"),
    type: "work",
  }));
}
