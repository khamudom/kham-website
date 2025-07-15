/**
 * Projects Page Component
 * 
 * This component displays a portfolio of projects with filtering capabilities.
 * Features include:
 * - Dynamic project loading from API
 * - Grouping by year or category
 * - GSAP animations for smooth transitions
 * - Contact form for project inquiries
 * - Responsive design with Material-UI components
 * 
 * The page fetches project data, allows users to filter projects by year or category,
 * displays them in a grid layout with animations, and includes a service section
 * with a contact form for potential clients.
 */

"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useApi } from "@/hooks/useApi";
import { fetchProjects } from "@/utils/api";
import type { Project } from "@/types/portfolio";
import { LoadingSpinner } from "@/components/LoadingSpinner/LoadingSpinner";
import { ErrorMessage } from "@/components/ErrorMessage/ErrorMessage";
import {
  Typography,
  Container,
  Box,
  Breadcrumbs,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  TextField,
  Snackbar,
  Alert,
} from "@mui/material";
import ProjectTile from "@/components/ProjectTile/ProjectTile";
import styles from "./Projects.module.css";
import CodeIcon from "@mui/icons-material/Code";
import WebIcon from "@mui/icons-material/Web";
import BusinessIcon from "@mui/icons-material/Business";
import { Button } from "@/design-system/components/Button";
import { ThemeSelector } from "@/components/ThemeSelector";

// Register GSAP ScrollTrigger plugin for scroll-based animations
gsap.registerPlugin(ScrollTrigger);

export default function Portfolio() {
  // Fetch projects data using custom API hook
  const { data: projectsResponse, loading, error } = useApi(fetchProjects);
  
  // State for grouping projects (by year or category)
  const [groupBy, setGroupBy] = useState<"year" | "category">("year");
  
  // Refs for GSAP animations and scroll triggers
  const projectCardsRef = useRef<HTMLDivElement>(null);
  const contactFormRef = useRef<HTMLDivElement>(null);
  const serviceSectionRef = useRef<HTMLDivElement>(null);

  // Contact form state management
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Snackbar state for form submission feedback
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  // Material-UI TextField styling for consistent hover effects
  const textFieldStyles = {
    "& .MuiOutlinedInput-root": {
      "&:hover fieldset": {
        borderColor: (theme: any) => theme.palette.primary.main,
      },
    },
  };

  // Handle form input changes
  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle contact form submission via Formspree
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT!,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        setSnackbar({
          open: true,
          message: "Message sent successfully!",
          severity: "success",
        });
        // Reset form after successful submission
        setFormData({
          name: "",
          email: "",
          message: "",
        });
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Failed to send message. Please try again later.",
        severity: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Close snackbar notification
  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  // Extract and sort unique years from projects data
  const years = Array.from(
    new Set(projectsResponse?.data?.data?.map((project) => project.year) || [])
  ).sort((a, b) => {
    const getSortYear = (str: string) => {
      const parts = str.split("-");
      const last = parts[parts.length - 1];
      const num = Number(last);
      return isNaN(num) ? 0 : num;
    };
    return getSortYear(b) - getSortYear(a);
  });

  // Define category order for consistent sorting
  const categoryOrder = [
    "Web Development",
    "Product Development",
    "Open Source",
    "Personal Project",
  ];
  
  // Extract and sort unique categories from projects data
  const categories = Array.from(
    new Set(
      projectsResponse?.data?.data?.flatMap((project) => project.category || [])
    )
  ).sort((a, b) => {
    const indexA = categoryOrder.indexOf(a);
    const indexB = categoryOrder.indexOf(b);
    return indexA - indexB;
  });

  // Group projects by year or category based on user selection
  let groupedProjects: Record<string, Project[]> = {};
  if (projectsResponse?.data?.data) {
    if (groupBy === "year") {
      groupedProjects = years.reduce((acc, year) => {
        acc[year] = projectsResponse?.data?.data
          .filter((p) => p.year === year)
          .sort((a, b) => (a.order ?? 99) - (b.order ?? 99) || a.id.localeCompare(b.id)); // Sort by 'order' if present, then by ID
        return acc;
      }, {} as Record<string, Project[]>);
    } else {
      groupedProjects = categoryOrder.reduce((acc, category) => {
        acc[category] = projectsResponse?.data?.data
          .filter((p) => p.category?.includes(category))
          .sort((a, b) => (a.order ?? 99) - (b.order ?? 99) || a.id.localeCompare(b.id)); // Sort by 'order' if present, then by ID
        return acc;
      }, {} as Record<string, Project[]>);
    }
  }

  // GSAP animation for project groups (header + cards)
  useGSAP(() => {
    if (!projectCardsRef.current) return;
    
    // Target the Box elements that contain both header and cards
    const groups = projectCardsRef.current.querySelectorAll('div[class*="MuiBox-root"]');
    
    gsap.set(groups, { opacity: 0, y: 30 });
    gsap.to(groups, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      stagger: 0.1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: projectCardsRef.current,
        start: "top bottom-=100",
        toggleActions: "play none none reverse",
      },
    });
  }, [groupBy, projectsResponse]);

  // Loading and error states
  if (loading) return <LoadingSpinner size="large" />;
  if (error) {
    return (
      <ErrorMessage
        message="Failed to load projects. Please try again later."
        onRetry={() => window.location.reload()}
      />
    );
  }
  if (!projectsResponse?.data?.data) return null;

  return (
    <>
      <header className={styles.stickyHeader}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            maxWidth: "1280px",
            padding: "0 24px",
          }}
        >
          <Breadcrumbs aria-label="breadcrumb">
            <Link href="/" passHref className={styles.breadcrumbLink}>
              <Typography variant="body2" color="text.secondary">
                Home
              </Typography>
            </Link>
            <Typography variant="body2" color="text.primary">
              Projects
            </Typography>
          </Breadcrumbs>
        </div>
      </header>
      
      <Box component="section" sx={{ py: 9 }}>
        <Container maxWidth={false} sx={{ maxWidth: "1280px", margin: "0 auto" }}>
          {/* Page header section */}
          <div>
            <Typography
              variant="h1"
              gutterBottom
              sx={{ fontSize: "3rem", lineHeight: 1 }}
            >
              Projects
            </Typography>
            <Typography variant="body1" mb={4}>
              A collection of my work, from enterprise applications to personal
              projects.
            </Typography>

            {/* Filter dropdown for grouping projects */}
            <Box sx={{ mb: 6 }}>
              <FormControl sx={{ minWidth: 200 }}>
                <InputLabel>Filter by</InputLabel>
                <Select
                  value={groupBy}
                  label="Filter by"
                  onChange={(e) =>
                    setGroupBy(e.target.value as "year" | "category")
                  }
                >
                  <MenuItem value="year">Year</MenuItem>
                  <MenuItem value="category">Category</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </div>

          {/* Projects grid with animations */}
          <div ref={projectCardsRef}>
            {groupBy === "year"
              ? years.map(
                  (year) =>
                    groupedProjects[year] &&
                    groupedProjects[year].length > 0 && (
                                <Box key={year} sx={{ mb: 6 }}>
            <Box>
                          <Typography
                            variant="h2"
                            sx={{ fontSize: "1.5rem", mb: 3 }}
                          >
                            {year}
                          </Typography>
                          <Box
                            sx={{
                              display: "flex",
                              flexWrap: "wrap",
                              rowGap: "20px",
                              justifyContent: "flex-start",
                              alignItems: "flex-start",
                            }}
                          >
                            {groupedProjects[year].map((item) => (
                              <Box
                                key={item.id}
                                className={styles.projectItem}
                                sx={{
                                  flex: {
                                    xs: "none",
                                    width: "100%",
                                    sm: "0 1 340px",
                                  },
                                  maxWidth: "100%",
                                }}
                              >
                                <ProjectTile
                                  width={280}
                                  height={180}
                                  imgSrc={item.coverImage}
                                  imgAlt={item.cardTitle}
                                  title={item.cardTitle}
                                  href={`/projects/${item.slug}`}
                                  target={"_self"}
                                  projectType={item.category?.[0]}
                                />
                              </Box>
                            ))}
                          </Box>
                        </Box>
                      </Box>
                    )
              )
              : categoryOrder.map(
                  (category) =>
                    groupedProjects[category] &&
                    groupedProjects[category].length > 0 && (
                                <Box key={category} sx={{ mb: 6 }}>
            <Box>
                          <Typography
                            variant="h2"
                            sx={{ fontSize: "1.5rem", mb: 3 }}
                          >
                            {category}
                          </Typography>
                          <Box
                            sx={{
                              display: "flex",
                              flexWrap: "wrap",
                              gap: "20px",
                              justifyContent: "flex-start",
                              alignItems: "flex-start",
                            }}
                          >
                            {groupedProjects[category].map((item) => (
                              <Box
                                key={item.id}
                                className={styles.projectItem}
                                sx={{
                                  flex: {
                                    xs: "none",
                                    width: "100%",
                                    sm: "0 1 340px",
                                  },
                                  maxWidth: "100%",
                                }}
                              >
                                <ProjectTile
                                  width={280}
                                  height={180}
                                  imgSrc={item.coverImage}
                                  imgAlt={item.cardTitle}
                                  title={item.cardTitle}
                                  href={`/projects/${item.slug}`}
                                  target={"_self"}
                                  projectType={
                                    groupBy === "category"
                                      ? item.year
                                      : item.category?.[0]
                                  }
                                />
                              </Box>
                            ))}
                          </Box>
                        </Box>
                      </Box>
                    )
              )}
          </div>
        </Container>
        
        {/* Full-width services section */}
        <Box
          ref={serviceSectionRef}
          sx={{
            mt: 12,
            p: { xs: 4, md: 8 },
            background:
              "linear-gradient(145deg, rgba(25, 118, 210, 0.05) 0%, rgba(25, 118, 210, 0.1) 100%)",
            textAlign: "center",
          }}
        >
          <Container maxWidth={false} sx={{ maxWidth: "1280px", margin: "0 auto" }}>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: "2rem", md: "2.5rem" },
                mb: 3,
                fontWeight: 600,
                color: "text.primary",
              }}
            >
              Transform Your Digital Vision Into Reality
            </Typography>

            <Typography
              variant="body1"
              sx={{
                mb: 4,
                maxWidth: "800px",
                mx: "auto",
                color: "text.secondary",
                fontSize: "1.1rem",
                lineHeight: 1.6,
              }}
            >
              From establishing your online presence to building complex
              enterprise solutions, I help businesses and individuals leverage
              technology to achieve their goals. I specialize in creating robust
              design systems and reusable components that ensure consistency,
              scalability, and maintainability across your digital products.
              Let's create something extraordinary together.
            </Typography>

            {/* Service offerings grid */}
            <Grid
              container
              spacing={{ xs: 0, md: 3 }}
              sx={{
                mb: 6,
                mx: "auto",
                "@media (min-width: 900px)": {
                  width: "100%",
                  marginLeft: "auto",
                },
              }}
            >
              {/* Web Development service */}
              <Grid item xs={12} md={4}>
                <Box
                  sx={{
                    p: 3,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <WebIcon
                    sx={{
                      fontSize: "3rem",
                      color: "primary.main",
                      mb: 2,
                    }}
                  />
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                    Web Development
                  </Typography>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    align="center"
                    sx={{ fontSize: { xs: "0.95rem", md: "1rem" } }}
                  >
                    Modern, responsive websites and web applications built with
                    cutting-edge technologies
                  </Typography>
                </Box>
              </Grid>
              
              {/* Enterprise Solutions service */}
              <Grid item xs={12} md={4}>
                <Box
                  sx={{
                    p: 3,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <BusinessIcon
                    sx={{
                      fontSize: "3rem",
                      color: "primary.main",
                      mb: 2,
                    }}
                  />
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                    Business Solutions
                  </Typography>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    align="center"
                    sx={{ fontSize: { xs: "0.95rem", md: "1rem" } }}
                  >
                    Scalable systems, internal tools, and custom applications
                    to streamline operations and boost productivity
                  </Typography>
                </Box>
              </Grid>

              {/* Design System & Components service */}
              <Grid item xs={12} md={4}>
                <Box
                  sx={{
                    p: 3,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <CodeIcon
                    sx={{
                      fontSize: "3rem",
                      color: "primary.main",
                      mb: 2,
                    }}
                  />
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                    Design System & Components
                  </Typography>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    align="center"
                    sx={{ fontSize: { xs: "0.95rem", md: "1rem" } }}
                  >
                    Contribute to existing design systems, build component libraries,
                    and handle styling implementation to accelerate your development
                  </Typography>
                </Box>
              </Grid>
            </Grid>

            {/* Contact form section */}
            <Box
              ref={contactFormRef}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mt: 8,
                mb: 4,
              }}
            >
              <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                  width: "100%",
                  maxWidth: "600px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                }}
              >
                {/* Name input field */}
                <TextField
                  required
                  fullWidth
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  variant="outlined"
                  disabled={isSubmitting}
                  size="small"
                  sx={textFieldStyles}
                />

                {/* Email input field */}
                <TextField
                  required
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  variant="outlined"
                  disabled={isSubmitting}
                  size="small"
                  sx={textFieldStyles}
                />

                {/* Message textarea */}
                <TextField
                  required
                  fullWidth
                  label="Message"
                  name="message"
                  multiline
                  rows={4}
                  value={formData.message}
                  onChange={handleFormChange}
                  variant="outlined"
                  disabled={isSubmitting}
                  size="small"
                  sx={textFieldStyles}
                />

                {/* Submit button */}
                <Button
                  type="submit"
                  variant="contained"
                  size="small"
                  fullWidth
                  sx={{ mt: 2 }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Let's Talk About Your Project"}
                </Button>
              </Box>
            </Box>
          </Container>
        </Box>
        
        {/* Snackbar for form submission feedback */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbar.severity}
            sx={{ width: "100%" }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
      <footer
        style={{
          padding: "0 1rem 4rem 1rem",
          textAlign: "center",
          color: "var(--color-text-secondary)",
        }}
      >
        <p style={{ margin: 0, fontSize: "1rem" }}>
          This website was built using <strong>Next.js</strong>,{" "}
          <strong>TypeScript</strong>, <strong>Material UI</strong>, and{" "}
          <strong>GSAP</strong>. <br /> View the source code on{" "}
          <a
            href="https://github.com/khamudom/kham-website"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.25rem",
              textDecoration: "underline",
            }}
          >
            GitHub
          </a>
        </p>
        <div style={{ marginTop: "1rem" }}>
          <ThemeSelector />
        </div>
      </footer>
    </>
  );
}
