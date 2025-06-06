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
import { Typography, Container, Box, Breadcrumbs } from "@mui/material";
import ProjectTile from "@/components/ProjectTile/ProjectTile";
import styles from "@/styles/pages/Projects.module.css";

export default function Portfolio() {
  const { data: projectsResponse, loading, error } = useApi(fetchProjects);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const projectCardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (projectsResponse?.data?.data) {
      const projects = projectsResponse.data.data;
      setFilteredProjects(
        selectedCategory === "all"
          ? projects
          : projects.filter((project) =>
              project.technologies.includes(selectedCategory)
            )
      );
    }
  }, [selectedCategory, projectsResponse]);

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
  }, [filteredProjects]);

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
          <Typography variant="body1" mb={8}>
            A collection of my work, from enterprise applications to personal
            projects.
          </Typography>
        </div>

        <div ref={projectCardsRef}>
          <ul className={styles.projectList}>
            {filteredProjects.map((item) => (
              <li key={item.id} className={styles.projectItem}>
                <ProjectTile
                  width={280}
                  height={180}
                  imgSrc={item.coverImage}
                  imgAlt={item.title}
                  title={item.title}
                  href={`/projects/${item.slug}`}
                  target={"_self"}
                  projectType={item.category?.[0]}
                />
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Box>
  );
}
