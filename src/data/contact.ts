import type { LucideIcon } from "lucide-react";
import { Github, Globe } from "lucide-react";

export interface ContactInfo {
  title: string;
  description: string;
  email: string;
  phone?: string;
  location: string;
  socialLinks: {
    name: string;
    url: string;
    icon: LucideIcon;
  }[];
}

export async function getContactInfo(): Promise<ContactInfo> {
  return {
    title: "Get in Touch",
    description:
      "I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.",
    email: "your.email@example.com",
    location: "Your Location",
    socialLinks: [
      {
        name: "GitHub",
        url: "https://github.com/yourusername",
        icon: Github,
      },
      {
        name: "LinkedIn",
        url: "https://linkedin.com/in/yourusername",
        icon: Globe,
      },
    ],
  };
}
