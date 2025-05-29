import React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Code2,
  Blocks,
  Globe2,
  GitBranch,
  Database,
  Braces,
  Cpu,
  Server,
} from "lucide-react";
import type { Project, Technology, Skill, Image } from "@/types/portfolio";
import ImageGallery from "@/components/ui/ImageGallery";
import ProjectImage from "@/components/ui/ProjectImage";
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
import projectsData from "@/data/projects.json";

type ProjectWithRelations = Project & {
  technologyDetails: Technology[];
  skillDetails: Skill[];
  gallery?: Image[];
};

export default function ProjectDetail({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  if (!slug) {
    return <div>Project not found</div>;
  }

  const project = projectsData.data.find((p) => p.slug === slug) as Project;

  if (!project) {
    return <div>Project not found</div>;
  }

  // In a real application, you would fetch these from your database
  // For now, we'll use mock data
  const technologyDetails: Technology[] = project.technologies.map(
    (tech, index) => ({
      id: `tech-${index}`,
      name: tech,
      description: `${tech} technology`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })
  );

  const skillDetails: Skill[] = project.technologies.map((tech, index) => ({
    id: `skill-${index}`,
    name: tech,
    description: `Experience with ${tech}`,
    iconName: "code",
    category: "development",
    proficiency: 80,
    yearsOfExperience: 2,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }));

  const projectWithRelations: ProjectWithRelations = {
    ...(project as Project),
    technologyDetails,
    skillDetails,
  };

  // Map of technology names to their corresponding icons
  const techIcons: { [key: string]: React.ElementType } = {
    FAST: Blocks,
    TypeScript: Braces,
    JavaScript: Code2,
    React: Code2,
    "Web Component": Globe2,
    Chromium: Globe2,
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
    <div>
      <Box component="section" className={styles.section}>
        <Container>
          <Link href="/projects" passHref>
            <Button startIcon={<ArrowLeft size={20} />} sx={{ mb: 4 }}>
              Back to Projects
            </Button>
          </Link>

          <Box className={styles.content}>
            <Typography variant="h1" className={styles.title}>
              {projectWithRelations.title}
            </Typography>
            <Box className={styles.tags} sx={{ mb: 4 }}>
              {projectWithRelations.technologies.map((techId: string) => (
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
              <Box component="section" className={styles.heroSection}>
                <Container maxWidth="xl" disableGutters>
                  {projectWithRelations.displayType === 'iframe' && projectWithRelations.iframeUrl ? (
                    <Box className={styles.iframeWrapper}>
                      <iframe
                        src={projectWithRelations.iframeUrl}
                        title={projectWithRelations.title}
                        className={styles.projectIframe}
                      />
                    </Box>
                  ) : (
                    <Box className={styles.imageWrapper}>
                      <ProjectImage
                        imagePath={projectWithRelations.coverImage}
                        title={projectWithRelations.title}
                        width={1920}
                        height={1080}
                      />
                    </Box>
                  )}
                </Container>
              </Box>
              <Grid item xs={12} md={6}>
                <Box className={styles.details}>
                  <Box className={styles.description}>
                    <Typography variant="body1" paragraph>
                      {projectWithRelations.summary}
                    </Typography>
                    <Box className={styles.longDescription}>
                      {projectWithRelations.description.map(
                        (paragraph: string, index: number) => (
                          <Typography key={index} variant="body2" paragraph>
                            {paragraph}
                          </Typography>
                        )
                      )}
                    </Box>
                  </Box>

                  {projectWithRelations.links && (
                    <Box
                      className={styles.buttons}
                      sx={{ display: "flex", gap: 2 }}
                    >
                      {projectWithRelations.links.live && (
                        <Button
                          href={projectWithRelations.links.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          variant="contained"
                          startIcon={<Globe2 size={20} />}
                        >
                          View Live
                        </Button>
                      )}
                      {projectWithRelations.links.github && (
                        <Button
                          href={projectWithRelations.links.github}
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

      {projectWithRelations.gallery &&
        projectWithRelations.gallery.length > 0 && (
          <Box component="section" className={styles.gallerySection}>
            <Container>
              <Typography variant="h2" className={styles.sectionTitle}>
                Project Gallery
              </Typography>
              <ImageGallery images={projectWithRelations.gallery} />
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
                  {projectWithRelations.technologyDetails.map(
                    (tech: Technology) => (
                      <Box key={tech.id} className={styles.techItem}>
                        <Box className={styles.techIcon}>
                          {getTechIcon(tech)}
                        </Box>
                        <Typography variant="body2" className={styles.techName}>
                          {tech.name}
                        </Typography>
                      </Box>
                    )
                  )}
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
                  {projectWithRelations.skillDetails.map((skill: Skill) => (
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
}
