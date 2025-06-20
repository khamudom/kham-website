import React, { useMemo } from "react";
import { Typography } from "@mui/material";
import { Code2, Layout, Wrench } from "lucide-react";
import styles from "../app/Home.module.css";
import type { Skill } from "@/types/portfolio";

interface SkillsDisplayProps {
  skills: {
    languages: Skill[];
    frameworks: Skill[];
    tools: Skill[];
  };
}

/**
 * SkillsDisplay Component
 * Displays a categorized list of skills with appropriate icons and formatting
 * @param {SkillsDisplayProps} props - Component props containing grouped skills object
 */
export const SkillsDisplay: React.FC<SkillsDisplayProps> = ({ skills }) => {
  const categories = useMemo(
    () => [
      {
        name: "languages",
        displayName: "Programming Languages",
        icon: Code2,
        skills: skills.languages,
      },
      {
        name: "frameworks",
        displayName: "Libraries & Frameworks",
        icon: Layout,
        skills: skills.frameworks,
      },
      {
        name: "tools",
        displayName: "Tools & Platforms",
        icon: Wrench,
        skills: skills.tools,
      },
    ],
    [skills]
  );

  return (
    <div className={styles.skillsContainer}>
      {/* Map through each category and render its section */}
      {categories.map(
        ({ name, displayName, icon: Icon, skills: categorySkills }) => (
          <div key={name} className={styles.skillsCategory}>
            {/* Category header with icon and title */}
            <div className={styles.categoryHeader}>
              <Icon className={styles.categoryIcon} size={24} />
              <Typography variant="h6">{displayName}</Typography>
            </div>

            {/* Skills list for current category */}
            <div className={styles.skillsList}>
              {[...categorySkills]
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((skill, index, array) => (
                  <React.Fragment key={skill.id}>
                    {/* Individual skill item */}
                    <div className={styles.skillItem}>
                      <span>{skill.name}</span>
                    </div>
                    {/* Add bullet point between skills, but not after the last one */}
                    {index < array.length - 1 && (
                      <span className={styles.bullet}>•</span>
                    )}
                  </React.Fragment>
                ))}
            </div>
          </div>
        )
      )}
    </div>
  );
};
