export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  coverImage: string;
  technologies: string[];
  features?: string[];
  githubUrl?: string;
  liveUrl?: string;
}

// This is a mock function. In a real application, you would fetch this data from an API
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  // Mock data - replace with actual API call
  const projects: Project[] = [
    {
      id: "1",
      title: "Portfolio Website",
      slug: "portfolio-website",
      description:
        "A modern portfolio website built with Next.js and Material-UI.",
      coverImage: "/images/portfolio-cover.webp",
      technologies: ["Next.js", "TypeScript", "Material-UI", "GSAP"],
      features: [
        "Responsive design",
        "Dark mode support",
        "Smooth animations",
        "Project showcase",
      ],
      githubUrl: "https://github.com/yourusername/portfolio",
      liveUrl: "https://yourportfolio.com",
    },
    // Add more projects as needed
  ];

  return projects.find((project) => project.slug === slug) || null;
}
