"use client";

import React, { memo } from "react";
import { useTheme } from "@mui/material/styles";
import { usePortfolioData } from "@/hooks/usePortfolioData";
import {
  Box,
  List,
  ListItemButton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import RotatingTitle from "@/components/RotatingTitle";
import styles from "./HeaderVertical.module.css";

interface HeaderVerticalProps {
  activeSection: string;
  onSectionChange: (sectionId: string) => void;
}

const rotatingTitles = [
  "Frontend Engineer",
  "Design Systems Developer",
  "Component Library Expert",
  "Web Standards Advocate",
  "Web Developer",
];

const HeaderContent = memo(() => {
  const { profile } = usePortfolioData();

  return (
    <div className={styles.headerContent}>
      {profile && (
        <Typography
          variant="h1"
          sx={{ fontSize: "3rem", lineHeight: 1 }}
          className={styles.titleName}
        >
          {profile.name}
        </Typography>
      )}
      <RotatingTitle titles={rotatingTitles} interval={5000} />
    </div>
  );
});

HeaderContent.displayName = "HeaderContent";

const NavItem = memo(
  ({
    section,
    activeSection,
    theme,
  }: {
    section: { id: string; label: string };
    activeSection: string;
    theme: any;
  }) => (
    <ListItemButton
      onClick={(e) => {
        e.preventDefault();
        const element = document.getElementById(section.id);
        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }}
      className={`${styles.navItem} ${
        activeSection === section.id ? styles.active : ""
      }`}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1.5,
        borderRadius: "0 24px 24px 0",
        transition: "all 0.3s ease",
        marginBottom: 1,
        paddingInlineStart: "0",
        "&:hover": {
          backgroundColor: "transparent",
        },
      }}
    >
      <Box
        className={`${styles.indicator} ${styles.leftIndicator}`}
        sx={{
          width: activeSection === section.id ? "30px" : "8px",
          height: "1px",
          backgroundColor:
            activeSection === section.id
              ? theme.palette.primary.main
              : theme.palette.text.secondary,
          transition: "all 0.3s ease",
        }}
      />
      <Typography
        variant="body1"
        sx={{
          color:
            activeSection === section.id
              ? theme.palette.primary.main
              : theme.palette.text.secondary,
          fontWeight: activeSection === section.id ? 600 : 400,
          fontSize: "1rem",
          letterSpacing: "0.5px",
          transition: "all 0.3s ease",
        }}
      >
        {section.label}
      </Typography>
      <Box
        className={styles.indicator}
        sx={{
          width: activeSection === section.id ? "200px" : "0",
          height: "1px",
          backgroundColor:
            activeSection === section.id
              ? theme.palette.primary.main
              : theme.palette.text.secondary,
          transition: "all 0.3s ease",
          transitionDelay: activeSection === section.id ? "0.15s" : "0s",
        }}
      />
    </ListItemButton>
  )
);

NavItem.displayName = "NavItem";

const HeaderVertical: React.FC<HeaderVerticalProps> = memo(
  ({ activeSection, onSectionChange }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    const sections = [
      { id: "about", label: "About" },
      { id: "projects", label: "Projects" },
      { id: "contact", label: "Contact" },
    ];

    if (isMobile) return null;

    return (
      <div className={styles.verticalHeader}>
        <HeaderContent />
        <nav>
          <List>
            {sections.map((section) => (
              <NavItem
                key={section.id}
                section={section}
                activeSection={activeSection}
                theme={theme}
              />
            ))}
          </List>
        </nav>
      </div>
    );
  }
);

HeaderVertical.displayName = "HeaderVertical";

export default HeaderVertical;
