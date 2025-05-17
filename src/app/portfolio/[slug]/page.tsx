import React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Code2,
  Blocks,
  Globe2,
  Chrome,
  GitBranch,
  Database,
  Braces,
  Cpu,
  Server,
} from "lucide-react";
import { getProjectWithRelations } from "@/data/portfolioServices";
import type { Project, Technology, Skill } from "@/data/types";
import ImageGallery from "@/components/ImageGallery";
import ProjectImage from "@/components/ProjectImage";
import styles from "@/styles/pages/ProjectDetail.module.css";
import {
  Typography,
  Button,
  Container,
  Grid,
  Box,
  Paper,
  Chip,
  Divider,
} from "@mui/material";

type ProjectWithRelations = Project & {
  technologyDetails: Technology[];
  skillDetails: Skill[];
};

export default async function ProjectDetail({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  if (!slug) {
    return <div>Project not found</div>;
  }

  try {
    const project = await getProjectWithRelations(slug);

    if (!project) {
      return <div>Project not found</div>;
    }

    // Map of technology names to their corresponding icons
    const techIcons: { [key: string]: React.ElementType } = {
      FAST: Blocks,
      TypeScript: Braces,
      JavaScript: Code2,
      React: Code2,
      "Web Component": Globe2,
      Chromium: Chrome,
      Gerrit: GitBranch,
      HTML: Code2,
      CSS: Code2,
      SQL: Database,
      "Node.js": Server,
      API: Cpu,
    };

    const getTechIcon = (tech: Technology) => {
      const Icon = techIcons[tech.name] || Code2;
      return <Icon size={24} />;
    };

    return (
      <div className="pt-20">
        <Box component="section" className={styles.section}>
          <Container>
            <Link href="/portfolio" passHref>
              <Button startIcon={<ArrowLeft size={20} />} sx={{ mb: 4 }}>
                Back to Projects
              </Button>
            </Link>

            <Box className={styles.content}>
              <Typography variant="h1" className={styles.title}>
                {project.title}
              </Typography>
              <Box className={styles.tags} sx={{ mb: 4 }}>
                {project.technologies.map((techId) => (
                  <Chip
                    key={techId}
                    label={techId}
                    color="primary"
                    variant="outlined"
                    size="small"
                    sx={{ mr: 1, mb: 1 }}
                  />
                ))}
              </Box>

              <Grid container spacing={4} className={styles.grid}>
                <Grid item xs={12} md={6}>
                  <ProjectImage
                    imagePath={project.coverImage}
                    title={project.title}
                    className={styles.imageWrapper}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box className={styles.details}>
                    <Box className={styles.description}>
                      <Typography variant="body1" paragraph>
                        {project.summary}
                      </Typography>
                      <Box className={styles.longDescription}>
                        {project.description.map((paragraph, index) => (
                          <Typography key={index} variant="body2" paragraph>
                            {paragraph}
                          </Typography>
                        ))}
                      </Box>
                    </Box>

                    {project.links && (
                      <Box
                        className={styles.buttons}
                        sx={{ display: "flex", gap: 2 }}
                      >
                        {project.links.live && (
                          <Button
                            href={project.links.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            variant="contained"
                            startIcon={<Globe2 size={20} />}
                          >
                            View Live
                          </Button>
                        )}
                        {project.links.github && (
                          <Button
                            href={project.links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            variant="outlined"
                            startIcon={<GitBranch size={20} />}
                          >
                            View Source
                          </Button>
                        )}
                      </Box>
                    )}
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Container>
        </Box>

        {project.gallery && project.gallery.length > 0 && (
          <Box component="section" className={styles.gallerySection}>
            <Container>
              <Typography variant="h2" className={styles.sectionTitle}>
                Project Gallery
              </Typography>
              <ImageGallery images={project.gallery} />
            </Container>
          </Box>
        )}

        <Box component="section" className={styles.detailsSection}>
          <Container>
            <Grid container spacing={4} className={styles.detailsGrid}>
              <Grid item xs={12} md={6}>
                <Paper className={styles.detailsCard}>
                  <Typography variant="h5" className={styles.detailsTitle}>
                    Technologies Used
                  </Typography>
                  <Divider sx={{ mb: 3 }} />
                  <Box className={styles.techGrid}>
                    {project.technologyDetails.map((tech) => (
                      <Box key={tech.id} className={styles.techItem}>
                        <Box className={styles.techIcon}>
                          {getTechIcon(tech)}
                        </Box>
                        <Typography variant="body2" className={styles.techName}>
                          {tech.name}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Paper>
              </Grid>

              <Grid item xs={12} md={6}>
                <Paper className={styles.detailsCard}>
                  <Typography variant="h5" className={styles.detailsTitle}>
                    Skills Applied
                  </Typography>
                  <Divider sx={{ mb: 3 }} />
                  <Box className={styles.techGrid}>
                    {project.skillDetails.map((skill) => (
                      <Box key={skill.id} className={styles.techItem}>
                        <Box className={styles.techIcon}>
                          <Code2 size={24} />
                        </Box>
                        <Typography variant="body2" className={styles.techName}>
                          {skill.name}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </div>
    );
  } catch (error) {
    console.error("Error loading project:", error);
    return <div>Error loading project</div>;
  }
}
