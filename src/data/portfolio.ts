import { Project, Profile, Skill } from "../types";

export const profile: Profile = {
  name: "Your Name",
  title: "Full Stack Developer",
  bio: "Passionate developer with experience in building modern web applications.",
  email: "your.email@example.com",
  location: "Your Location",
  socialLinks: {
    github: "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourusername",
    twitter: "https://twitter.com/yourusername",
  },
};

export const projects: Project[] = [
  {
    id: "1",
    title: "Portfolio Website",
    description: "A modern portfolio website built with React and TypeScript.",
    imageUrl: "https://placehold.co/600x400",
    technologies: ["React", "TypeScript", "CSS Modules"],
    githubUrl: "https://github.com/yourusername/portfolio",
    liveUrl: "https://your-portfolio.com",
  },
  {
    id: "2",
    title: "Project Two",
    description: "Another amazing project showcasing your skills.",
    imageUrl: "https://placehold.co/600x400",
    technologies: ["React", "Node.js", "MongoDB"],
    githubUrl: "https://github.com/yourusername/project-two",
  },
];

export const skills: Skill[] = [
  {
    name: "React",
    level: "advanced",
    category: "frontend",
  },
  {
    name: "TypeScript",
    level: "intermediate",
    category: "frontend",
  },
  {
    name: "Node.js",
    level: "intermediate",
    category: "backend",
  },
  {
    name: "Git",
    level: "advanced",
    category: "tools",
  },
];
