"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
import { getProjectWithRelations } from "@/data/api";
import type { Project, Technology, Skill } from "@/data/types";
import ImageGallery from "@/components/ImageGallery";
import { getImagePath } from "@/utils/imageLoader";
import styles from "@/styles/ProjectDetail.module.css";
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

export default function ProjectDetail({
  params,
}: {
  params: { slug: string };
}) {
  const router = useRouter();
  const [project, setProject] = useState<ProjectWithRelations | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProject() {
      if (!params.slug) {
        router.push("/work");
        return;
      }

      try {
        const data = await getProjectWithRelations(params.slug);
        if (!data) {
          router.push("/work");
          return;
        }
        setProject(data);
      } catch (error) {
        console.error("Error loading project:", error);
        router.push("/work");
      } finally {
        setLoading(false);
      }
    }

    loadProject();
  }, [params.slug, router]);

  if (loading || !project) {
    return <div>Loading...</div>;
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
          <Button
            component={Link}
            href="/work"
            startIcon={<ArrowLeft size={20} />}
            sx={{ mb: 4 }}
          >
            Back to Projects
          </Button>

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
                <Box
                  className={styles.imageWrapper}
                  component="img"
                  src={getImagePath(project.coverImage, "large")}
                  alt={project.title}
                  sx={{
                    width: "100%",
                    height: "auto",
                    borderRadius: 2,
                    border: "1px solid",
                    borderColor: "divider",
                  }}
                  onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                    e.currentTarget.src = getImagePath(
                      "/images/placeholder.jpg",
                      "large"
                    );
                  }}
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
    </div>
  );
}
