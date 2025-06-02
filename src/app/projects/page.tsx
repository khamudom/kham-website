"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useApi } from "@/hooks/useApi";
import { fetchProjects } from "@/utils/api";
import type { Project } from "@/types/portfolio";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { ErrorMessage } from "@/components/common/ErrorMessage";
import { PageHeader } from "@/components/common/PageHeader";
import styles from "@/styles/pages/Projects.module.css";
import {
  Typography,
  Container,
  Card,
  CardContent,
  Box,
  CardActionArea,
  Breadcrumbs,
} from "@mui/material";
import ProjectTile from "@/components/ui/ProjectTile/ProjectTile";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

export default function Portfolio() {
  const { data: projectsResponse, loading, error } = useApi(fetchProjects);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const projectCardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (projectsResponse?.data?.data) {
      const projects = projectsResponse.data.data;
      if (selectedCategory === "all") {
        setFilteredProjects(projects);
      } else {
        setFilteredProjects(
          projects.filter((project) =>
            project.technologies.includes(selectedCategory)
          )
        );
      }
    }
  }, [selectedCategory, projectsResponse]);

  useGSAP(() => {
    if (projectCardsRef.current) {
      const cards = projectCardsRef.current.querySelectorAll(".project-card");
      gsap.fromTo(
        cards,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: projectCardsRef.current,
            start: "top center+=100",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  }, [filteredProjects]);

  if (loading) {
    return <LoadingSpinner size="large" />;
  }

  if (error) {
    return (
      <ErrorMessage
        message="Failed to load projects. Please try again later."
        onRetry={() => window.location.reload()}
      />
    );
  }

  if (!projectsResponse?.data?.data) {
    return null;
  }

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

        <PageHeader
          title="Projects"
          description="A collection of my work, from enterprise applications to personal projects."
        />

        <div ref={projectCardsRef}>
          <ul style={{ display: "flex", gap: "1rem" }}>
            {filteredProjects.map((item) => (
              <li key={item.id} style={{ listStyle: "none" }}>
                <ProjectTile
                  width={280}
                  height={180}
                  imgSrc={item.coverImage}
                  imgAlt={item.title}
                  title={item.title}
                  href={`/projects/${item.slug}`}
                  target={"_self"}
                  projectType={item.category[0]}
                />
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Box>
  );
}
