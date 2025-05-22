"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import { usePortfolioData } from "@/hooks/usePortfolioData";
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemButton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { ThemeSelector } from "@/components/ThemeSelector";
import styles from "./styles/HeaderVertical.module.css";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface HeaderVerticalProps {
  activeSection: string;
  onSectionChange: (sectionId: string) => void;
}

const HeaderVertical: React.FC<HeaderVerticalProps> = ({
  activeSection,
  onSectionChange,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { profile } = usePortfolioData();

  const sections = [
    { id: "about", label: "About" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ];

  if (isMobile) return null;

  return (
    <Box component="nav" className={styles.verticalHeader}>
      {profile && (
        <Typography
          variant="h1"
          sx={{ fontSize: "3rem", lineHeight: 1 }}
          className={styles.titleName}
        >
          {profile.name}
        </Typography>
      )}
      <List>
        {sections.map((section) => (
          <ListItem key={section.id} disablePadding>
            <ListItemButton
              onClick={(e) => {
                e.preventDefault();
                onSectionChange(section.id);
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
                padding: "12px 20px",
                borderRadius: "0 24px 24px 0",
                transition: "all 0.3s ease",
                marginBottom: 1,
                "&:hover": {
                  backgroundColor: theme.palette.primary.main + "15",
                  transform: "translateX(4px)",
                },
                "&.active": {
                  backgroundColor: theme.palette.primary.main + "20",
                  transform: "translateX(4px)",
                },
              }}
            >
              <Box
                className={styles.indicator}
                sx={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  backgroundColor:
                    activeSection === section.id
                      ? theme.palette.primary.main
                      : theme.palette.text.secondary + "40",
                  transition: "all 0.3s ease",
                  transform:
                    activeSection === section.id ? "scale(1.2)" : "scale(1)",
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
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default HeaderVertical;
