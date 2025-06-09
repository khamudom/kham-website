"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
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
} from "@mui/material";
import ProjectTile from "@/components/ProjectTile/ProjectTile";
import styles from "@/styles/pages/Projects.module.css";

export default function Portfolio() {
  const { data: projectsResponse, loading, error } = useApi(fetchProjects);
  const [groupBy, setGroupBy] = useState<"year" | "category">("year");
  const projectCardsRef = useRef<HTMLDivElement>(null);

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
          <Link
            href="/"
            passHref
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Typography variant="body2" color="text.secondary">
              Home
            </Typography>
          </Link>
          <Typography variant="body2" color="text.primary">
            Projects
          </Typography>
        </Breadcrumbs>
        <div>
          <Typography variant="h1" sx={{ fontSize: "3rem", lineHeight: 1 }}>
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
                      <Grid container spacing={3}>
                        {groupedProjects[year].map((item) => (
                          <Grid
                            item
                            xs={12}
                            sm={6}
                            md={4}
                            key={item.id}
                            className={styles.projectItem}
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
                          </Grid>
                        ))}
                      </Grid>
                    </Box>
                  )
              )
            : categoryOrder.map(
                (category) =>
                  groupedProjects[category] &&
                  groupedProjects[category].length > 0 && (
                    <Box key={category} sx={{ mb: 6 }}>
                      <Typography variant="h2" sx={{ fontSize: "2rem", mb: 3 }}>
                        {category}
                      </Typography>
                      <Grid container spacing={3}>
                        {groupedProjects[category].map((item) => (
                          <Grid
                            item
                            xs={12}
                            sm={6}
                            md={4}
                            key={item.id}
                            className={styles.projectItem}
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
                          </Grid>
                        ))}
                      </Grid>
                    </Box>
                  )
              )}
        </div>
      </Container>
    </Box>
  );
}
