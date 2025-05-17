"use client";

import React, { useRef } from "react";
import Link from "next/link";
import {
  ArrowRight,
  FileDown,
  Code2,
  Layout,
  Globe2,
  Gauge,
} from "lucide-react";
import { useApi } from "@/hooks/useApi";
import { getFeaturedProjects, getProfile, getSkills } from "@/data/api";
import type { Profile, Skill, Project } from "@/data/api";
import LoadingSpinner from "@/components/LoadingSpinner";
import RotatingTitle from "@/components/RotatingTitle";
import { getImagePath } from "@/utils/imageLoader";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import styles from "@/styles/Home.module.css";
import {
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Box,
  CardActionArea,
} from "@mui/material";
import { Button } from "@/design-system/components/Button";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function Page() {
  const { data: projects, loading: projectsLoading } =
    useApi(getFeaturedProjects);
  const { data: profile, loading: profileLoading } = useApi(getProfile);
  const { data: skills, loading: skillsLoading } = useApi(getSkills);
  const projectCardsRef = useRef<HTMLDivElement>(null);
  const aboutSectionRef = useRef<HTMLDivElement>(null);
  const aboutContentRef = useRef<HTMLDivElement>(null);
  const aboutImageRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Project cards animation
    if (projectCardsRef.current) {
      const cards = projectCardsRef.current.querySelectorAll(".project-card");
      gsap.fromTo(
        cards,
        {
          opacity: 0,
          y: 100,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: projectCardsRef.current,
            start: "top bottom-=100",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    // About section animation
    if (
      aboutSectionRef.current &&
      aboutContentRef.current &&
      aboutImageRef.current
    ) {
      const contentElements = aboutContentRef.current.children;

      gsap.fromTo(
        Array.from(contentElements),
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
            trigger: aboutSectionRef.current,
            start: "top center+=250",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        aboutImageRef.current,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: aboutSectionRef.current,
            start: "top center+=250",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  }, [projects]);

  if (projectsLoading || profileLoading || skillsLoading || !profile) {
    return <LoadingSpinner />;
  }

  const rotatingTitles = [
    "Frontend UX Engineer",
    "Design Systems Developer",
    "Component Library Expert",
    "Web Standards Advocate",
  ];

  // Map icon names to Lucide components
  const getIconComponent = (iconName: string) => {
    const icons: { [key: string]: React.ElementType } = {
      "code-2": Code2,
      layout: Layout,
      "globe-2": Globe2,
      gauge: Gauge,
    };
    return icons[iconName] || Code2;
  };

  return (
    <div className="relative">
      <section
        className={styles.hero}
        style={{
          backgroundImage: `url(${getImagePath(
            "/images/ku-portfolio-bg.webp",
            "full"
          )})`,
        }}
      >
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <Typography variant="h1" className={styles.heroTitle}>
            <RotatingTitle titles={rotatingTitles} interval={2500} />
          </Typography>
          <Typography variant="body1" className={styles.heroText}>
            {profile.bio[0]}
          </Typography>
          <Button
            component={Link}
            href="/work"
            variant="contained"
            endIcon={<ArrowRight size={20} />}
          >
            View My Work
          </Button>
        </div>
      </section>
      {/* About Section */}
      <Box
        component="section"
        ref={aboutSectionRef}
        sx={{ py: 8, backgroundColor: "background.default" }}
      >
        <Container>
          <Grid container spacing={6}>
            <Grid item xs={12} md={7}>
              <div ref={aboutContentRef}>
                <Typography variant="h2" gutterBottom>
                  Kham Udom
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                  {profile.bio[0]}
                </Typography>
                <div className={styles.skillsList}>
                  {skills?.map((skill) => {
                    const IconComponent = getIconComponent(skill.iconName);
                    return (
                      <div key={skill.id} className={styles.skillItem}>
                        <IconComponent className={styles.skillIcon} size={24} />
                        <span>{skill.name}</span>
                      </div>
                    );
                  })}
                </div>
                <div className={styles.aboutButtons}>
                  <Button
                    component={Link}
                    href="/about"
                    variant="outlined"
                    endIcon={<ArrowRight size={20} />}
                  >
                    Learn More About Me
                  </Button>
                  <Button
                    component="a"
                    href="/resume.pdf"
                    download="kham-udom-resume.pdf"
                    variant="contained"
                    startIcon={<FileDown size={20} />}
                  >
                    Download Resume
                  </Button>
                </div>
              </div>
            </Grid>
            <Grid item xs={12} md={5}>
              <div ref={aboutImageRef} className={styles.aboutImage}>
                <Box
                  component="img"
                  src={getImagePath("/images/placeholder.jpg", "medium")}
                  alt="Developer workspace with laptop and code"
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                  onError={(e) => {
                    e.currentTarget.src = getImagePath(
                      "/images/placeholder.jpg",
                      "medium"
                    );
                  }}
                />
              </div>
            </Grid>
          </Grid>
        </Container>
      </Box>
      {/* Featured Projects */}
      <Box
        component="section"
        sx={{ py: 10, backgroundColor: "background.default" }}
      >
        <Container>
          <Typography
            variant="h2"
            align="center"
            gutterBottom
            className={styles.sectionTitle}
          >
            Featured Projects
          </Typography>
          <Grid container spacing={4} ref={projectCardsRef}>
            {projects?.map((project) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                key={project.id}
                className="project-card"
              >
                <Card
                  sx={{
                    height: "100%",
                    borderRadius: 2,
                    overflow: "hidden",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    "&:hover": {
                      boxShadow: "0 12px 28px rgba(0, 0, 0, 0.15)",
                    },
                  }}
                >
                  <CardActionArea
                    component={Link}
                    href={`/project/${project.slug}`}
                  >
                    <CardMedia
                      component="img"
                      image={getImagePath(project.coverImage, "medium")}
                      alt={project.title}
                      sx={{ height: 225 }}
                      onError={(e) => {
                        e.currentTarget.src = getImagePath(
                          "/images/placeholder.jpg",
                          "medium"
                        );
                      }}
                    />
                  </CardActionArea>
                  <CardContent sx={{ p: 3 }}>
                    <Typography
                      variant="h5"
                      gutterBottom
                      sx={{ fontWeight: 600 }}
                    >
                      {project.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      paragraph
                    >
                      {project.description}
                    </Typography>
                    <Box
                      sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}
                    >
                      <Box
                        sx={{
                          px: 1.5,
                          py: 0.5,
                          bgcolor: "rgba(0, 102, 204, 0.1)",
                          borderRadius: 1,
                          fontSize: "0.875rem",
                          color: "primary.main",
                        }}
                      >
                        {project.category}
                      </Box>
                    </Box>
                    <Button
                      component={Link}
                      href={`/project/${project.slug}`}
                      variant="text"
                      endIcon={<ArrowRight size={16} />}
                      sx={{
                        p: 0,
                        mt: "auto",
                        "&:hover .MuiSvgIcon-root, &:hover svg": {
                          transform: "translateX(4px)",
                          transition: "transform 0.3s ease",
                        },
                      }}
                    >
                      View Project Details
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Box className={styles.viewAllWrapper} sx={{ mt: 6 }}>
            <Button
              component={Link}
              href="/work"
              variant="outlined"
              endIcon={<ArrowRight size={20} />}
            >
              View All Projects
            </Button>
          </Box>
        </Container>
      </Box>
    </div>
  );
}
