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

gsap.registerPlugin(ScrollTrigger);

export default function Portfolio() {
  const { data: projectsResponse, loading, error } = useApi(fetchProjects);
  const [groupBy, setGroupBy] = useState<"year" | "category">("year");
  const projectCardsRef = useRef<HTMLDivElement>(null);
  const contactFormRef = useRef<HTMLDivElement>(null);
  const serviceSectionRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  const textFieldStyles = {
    "& .MuiOutlinedInput-root": {
      "&:hover fieldset": {
        borderColor: (theme: any) => theme.palette.primary.main,
      },
    },
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  // Get unique years and categories from projects
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

  const categoryOrder = [
    "Web Development",
    "Product Development",
    "Open Source",
    "Personal Project",
  ];
  const categories = Array.from(
    new Set(
      projectsResponse?.data?.data?.flatMap((project) => project.category || [])
    )
  ).sort((a, b) => {
    const indexA = categoryOrder.indexOf(a);
    const indexB = categoryOrder.indexOf(b);
    return indexA - indexB;
  });

  // Group projects by year or category
  let groupedProjects: Record<string, Project[]> = {};
  if (projectsResponse?.data?.data) {
    if (groupBy === "year") {
      groupedProjects = years.reduce((acc, year) => {
        acc[year] = projectsResponse?.data?.data.filter((p) => p.year === year);
        return acc;
      }, {} as Record<string, Project[]>);
    } else {
      groupedProjects = categoryOrder.reduce((acc, category) => {
        acc[category] = projectsResponse?.data?.data.filter((p) =>
          p.category?.includes(category)
        );
        return acc;
      }, {} as Record<string, Project[]>);
    }
  }

  // Project cards animation
  useGSAP(() => {
    if (!projectCardsRef.current) return;

    const cards = projectCardsRef.current.querySelectorAll(
      `.${styles.projectItem}`
    );

    gsap.fromTo(
      cards,
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: projectCardsRef.current,
          start: "top bottom-=100",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, [groupBy, projectsResponse]);

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
    <Box component="section" sx={{ py: 9 }}>
      <Container maxWidth={false} sx={{ maxWidth: "1280px", margin: "0 auto" }}>
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 4 }}>
          <Link href="/" passHref className={styles.breadcrumbLink}>
            <Typography variant="body2" color="text.secondary">
              Home
            </Typography>
          </Link>
          <Typography variant="body2" color="text.primary">
            Projects
          </Typography>
        </Breadcrumbs>
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

        <div ref={projectCardsRef}>
          {groupBy === "year"
            ? years.map(
                (year) =>
                  groupedProjects[year] &&
                  groupedProjects[year].length > 0 && (
                    <Box key={year} sx={{ mb: 6 }}>
                      <Typography variant="h2" sx={{ fontSize: "2rem", mb: 3 }}>
                        {year}
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
                  )
              )
            : categoryOrder.map(
                (category) =>
                  groupedProjects[category] &&
                  groupedProjects[category].length > 0 && (
                    <Box key={category} sx={{ mb: 6 }}>
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
                  )
              )}
        </div>

        <Box
          ref={serviceSectionRef}
          sx={{
            mt: 12,
            p: { xs: 4, md: 8 },
            borderRadius: 2,
            background:
              "linear-gradient(145deg, rgba(25, 118, 210, 0.05) 0%, rgba(25, 118, 210, 0.1) 100%)",
            textAlign: "center",
          }}
        >
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
            technology to achieve their goals. Let's create something
            extraordinary together.
          </Typography>

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
                  variant="body2"
                  color="text.secondary"
                  align="center"
                >
                  Modern, responsive websites and web applications built with
                  cutting-edge technologies
                </Typography>
              </Box>
            </Grid>
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
                  Product Development
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  align="center"
                >
                  End-to-end product development from concept to deployment
                </Typography>
              </Box>
            </Grid>
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
                  Enterprise Solutions
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  align="center"
                >
                  Scalable systems and applications for growing businesses
                </Typography>
              </Box>
            </Grid>
          </Grid>

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
        </Box>
      </Container>
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
  );
}
