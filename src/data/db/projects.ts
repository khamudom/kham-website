import { Project } from "../types";

export const projects: Project[] = [
  {
    id: "xbox-dashboard",
    title: "Xbox Dashboard",
    slug: "xbox-dashboard",
    summary:
      "Led UI/UX development for Xbox Dashboard from Xbox One launch to Series X",
    description: [
      "Created and owned UI/UX experiences on the Xbox Dashboard, from the launch of Xbox One to Xbox Series X",
      "Collaborated with the console design team to champion design vision and understand platform capabilities",
      "Implemented performance optimizations for smooth animations across different Xbox hardware",
      "Developed reusable component library used across multiple dashboard features",
    ],
    coverImage:
      "https://images.unsplash.com/photo-1621259182978-fbf433fd6eb7?auto=format&fit=crop&q=80",
    gallery: [
      {
        id: "xbox-1",
        url: "https://images.unsplash.com/photo-1605901309584-818e25960a8f?auto=format&fit=crop&q=80",
        alt: "Xbox Dashboard Home Screen",
        caption: "Redesigned home screen interface with improved navigation",
        createdAt: "2024-02-20T00:00:00Z",
        updatedAt: "2024-02-20T00:00:00Z",
      },
      {
        id: "xbox-2",
        url: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?auto=format&fit=crop&q=80",
        alt: "Xbox Store Interface",
        caption: "Modern store experience with personalized recommendations",
        createdAt: "2024-02-20T00:00:00Z",
        updatedAt: "2024-02-20T00:00:00Z",
      },
    ],
    category: "enterprise",
    featured: true,
    technologies: ["typescript", "web-components"],
    skills: ["enterprise-dev", "design-systems"],
    links: {
      live: "https://www.xbox.com/en-US/",
    },
    metrics: {
      users: 100000000,
    },
    createdAt: "2024-02-20T00:00:00Z",
    updatedAt: "2024-02-20T00:00:00Z",
  },
  {
    id: "fast",
    title: "FAST",
    slug: "fast",
    summary: "Contributed to Microsoft's open-source web component framework",
    description: [
      "Core contributor to FAST, Microsoft's open-source web component framework",
      "Built and maintained accessible components using Web Component standards",
      "Implemented cross-browser compatibility and performance optimizations",
      "Created comprehensive documentation and component examples",
    ],
    coverImage:
      "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?auto=format&fit=crop&q=80",
    category: "open-source",
    featured: true,
    technologies: ["web-components", "typescript"],
    skills: ["design-systems", "web-standards"],
    links: {
      github: "https://github.com/microsoft/fast/",
      live: "https://www.fast.design/",
      documentation: "https://www.fast.design/docs/introduction",
    },
    metrics: {
      stars: 7800,
      downloads: 1000000,
    },
    createdAt: "2024-02-20T00:00:00Z",
    updatedAt: "2024-02-20T00:00:00Z",
  },
  {
    id: "edge-web-components",
    title: "Microsoft Edge Web Components",
    slug: "edge-web-components",
    summary: "Building core web components for Microsoft Edge browser",
    description: [
      "Led the development of reusable web components for Microsoft Edge browser interface",
      "Implemented performance optimizations resulting in 40% faster load times",
      "Created comprehensive documentation and component guidelines",
      "Ensured accessibility compliance across all components",
    ],
    coverImage:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80",
    category: "enterprise",
    featured: true,
    technologies: ["web-components", "typescript"],
    skills: ["design-systems", "web-standards"],
    links: {
      documentation: "https://learn.microsoft.com/en-us/microsoft-edge/",
      live: "https://www.microsoft.com/en-us/edge",
    },
    createdAt: "2024-02-20T00:00:00Z",
    updatedAt: "2024-02-20T00:00:00Z",
  },
  {
    id: "game-store",
    title: "Game On Store",
    slug: "game-store",
    summary:
      "A modern e-commerce platform for video games with advanced features",
    description: [
      "Developed a full-featured e-commerce platform for video games",
      "Implemented real-time inventory management and dynamic pricing",
      "Created an advanced search and filtering system",
      "Built a responsive and accessible user interface",
    ],
    coverImage:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80",
    category: "personal",
    featured: false,
    technologies: ["typescript", "react"],
    skills: ["enterprise-dev", "web-standards"],
    links: {
      github: "https://github.com/example/game-store",
      live: "https://game-store-demo.example.com",
    },
    createdAt: "2024-02-20T00:00:00Z",
    updatedAt: "2024-02-20T00:00:00Z",
  },
  {
    id: "3d-portfolio",
    title: "3D Portfolio Showcase",
    slug: "3d-portfolio",
    summary: "Interactive 3D portfolio website with WebGL animations",
    description: [
      "Created an immersive 3D portfolio experience using Three.js and React",
      "Implemented custom shaders and animations for unique visual effects",
      "Optimized 3D performance across different devices and browsers",
      "Integrated dynamic content management system",
    ],
    coverImage:
      "https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&q=80",
    category: "personal",
    featured: false,
    technologies: ["typescript", "react"],
    skills: ["web-standards", "design-systems"],
    links: {
      github: "https://github.com/example/3d-portfolio",
      live: "https://3d-portfolio-demo.example.com",
    },
    createdAt: "2024-02-20T00:00:00Z",
    updatedAt: "2024-02-20T00:00:00Z",
  },
  {
    id: "property-pulse",
    title: "Property Pulse",
    slug: "property-pulse",
    summary: "Real estate platform with real-time market analytics",
    description: [
      "Built a comprehensive real estate platform with advanced search capabilities",
      "Implemented real-time market analytics and price prediction",
      "Created an interactive map interface for property exploration",
      "Developed a mobile-first, responsive design",
    ],
    coverImage:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80",
    category: "personal",
    featured: false,
    technologies: ["typescript", "react"],
    skills: ["enterprise-dev", "design-systems"],
    links: {
      github: "https://github.com/example/property-pulse",
      live: "https://property-pulse-demo.example.com",
    },
    createdAt: "2024-02-20T00:00:00Z",
    updatedAt: "2024-02-20T00:00:00Z",
  },
];
