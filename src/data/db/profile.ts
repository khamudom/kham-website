import { Profile } from "../types";

export const profile: Profile = {
  id: "main-profile",
  name: "Kham Udom",
  title: "Frontend UX Engineer",
  summary:
    "Combining design, animation and technology to build and implement accessible and inclusive user interfaces and experiences in prototypes and web applications.",
  bio: [
    "Experienced Frontend UX Engineer specializing in enterprise-scale applications and design systems",
    "Currently focused on developing reusable component libraries and contributing to design systems at Microsoft",
    "Passionate about web standards, accessibility, and performance optimization",
  ],
  location: "San Francisco, CA",
  email: "contact@example.com",
  socialLinks: {
    github: "https://github.com/khamudom",
    linkedin: "https://linkedin.com/in/khamudom",
  },
  skills: ["enterprise-dev", "design-systems", "web-standards"],
  experience: [
    {
      id: "ms-edge",
      company: "Microsoft",
      title: "Frontend UX Engineer",
      startDate: "2021-12-01",
      endDate: "2022-11-30",
      current: false,
      description: [
        "Led development of web components for Microsoft Edge",
        "Implemented accessibility standards across component library",
      ],
      technologies: ["web-components", "typescript"],
      achievements: [
        "Reduced component bundle size by 35%",
        "Implemented new design system across 50+ components",
      ],
      createdAt: "2024-02-20T00:00:00Z",
      updatedAt: "2024-02-20T00:00:00Z",
    },
  ],
  createdAt: "2024-02-20T00:00:00Z",
  updatedAt: "2024-02-20T00:00:00Z",
};
