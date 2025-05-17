import type { Experience, Skill } from "./types";

export interface AboutContent {
  title: string;
  description: string;
  sections: {
    title: string;
    content: string;
  }[];
}

export async function getAboutData(): Promise<{
  content: AboutContent;
  experiences: Experience[];
  skills: Skill[];
}> {
  return {
    content: {
      title: "About Me",
      description:
        "I'm a software engineer with a passion for creating beautiful and functional web experiences.",
      sections: [
        {
          title: "Experience",
          content:
            "Over 10 years of experience in web development, focusing on user experience and performance optimization.",
        },
        {
          title: "Skills",
          content:
            "Expertise in modern web technologies, design systems, and accessibility standards.",
        },
      ],
    },
    experiences: [
      {
        id: "1",
        title: "Senior Software Engineer",
        company: "Tech Company",
        period: "2020 - Present",
        description: "Leading development of web applications.",
        type: "work",
      },
    ],
    skills: [
      {
        id: "1",
        name: "React",
        description: "Frontend development with React",
        iconName: "code-2",
        category: "technical",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ],
  };
}
