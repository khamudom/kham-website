"use client";

import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  FileDown,
  Code2,
  Layout,
  Globe2,
  Gauge,
} from "lucide-react";
import { usePortfolioData } from "@/hooks/usePortfolioData";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { ErrorMessage } from "@/components/common/ErrorMessage";
import RotatingTitle from "@/components/animations/RotatingTitle";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import styles from "@/styles/pages/Home.module.css";
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
  const { projects, profile, skills, loading, error } = usePortfolioData();

  const projectCardsRef = useRef<HTMLDivElement>(null);
  const aboutSectionRef = useRef<HTMLDivElement>(null);
  const aboutContentRef = useRef<HTMLDivElement>(null);
  const aboutImageRef = useRef<HTMLDivElement>(null);

  // Get featured projects (first 3)
  const featuredProjects = projects.slice(0, 3);

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
  }, [featuredProjects]);

  if (loading) {
    return <LoadingSpinner size="large" />;
  }

  if (error) {
    return (
      <ErrorMessage
        message="Failed to load portfolio data. Please try again later."
        onRetry={() => window.location.reload()}
      />
    );
  }

  if (!profile || !projects || !skills) {
    return null;
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
      <section className={styles.hero}>
        <Image
          src="/images/ku-portfolio-bg.webp"
          alt="Portfolio background"
          fill
          priority
          style={{ objectFit: "cover" }}
        />
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <Typography variant="h1" className={styles.heroTitle}>
            <RotatingTitle titles={rotatingTitles} interval={2500} />
          </Typography>
          <Typography variant="body1" className={styles.heroText}>
            {profile.bio}
          </Typography>
          <Button
            component={Link}
            href="/portfolio"
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
                  {profile.name}
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                  {profile.bio}
                </Typography>
                <div className={styles.skillsList}>
                  {skills.map((skill) => {
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
              <div ref={aboutImageRef}>
                <Image
                  src="/images/placeholder.jpg"
                  alt="Profile"
                  width={400}
                  height={400}
                  className={styles.profileImage}
                />
              </div>
            </Grid>
          </Grid>
        </Container>
      </Box>
      {/* Featured Projects Section */}
      <Box
        component="section"
        sx={{ py: 8, backgroundColor: "background.paper" }}
      >
        <Container>
          <Typography variant="h2" gutterBottom>
            Featured Projects
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Here are some of my recent works that showcase my skills and
            experience.
          </Typography>
          <Grid container spacing={4} ref={projectCardsRef}>
            {featuredProjects.map((project) => (
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
                    display: "flex",
                    flexDirection: "column",
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
                    href={`/portfolio/${project.slug}`}
                    sx={{ flexShrink: 0 }}
                  >
                    <Box
                      sx={{
                        position: "relative",
                        paddingTop: "56.25%" /* 16:9 aspect ratio */,
                      }}
                    >
                      <Image
                        src={project.coverImage}
                        alt={project.title}
                        fill
                        className={styles.projectImage}
                        onError={(e) => {
                          e.currentTarget.src = "/images/placeholder.jpg";
                        }}
                      />
                    </Box>
                  </CardActionArea>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h5" component="h3" gutterBottom>
                      {project.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {project.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Box sx={{ mt: 4, textAlign: "center" }}>
            <Button
              component={Link}
              href="/portfolio"
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
