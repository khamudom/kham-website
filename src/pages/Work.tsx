import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { getProjects } from "../data/api";
import type { Project } from "../data/types";
import { getImagePath } from "../utils/imageLoader";
import styles from "../styles/Work.module.css";
import {
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Box,
  ButtonGroup,
  CardActionArea,
} from "@mui/material";
import { Button } from "../design-system/components/Button";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

type Category = "all" | "enterprise" | "open-source" | "personal";

const Work = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const [loading, setLoading] = useState(true);
  const projectsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadProjects() {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (error) {
        console.error("Error loading projects:", error);
      } finally {
        setLoading(false);
      }
    }

    loadProjects();
  }, []);

  useGSAP(() => {
    if (projectsRef.current) {
      const cards = projectsRef.current.querySelectorAll(".project-card");

      gsap.fromTo(
        cards,
        {
          opacity: 0,
          y: 100,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: {
            amount: 0.6,
            from: "start",
          },
          ease: "power3.out",
          scrollTrigger: {
            trigger: projectsRef.current,
            start: "top bottom-=100",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  }, [projects, activeCategory]);

  const categories = [
    { id: "all" as const, name: "All Projects" },
    { id: "enterprise" as const, name: "Enterprise Work" },
    { id: "open-source" as const, name: "Open Source" },
    { id: "personal" as const, name: "Personal Projects" },
  ];

  const filteredProjects =
    activeCategory === "all"
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="pt-20">
      <Box component="section" className={styles.section}>
        <Container maxWidth="xl">
          <Box className={styles.header}>
            <Typography variant="h1" className={styles.title}>
              My Work
            </Typography>
            <Typography variant="body1" className={styles.description}>
              A showcase of my professional work, open source contributions, and
              personal projects
            </Typography>
          </Box>

          <Box className={styles.categories}>
            <ButtonGroup variant="outlined" aria-label="project categories">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  variant={
                    activeCategory === category.id ? "contained" : "outlined"
                  }
                  sx={{
                    minWidth: "120px",
                  }}
                >
                  {category.name}
                </Button>
              ))}
            </ButtonGroup>
          </Box>

          <Grid
            container
            spacing={{ xs: 2, sm: 3, md: 4 }}
            columns={{ xs: 1, sm: 8, md: 12 }}
            ref={projectsRef}
          >
            {filteredProjects.map((project) => (
              <Grid
                item
                xs={1}
                sm={4}
                md={4}
                key={project.id}
                className="project-card"
              >
                <Card
                  sx={{
                    height: "100%",
                    borderRadius: 2,
                    overflow: "hidden",
                    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    display: "flex",
                    flexDirection: "column",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
                    },
                  }}
                >
                  <CardActionArea
                    component={Link}
                    to={`/project/${project.slug}`}
                    sx={{ flexShrink: 0 }}
                  >
                    <Box
                      sx={{
                        position: "relative",
                        paddingTop: "56.25%" /* 16:9 aspect ratio */,
                      }}
                    >
                      <CardMedia
                        component="img"
                        image={getImagePath(project.coverImage, "medium")}
                        alt={project.title}
                        sx={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                        onError={(
                          e: React.SyntheticEvent<HTMLImageElement>
                        ) => {
                          e.currentTarget.src = getImagePath(
                            "/images/placeholder.jpg",
                            "medium"
                          );
                        }}
                      />
                    </Box>
                  </CardActionArea>
                  <CardContent
                    sx={{
                      p: 3,
                      flexGrow: 1,
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Typography
                      variant="h5"
                      gutterBottom
                      sx={{
                        fontWeight: 600,
                        fontSize: { xs: "1.25rem", sm: "1.5rem" },
                      }}
                    >
                      {project.title}
                    </Typography>
                    {/* <Typography
                      variant="body2"
                      color="text.secondary"
                      paragraph
                      sx={{ mb: "auto" }}
                    >
                      {project.summary}
                    </Typography> */}
                    <Box
                      sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}
                    >
                      {project.technologies.map((techId) => (
                        <Box
                          key={techId}
                          sx={{
                            px: 1.5,
                            py: 0.5,
                            bgcolor: "rgba(0, 102, 204, 0.1)",
                            borderRadius: 1,
                            fontSize: "0.875rem",
                            color: "primary.main",
                          }}
                        >
                          {techId}
                        </Box>
                      ))}
                    </Box>
                    <Button
                      component={Link}
                      to={`/project/${project.slug}`}
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
        </Container>
      </Box>
    </div>
  );
};

export default Work;
