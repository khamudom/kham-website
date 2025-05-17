import {
  getPortfolioData,
  getProjects,
  getProjectById,
  getExperience,
  getSkills,
  getAbout,
} from "../utils/portfolioService";

// Re-export everything from portfolioService
export {
  getPortfolioData,
  getProjects,
  getProjectById,
  getExperience,
  getSkills,
  getAbout,
};

// Types
export type {
  Profile,
  Project,
  Technology,
  Skill,
  Experience,
  ContactInfo,
  Image,
} from "./types";

// Helper function for featured projects
export const getFeaturedProjects = async () => {
  const projects = await getProjects();
  return projects.slice(0, 3); // Return first 3 projects as featured
};
