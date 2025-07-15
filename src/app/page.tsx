/** @jsxImportSource react */
"use client";

import React, { useRef, useEffect, useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Github,
  Linkedin,
  Mail,
  MapPin,
  ExternalLink,
} from "lucide-react";
import { usePortfolioData } from "@/hooks/usePortfolioData";
import { useApi } from "@/hooks/useApi";
import { fetchAbout } from "@/utils/api";
import { LoadingSpinner } from "@/components/LoadingSpinner/LoadingSpinner";
import { ErrorMessage } from "@/components/ErrorMessage/ErrorMessage";
import styles from "./Home.module.css";
import {
  Typography,
  Container,
  Card,
  CardContent,
  Box,
  Divider,
  Stack,
  TextField,
  Snackbar,
  Alert,
  Chip,
} from "@mui/material";
import { Button } from "@/design-system/components/Button";
import { useThemeBackgrounds } from "@/hooks/useThemeBackgrounds";
import HeaderVertical from "@/components/HeaderVertical/HeaderVertical";
import { ThemeSelector } from "@/components/ThemeSelector";
import RotatingTitle from "@/components/RotatingTitle";
import { SocialLinks } from "@/components/SocialLinks/SocialLinks";
import { Theme } from "@mui/material/styles";
import { SkillsDisplay } from "@/components/SkillsDisplay";

export default function Page() {
  const textFieldStyles = {
    "& .MuiOutlinedInput-root": {
      "&:hover fieldset": {
        borderColor: (theme: Theme) => theme.palette.primary.main,
      },
    },
  };

  const anchorButtonStyles = {
    "& .MuiButton-endIcon": {
      transition: "transform 0.2s cubic-bezier(0.28, 0.11, 0.32, 1)",
    },
    "&:hover .MuiButton-endIcon": {
      transform: "translateX(4px)",
    },
  };

  const { projects, profile, skills, loading, error } = usePortfolioData();
  const {
    data: aboutResponse,
    loading: aboutLoading,
    error: aboutError,
  } = useApi(fetchAbout);
  const themeBackgrounds: { hero: string | null } = useThemeBackgrounds();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  const projectCardsRef = useRef<HTMLDivElement>(null);
  const aboutSectionRef = useRef<HTMLDivElement>(null);
  const contactSectionRef = useRef<HTMLDivElement>(null);
  const aboutContentRef = useRef<HTMLDivElement>(null);
  const mobileHeaderRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState("about");
  const [isMobile, setIsMobile] = useState(false);

  // Get featured projects by specific IDs
  const featuredProjectIds = ["project-7", "project-1", "project-2"];
  const featuredProjects = featuredProjectIds
    .map(id => projects.find(project => project.id === id))
    .filter((project): project is typeof projects[0] => project !== undefined);

  const socialLinks = [
    {
      href: "https://github.com/khamudom",
      icon: Github,
      label: "GitHub",
    },
    {
      href: "https://www.linkedin.com/in/khamudom/",
      icon: Linkedin,
      label: "LinkedIn",
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        { id: "about", ref: aboutSectionRef },
        { id: "projects", ref: projectCardsRef },
        { id: "contact", ref: contactSectionRef },
      ];

      const scrollPosition = window.scrollY + window.innerHeight / 2;

      // Find which section the user is currently in
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.ref.current) {
          const { top } = section.ref.current.getBoundingClientRect();
          const offsetTop = top + window.scrollY;

          if (scrollPosition >= offsetTop) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Call once on mount to set initial section
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT!,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        setSnackbar({
          open: true,
          message: "Message sent successfully!",
          severity: "success",
        });
        setFormData({
          name: "",
          email: "",
          message: "",
        });
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Failed to send message. Please try again later.",
        severity: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  if (loading || aboutLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          width: "100%",
        }}
      >
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (error || aboutError) {
    return (
      <ErrorMessage
        message="Failed to load portfolio data. Please try again later."
        onRetry={() => window.location.reload()}
      />
    );
  }

  if (!profile || !projects || !skills || !aboutResponse?.data) {
    return null;
  }

  return (
    <div className={styles.mainContainer}>
      {themeBackgrounds.hero && typeof themeBackgrounds.hero === "string" && (
        <img
          src={themeBackgrounds.hero}
          alt="Background"
          className={isMobile ? styles.mobileHideBg : undefined}
          style={{
            position: "fixed",
            top: "280px",
            left: 0,
            zIndex: -2,
            width: "auto",
            height: "auto",
            maxWidth: "none",
            maxHeight: "none",
            transform: "scale(.5)",
            transformOrigin: "top left",
            pointerEvents: "none",
            userSelect: "none",
            display: "block",
          }}
        />
      )}
      <div className={styles.mainNavContainer}>
        <div className={styles.mainStickyNav}>
          <HeaderVertical
            activeSection={activeSection}
            onSectionChange={setActiveSection}
          />
          <div className={styles.stickyFooter}>
            <div className={styles.socialLinks}>
              <SocialLinks links={socialLinks} />
            </div>
            <Divider sx={{ mb: 1 }} />
            <div>
              <Typography variant="body2" sx={{ mb: 2, display: "block" }}>
                Switch up the vibe with the theme selector!
              </Typography>
              <ThemeSelector />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.mainContent}>
        {isMobile && (
          <div
            ref={mobileHeaderRef}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: ".3rem",
              padding: "1.5rem 0 0.5rem 0",
              background: "var(--color-background)",
              zIndex: 101,
              marginBottom: "1rem",
            }}
          >
            {profile && (
              <>
                <h1 style={{ fontSize: "2rem", margin: 0, fontWeight: 700 }}>
                  {profile.name}
                </h1>
                <RotatingTitle
                  titles={[
                    "Frontend Engineer",
                    "Design Systems Developer",
                    "Component Library Expert",
                    "Web Standards Advocate",
                    "Web Developer",
                  ]}
                  interval={5000}
                />
              </>
            )}
            <div className={styles.socialLinks} style={{ marginTop: "0.5rem" }}>
              <SocialLinks links={socialLinks} />
            </div>
          </div>
        )}
        {/* About Section */}
        <Box
          component="section"
          ref={aboutSectionRef}
          id="about"
          sx={{
            scrollMarginTop: isMobile ? "3.5rem" : "6rem",
          }}
        >
          <div>
            {isMobile && <h2 className={styles.mobileSectionHeader}>About</h2>}
            <div ref={aboutContentRef}>
              {/* TL;DR Section */}
              {aboutResponse.data.tldr && (
                <Box
                  sx={{
                    backgroundColor: "background.paper",
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 2,
                    p: 3,
                    mb: 3,
                    mt:3,
                    position: "relative",
                    "&::before": {
                      content: '"TL;DR"',
                      position: "absolute",
                      top: "-10px",
                      left: "16px",
                      backgroundColor: "background.default",
                      px: 1,
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      color: "text.secondary",
                      letterSpacing: "0.1em",
                    },
                  }}
                >
                  <Typography
                    variant="body1"
                    color="text.primary"
                    sx={{
                      lineHeight: 1.6,
                      fontSize: { xs: "1rem", sm: "1.05rem" },
                      fontWeight: 500,
                    }}
                  >
                    {aboutResponse.data.tldr}
                  </Typography>
                </Box>
              )}
              {aboutResponse.data.content.map((contentItem, index) => (
                <Typography
                  key={index}
                  variant="body1"
                  color="text.primary"
                  paragraph
                  sx={{
                    lineHeight: { xs: 1.8, sm: 1.9 },
                    letterSpacing: { xs: "0.01em", sm: "0.02em" },
                    fontSize: { xs: "1rem", sm: "1.1rem" },
                    maxWidth: "65ch",
                    marginBottom: index === 0 ? "1rem" : "0",
                  }}
                  dangerouslySetInnerHTML={{ __html: contentItem.paragraph }}
                />
              ))}
              <div className={styles.skillsContainer}>
                <SkillsDisplay skills={skills} />
              </div>
              <div className={styles.aboutButtons}>
                <Button
                  component={Link}
                  href="/about"
                  variant="outlined"
                  size="small"
                  endIcon={<ArrowRight size={20} />}
                  sx={anchorButtonStyles}
                >
                  Work Experiences
                </Button>
              </div>
            </div>
          </div>
        </Box>
        {/* Projects Section */}
        <Box
          component="section"
          ref={projectCardsRef}
          id="projects"
          sx={{
            py: 10,
            scrollMarginTop: isMobile ? "3.5rem" : "2rem",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {isMobile && <h2 className={styles.mobileSectionHeader}>Projects</h2>}
          <Stack spacing={2}>
            {featuredProjects.map((project) => (
              <Link
                href={`/projects/${project.slug}`}
                key={project.id}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Card
                  className={styles.projectCard}
                  sx={{
                    backgroundColor: "transparent",
                    backgroundImage: "none",
                    border: "1px solid transparent",
                    boxShadow: "none",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      backgroundColor: "background.paper",
                      border: "1px solid",
                      borderColor: "divider",
                    },
                  }}
                >
                  <CardContent
                    sx={{
                      display: "flex",
                      flexDirection: { xs: "column", sm: "row" },
                      gap: 2,
                      padding: "12px",
                      "&:last-child": { paddingBottom: "12px" },
                    }}
                  >
                    <Box
                      className={styles.cardImage}
                      sx={{
                        width: { xs: "100%", sm: "auto" },
                        "& img": {
                          height: { xs: "auto", sm: "120px" },
                          objectFit: "cover",
                        },
                      }}
                    >
                      <Image
                        width={200}
                        height={120}
                        src={project.coverImage}
                        alt={project.title}
                        className={styles.image}
                        loading="lazy"
                        decoding="async"
                        onError={(e) => {
                          e.currentTarget.src = "/images/placeholder.jpg";
                        }}
                      />
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography variant="h5" component="h3">
                          {project.cardTitle}
                        </Typography>
                        <Chip
                          label={project.category}
                          variant="outlined"
                          size="small"
                          sx={{
                            width: "fit-content",
                          }}
                        />
                      </div>
                      <Typography variant="body2" color="text.secondary">
                        {project.summary}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </Stack>
          <Box sx={{ mt: 2 }}>
            <Button
              component={Link}
              href="/projects"
              variant="outlined"
              size="small"
              endIcon={<ArrowRight size={20} />}
              sx={{
                "& .MuiButton-endIcon": {
                  transition:
                    "transform 0.3s cubic-bezier(0.28, 0.11, 0.32, 1)",
                },
                "&:hover .MuiButton-endIcon": {
                  transform: "translateX(4px)",
                },
              }}
            >
              View All Projects
            </Button>
          </Box>
        </Box>
        {/* Contact Section */}
        <Box
          component="section"
          ref={contactSectionRef}
          id="contact"
          sx={{
            py: 4,
            backgroundColor: "background.default",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            scrollMarginTop: isMobile ? "3.5rem" : "2rem",
          }}
        >
          {isMobile && <h2 className={styles.mobileSectionHeader}>Contact</h2>}
          <Container maxWidth={false} disableGutters>
            <Typography variant="h3" gutterBottom align="center">
              Let's Build Something That Drives Results
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              align="center"
              sx={{ mb: 4 }}
            >
              Whether you need to increase conversions, improve user experience,
              or scale your technical infrastructure, I deliver measurable
              results on time and on budget.
            </Typography>
            <div>
              <Box
                sx={{
                  mt: 3,
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  gap: 4,
                  justifyContent: "center",
                }}
              >
                {/* <div>
                  <Typography
                    variant="body1"
                    sx={{
                      mb: 2,
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <Mail size={20} />
                    <strong>Email:</strong>{" "}
                    <a href="mailto:khamudom@gmail.com">khamu@outlook.com</a>
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      mb: 2,
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <MapPin size={20} />
                    <strong>Location:</strong> Monroe, WA
                  </Typography>
                </div>
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{
                    display: { xs: "none", md: "block" },
                    mx: 2,
                  }}
                /> */}
                <Box sx={{ minWidth: { md: "300px" } }}>
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    What You Can Expect
                  </Typography>
                  <Box
                    component="ul"
                    sx={{
                      listStyle: "none",
                      padding: 0,
                      margin: 0,
                    }}
                  >
                    <Box
                      component="li"
                      sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "0.5rem",
                        marginBottom: "1rem",
                      }}
                    >
                      <span
                        style={{
                          color: "var(--color-primary)",
                          lineHeight: 1.5,
                          fontSize: "1.3em",
                          marginTop: "2px",
                        }}
                      >
                        ✓
                      </span>
                      <span>Fast turnaround without compromising quality</span>
                    </Box>
                    <Box
                      component="li"
                      sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "0.5rem",
                        marginBottom: "1rem",
                      }}
                    >
                      <span
                        style={{
                          color: "var(--color-primary)",
                          lineHeight: 1.5,
                          fontSize: "1.3em",
                          marginTop: "2px",
                        }}
                      >
                        ✓
                      </span>
                      <span>
                        Clear communication and seamless collaboration with
                        designers, engineers, and stakeholders
                      </span>
                    </Box>
                    <Box
                      component="li"
                      sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "0.5rem",
                        marginBottom: "1rem",
                      }}
                    >
                      <span
                        style={{
                          color: "var(--color-primary)",
                          lineHeight: 1.5,
                          fontSize: "1.3em",
                          marginTop: "2px",
                        }}
                      >
                        ✓
                      </span>
                      <span>
                        Mobile-first designs that work flawlessly across all
                        devices
                      </span>
                    </Box>
                  </Box>
                </Box>
              </Box>
              <Box
                sx={{
                  mt: 3,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Box
                  component="form"
                  onSubmit={handleSubmit}
                  sx={{
                    mt: 3,
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                  }}
                >
                  <TextField
                    required
                    fullWidth
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    variant="outlined"
                    disabled={isSubmitting}
                    size="small"
                    sx={textFieldStyles}
                  />

                  <TextField
                    required
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    variant="outlined"
                    disabled={isSubmitting}
                    size="small"
                    sx={textFieldStyles}
                  />

                  <TextField
                    required
                    fullWidth
                    label="Message"
                    name="message"
                    multiline
                    rows={4}
                    value={formData.message}
                    onChange={handleFormChange}
                    variant="outlined"
                    disabled={isSubmitting}
                    size="small"
                    sx={textFieldStyles}
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    size="small"
                    fullWidth
                    sx={{ mt: 2 }}
                    disabled={isSubmitting}
                  >
                    {isSubmitting
                      ? "Sending..."
                      : "Let's Talk About Your Project"}
                  </Button>
                </Box>
              </Box>
            </div>
          </Container>
        </Box>
        <Divider sx={{ my: 3 }} />
        <footer
          style={{
            padding: "0 0 4rem 0",
            textAlign: "center",
            color: "var(--color-text-secondary)",
          }}
        >
          <p style={{ margin: 0, fontSize: "1rem" }}>
            This website was built using <strong>Next.js</strong>,{" "}
            <strong>TypeScript</strong>, <strong>Material UI</strong>, and{" "}
            <strong>GSAP</strong>. <br /> View the source code on{" "}
            <a
              href="https://github.com/khamudom/kham-website"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.25rem",
                textDecoration: "underline",
              }}
            >
              GitHub
              <ExternalLink size={16} />
            </a>
          </p>
          <div className={styles.mobileThemeSelector}>
            <Typography variant="body2" sx={{ mb: 2, display: "block" }}>
              Switch up the vibe with the theme selector!
            </Typography>
            <ThemeSelector />
          </div>
        </footer>
      </div>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
