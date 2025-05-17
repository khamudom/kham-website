import React from "react";
import { notFound } from "next/navigation";
import {
  Typography,
  Container,
  Grid,
  Box,
  Chip,
  Paper,
  Button,
} from "@mui/material";
import { ArrowLeft, Github, ExternalLink } from "lucide-react";
import Link from "next/link";
import { getProjectBySlug, Project } from "@/api/projects";
import { getImagePath } from "@/utils/imageUtils";
import styles from "@/styles/ProjectDetail.module.css";

interface PageProps {
  params: {
    slug: string;
  };
}

export default async function ProjectDetail({ params }: PageProps) {
  const project = await getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  return (
    <div className={styles.projectDetailPage}>
      {/* Hero Section */}
      <Box
        component="section"
        className={styles.hero}
        sx={{
          backgroundImage: `url(${getImagePath(project.coverImage, "full")})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          height: "50vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
        }}
      >
        <Container>
          <Typography
            variant="h1"
            sx={{
              position: "relative",
              zIndex: 1,
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            {project.title}
          </Typography>
        </Container>
      </Box>

      {/* Project Content */}
      <Box component="section" sx={{ py: 8 }}>
        <Container>
          <Grid container spacing={6}>
            {/* Project Info */}
            <Grid item xs={12} md={8}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  backgroundColor: "background.paper",
                  borderRadius: 2,
                }}
              >
                <Typography variant="h3" gutterBottom>
                  About the Project
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ whiteSpace: "pre-line", mb: 4 }}
                >
                  {project.description}
                </Typography>

                <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
                  Technologies Used
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 4 }}>
                  {project.technologies.map((tech: string) => (
                    <Chip
                      key={tech}
                      label={tech}
                      sx={{
                        backgroundColor: "primary.main",
                        color: "white",
                      }}
                    />
                  ))}
                </Box>

                {project.features && (
                  <>
                    <Typography variant="h4" gutterBottom>
                      Key Features
                    </Typography>
                    <ul className={styles.featureList}>
                      {project.features.map(
                        (feature: string, index: number) => (
                          <li key={index}>
                            <Typography variant="body1">{feature}</Typography>
                          </li>
                        )
                      )}
                    </ul>
                  </>
                )}
              </Paper>
            </Grid>

            {/* Project Links */}
            <Grid item xs={12} md={4}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  backgroundColor: "background.paper",
                  borderRadius: 2,
                  height: "100%",
                }}
              >
                <Typography variant="h4" gutterBottom>
                  Project Links
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  {project.githubUrl && (
                    <Button
                      variant="contained"
                      startIcon={<Github size={20} />}
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      fullWidth
                    >
                      View on GitHub
                    </Button>
                  )}
                  {project.liveUrl && (
                    <Button
                      variant="outlined"
                      startIcon={<ExternalLink size={20} />}
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      fullWidth
                    >
                      Visit Live Site
                    </Button>
                  )}
                </Box>
              </Paper>
            </Grid>
          </Grid>

          {/* Back Button */}
          <Box sx={{ mt: 4, textAlign: "center" }}>
            <Button
              component={Link}
              href="/work"
              variant="outlined"
              startIcon={<ArrowLeft size={20} />}
            >
              Back to Projects
            </Button>
          </Box>
        </Container>
      </Box>
    </div>
  );
}
