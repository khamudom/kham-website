import React from "react";
import Link from "next/link";
import {
  Code2,
  Blocks,
  Globe2,
  GitBranch,
  Database,
  Braces,
  Cpu,
  Server,
} from "lucide-react";
import type {
  Project,
  Technology,
  Skill,
  Image,
  ProjectSection,
} from "@/types/portfolio";
import ImageGallery from "@/components/ImageGallery/ImageGallery";
import ProjectImage from "@/components/ProjectImage/ProjectImage";
import ProjectIframe from "@/components/ProjectIframe/ProjectIframe";
import styles from "@/styles/pages/ProjectDetail.module.css";
import {
  Typography,
  Button,
  Container,
  Box,
  Chip,
  Breadcrumbs,
} from "@mui/material";
import projectsData from "@/data/projects.json";
import dynamic from "next/dynamic";
const YouTubeEmbed = dynamic(() => import("@/components/YouTubeEmbed"), {
  ssr: false,
});

type ProjectWithRelations = Project & {
  technologyDetails: Technology[];
  skillDetails: Skill[];
  gallery?: Image[];
  sections?: ProjectSection[];
};

export async function generateStaticParams() {
  const projects = projectsData.data;
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default function ProjectDetail({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  if (!slug) {
    console.error("No slug provided");
    return <div>Project not found</div>;
  }

  const project = projectsData.data.find((p) => p.slug === slug);

  if (!project) {
    console.error(`Project not found for slug: ${slug}`);
    return <div>Project not found</div>;
  }

  // Using mock data
  const technologyDetails: Technology[] = project.technologies.map(
    (tech, index) => ({
      id: `tech-${index}`,
      name: tech,
      description: `${tech} technology`,
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
    <div className={styles.projectDetailPage}>
      <Box className={styles.section}>
        <Container
          maxWidth={false}
          sx={{ maxWidth: "1280px", margin: "0 auto" }}
        >
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
            <Link
              href="/projects"
              passHref
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Typography variant="body2" color="text.secondary">
                Projects
              </Typography>
            </Link>
            <Typography variant="body2" color="text.primary">
              {projectWithRelations.title}
            </Typography>
          </Breadcrumbs>

          <Box className={styles.content}>
            <div className={styles.headerWrapper}>
              <div>
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: "var(--font-size-2xl)",
                    fontWeight: "bold",
                    marginBottom: "var(--spacing-md)",
                    color: "var(--color-text-primary)",
                  }}
                >
                  {projectWithRelations.title}
                </Typography>
                {/** Tags */}
                <Box className={styles.tags} sx={{ mb: 4 }}>
                  {projectWithRelations.technologies.map((techId: string) => (
                    <Chip
                      key={techId}
                      label={techId}
                      variant="outlined"
                      size="small"
                      sx={{
                        mr: 1,
                        mb: 1,
                        borderColor: "var(--color-text)",
                        "& .MuiChip-label": {
                          color: "var(--color-text)",
                        },
                      }}
                    />
                  ))}
                </Box>
              </div>

              {/** Links */}
              {projectWithRelations.links && (
                <Box
                  className={styles.buttons}
                  sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}
                >
                  {projectWithRelations.links.live && (
                    <Button
                      href={projectWithRelations.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="contained"
                      startIcon={<Globe2 size={20} />}
                      sx={{
                        padding: "6px 20px",
                      }}
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
                      sx={{
                        padding: "6px 20px",
                      }}
                    >
                      View Source
                    </Button>
                  )}
                </Box>
              )}
            </div>

            {/* <Grid item xs={12} md={6}>
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
                </Box>
              </Grid> */}

            {/** IFrame Hero */}
            <div className={styles.heroWrapper}>
              <div className={styles.heroSection}>
                <Container
                  maxWidth={false}
                  disableGutters
                  sx={{ maxWidth: "1280px", margin: "0 auto" }}
                >
                  {projectWithRelations.iframeUrl && (
                    <ProjectIframe
                      src={projectWithRelations.iframeUrl}
                      title={projectWithRelations.title}
                    />
                  )}
                </Container>
              </div>

              {/** Sections */}
              {projectWithRelations.sections &&
                projectWithRelations.sections.length > 0 && (
                  <Box component="section" sx={{ mt: 6 }}>
                    {projectWithRelations.sections.map((section, idx) => (
                      <Box key={idx} sx={{ mb: 6 }}>
                        <Typography variant="h4" sx={{ mb: 2 }}>
                          {section.header}
                        </Typography>
                        {section.content && (
                          <Typography
                            variant="body1"
                            sx={{ mb: 4, whiteSpace: "pre-line" }}
                          >
                            {section.content}
                          </Typography>
                        )}
                        {section.media && section.media.length > 0 && (
                          <Box
                            sx={{
                              display: "flex",
                              flexWrap: "wrap",
                              gap: 2,
                            }}
                          >
                            {section.media.map((media, mIdx) =>
                              media.type === "image" ? (
                                <Box key={mIdx} sx={{ mb: 2 }}>
                                  <img
                                    src={media.src}
                                    alt={media.alt || ""}
                                    width={
                                      media.width
                                        ? Number(media.width)
                                        : undefined
                                    }
                                    height={
                                      media.height
                                        ? Number(media.height)
                                        : undefined
                                    }
                                    style={{
                                      maxWidth: "100%",
                                      borderRadius: 4,
                                      boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                                    }}
                                  />
                                  {media.caption && (
                                    <Typography
                                      variant="caption"
                                      sx={{
                                        display: "block",
                                        color: "text.secondary",
                                        textAlign: "left",
                                      }}
                                    >
                                      {media.caption}
                                    </Typography>
                                  )}
                                </Box>
                              ) : media.type === "video" ? (
                                <Box key={mIdx} sx={{ mb: 2 }}>
                                  <video
                                    src={media.src}
                                    controls
                                    width={
                                      media.width
                                        ? Number(media.width)
                                        : undefined
                                    }
                                    height={
                                      media.height
                                        ? Number(media.height)
                                        : undefined
                                    }
                                    style={{
                                      maxWidth: "100%",
                                      borderRadius: 4,
                                      boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                                    }}
                                  />
                                  {media.caption && (
                                    <Typography
                                      variant="caption"
                                      sx={{
                                        display: "block",
                                        color: "text.secondary",
                                        textAlign: "left",
                                      }}
                                    >
                                      {media.caption}
                                    </Typography>
                                  )}
                                </Box>
                              ) : media.type === "youtube" &&
                                media.youtubeId ? (
                                <Box key={mIdx} sx={{ mb: 2 }}>
                                  <YouTubeEmbed
                                    videoId={media.youtubeId}
                                    opts={{
                                      width: media.width
                                        ? String(media.width)
                                        : "100%",
                                      height: media.height
                                        ? String(media.height)
                                        : "315",
                                      playerVars: {
                                        autoplay: 0,
                                      },
                                    }}
                                  />
                                  {media.caption && (
                                    <Typography
                                      variant="caption"
                                      sx={{
                                        display: "block",
                                        color: "text.secondary",
                                        textAlign: "left",
                                      }}
                                    >
                                      {media.caption}
                                    </Typography>
                                  )}
                                </Box>
                              ) : null
                            )}
                          </Box>
                        )}
                      </Box>
                    ))}
                  </Box>
                )}
            </div>
          </Box>
        </Container>
      </Box>
    </div>
  );
}
