import { technologies } from "../db/technologies";
import { skills } from "../db/skills";
import { projects } from "../db/projects";
import { profile } from "../db/profile";
import type { Technology, Skill, Project, Profile } from "../types";

// Simulate API endpoints with proper error handling and types
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getTechnologies(): Promise<Technology[]> {
  await delay(300); // Simulate network delay
  return technologies;
}

export async function getTechnology(
  id: string
): Promise<Technology | undefined> {
  await delay(300);
  return technologies.find((tech) => tech.id === id);
}

export async function getSkills(): Promise<Skill[]> {
  await delay(300);
  return skills;
}

export async function getSkill(id: string): Promise<Skill | undefined> {
  await delay(300);
  return skills.find((skill) => skill.id === id);
}

export async function getProjects(): Promise<Project[]> {
  await delay(300);
  return projects;
}

export async function getProject(slug: string): Promise<Project | undefined> {
  await delay(300);
  return projects.find((project) => project.slug === slug);
}

export async function getFeaturedProjects(): Promise<Project[]> {
  await delay(300);
  return projects.filter((project) => project.featured);
}

export async function getProfile(): Promise<Profile> {
  await delay(300);
  return profile;
}

// Helper function to resolve relationships
export async function getProjectWithRelations(slug: string): Promise<
  | (Project & {
      technologyDetails: Technology[];
      skillDetails: Skill[];
    })
  | undefined
> {
  const project = await getProject(slug);
  if (!project) return undefined;

  const technologyDetails = await Promise.all(
    project.technologies.map((id) => getTechnology(id))
  );
  const skillDetails = await Promise.all(
    project.skills.map((id) => getSkill(id))
  );

  return {
    ...project,
    technologyDetails: technologyDetails.filter(
      (t): t is Technology => t !== undefined
    ),
    skillDetails: skillDetails.filter((s): s is Skill => s !== undefined),
  };
}
