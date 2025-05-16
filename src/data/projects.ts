import { Github, Globe } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface ProjectLink {
  id: string;
  title: string;
  href: string;
  icon: LucideIcon;
}

export interface Project {
  id: string;
  category: "product" | "open-source" | "web-development";
  featured?: boolean;
  title: string;
  description: string;
  longDescription?: string[];
  image: string;
  tags: string[];
  tech?: string[];
  features?: string[];
  challenges?: string;
  links?: ProjectLink[];
}

export const projects: Project[] = [
  {
    id: "xbox-dashboard",
    category: "product",
    featured: true,
    title: "Xbox Dashboard",
    description:
      "Created and owned UI/UX experiences on the Xbox Dashboard, from Xbox One launch to Xbox One SX release.",
    longDescription: [
      "Create, contribute, iterate and own the UI and UX experiences on the Xbox Dashboard, from the launch of the Xbox One to the release of the Xbox One SX",
      "Collaborate with the console design team to champion the design and help the team understand the product development capabilities and limits.",
      "Collaborate with the console development product team to convey the design vision. Pair program with the engineers, where I would focus on implementing the UI and UX, while they focused on the functionality of the product.",
    ],
    image:
      "https://images.unsplash.com/photo-1621259182978-fbf433fd6eb7?auto=format&fit=crop&q=80",
    tags: ["XAML", "MVVM", "UI/UX", "Xbox"],
    tech: ["XAML", "XAML data binding", "MVVM consumption", "Compass"],
    features: [
      "Responsive and fluid UI animations",
      "Real-time content updates",
      "Personalized user experience",
      "Multi-language support",
      "Accessibility features",
    ],
    challenges:
      "One of the main challenges was optimizing performance while maintaining smooth animations and transitions across different Xbox hardware capabilities. We implemented sophisticated caching mechanisms and lazy loading strategies to ensure a consistent experience.",
    links: [
      {
        id: "website",
        title: "Website",
        href: "https://www.xbox.com/en-US/",
        icon: Globe,
      },
    ],
  },
  {
    id: "fast",
    category: "open-source",
    featured: true,
    title: "FAST",
    description:
      "Contributed to building and maintaining accessible components using React and Web Component technology.",
    longDescription: [
      "An open source project. I contributed to building and maintaining accessible components using React and Web Component technology.",
      "Collaborate with design and engineering team to own, build and maintain Web Components for multiple web experiences for Microsoft Edge using the FAST and Fluent UI web components.",
    ],
    image:
      "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?auto=format&fit=crop&q=80",
    tags: ["Web Components", "TypeScript", "React", "FAST"],
    tech: ["TypeScript", "Web Component", "React", "HTML", "CSS"],
    features: [
      "Cross-framework compatibility",
      "Built-in accessibility features",
      "Customizable design system",
      "Performance optimized",
      "Extensive component library",
    ],
    challenges:
      "Ensuring cross-browser compatibility and maintaining performance while supporting multiple frameworks was a significant challenge. We implemented a robust testing strategy and performance monitoring system.",
    links: [
      {
        id: "website",
        title: "Website",
        href: "https://www.fast.design/",
        icon: Globe,
      },
      {
        id: "github",
        title: "GitHub",
        href: "https://github.com/microsoft/fast/",
        icon: Github,
      },
    ],
  },
  {
    id: "edge",
    category: "product",
    featured: true,
    title: "Microsoft Edge",
    description:
      "Collaborated with design and engineering teams to build and maintain Web Components for Microsoft Edge.",
    longDescription: [
      "Collaborate closely with design and engineering partners, to build and maintain Web Components for multiple web experiences for Microsoft Edge.",
      "Implement and maintain accessibility standards across all components.",
      "Optimize performance and ensure cross-browser compatibility.",
    ],
    image:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80",
    tags: ["FAST", "Web Components", "TypeScript", "Chromium"],
    tech: ["FAST", "TypeScript", "Web Component", "Chromium", "Gerrit"],
    features: [
      "Custom Web Components",
      "Cross-browser compatibility",
      "Performance optimization",
      "Accessibility compliance",
      "Design system integration",
    ],
    challenges:
      "Integrating Web Components within the Chromium architecture while maintaining performance and accessibility standards required careful consideration of browser APIs and optimization techniques.",
    links: [
      {
        id: "website",
        title: "Website",
        href: "https://www.microsoft.com/en-us/edge",
        icon: Globe,
      },
    ],
  },
  {
    id: "game-store",
    category: "web-development",
    title: "Game On Store",
    description:
      "A responsive online game store UI implementation featuring modern design and animations.",
    longDescription: [
      "Developed a modern e-commerce platform for video games with a focus on user experience and performance.",
      "Implemented responsive design principles and modern animation techniques.",
      "Created a robust component library for consistent UI elements.",
    ],
    image:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80",
    tags: ["React", "TypeScript", "CSS"],
    tech: ["React", "TypeScript", "CSS Modules", "Framer Motion"],
    features: [
      "Responsive design",
      "Modern animations",
      "Advanced filtering",
      "Search functionality",
      "Cart management",
    ],
    challenges:
      "Implementing smooth animations while maintaining performance across different devices required careful optimization of render cycles and animation techniques.",
    links: [
      {
        id: "github",
        title: "GitHub",
        href: "https://github.com/example/game-store",
        icon: Github,
      },
    ],
  },
  {
    id: "3d-portfolio",
    category: "web-development",
    title: "3D Portfolio",
    description:
      "An interactive 3D portfolio website showcasing advanced web technologies and creative design implementation.",
    longDescription: [
      "Created an immersive 3D portfolio experience using Three.js and React.",
      "Implemented custom shaders and animations for unique visual effects.",
      "Optimized 3D performance across different devices and browsers.",
    ],
    image:
      "https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&q=80",
    tags: ["React", "Three.js", "TypeScript", "Tailwind"],
    tech: ["React", "Three.js", "TypeScript", "Tailwind CSS"],
    features: [
      "3D scene management",
      "Custom shaders",
      "Interactive animations",
      "Responsive design",
      "Performance optimization",
    ],
    challenges:
      "Balancing visual fidelity with performance across different devices required implementing level-of-detail systems and optimizing 3D assets.",
    links: [
      {
        id: "github",
        title: "GitHub",
        href: "https://github.com/example/3d-portfolio",
        icon: Github,
      },
    ],
  },
  {
    id: "property-pulse",
    category: "web-development",
    title: "Property Pulse",
    description:
      "A modern real estate platform featuring property listings and user-friendly interface.",
    longDescription: [
      "Built a comprehensive real estate platform with advanced search and filtering capabilities.",
      "Implemented real-time updates and notifications for property listings.",
      "Created an intuitive user interface for property management.",
    ],
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80",
    tags: ["TypeScript", "HTML5", "CSS"],
    tech: ["TypeScript", "React", "Node.js", "PostgreSQL"],
    features: [
      "Advanced search filters",
      "Real-time updates",
      "Interactive maps",
      "Saved searches",
      "Property comparisons",
    ],
    challenges:
      "Implementing real-time updates while maintaining application performance required careful consideration of data synchronization and state management.",
    links: [
      {
        id: "github",
        title: "GitHub",
        href: "https://github.com/example/property-pulse",
        icon: Github,
      },
    ],
  },
];

export const getFeaturedProjects = () =>
  projects.filter((project) => project.featured);
export const getProjectById = (id: string) =>
  projects.find((project) => project.id === id);
export const getProjectsByCategory = (category: string) =>
  category === "all"
    ? projects
    : projects.filter((project) => project.category === category);
