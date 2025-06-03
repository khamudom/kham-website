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
  Clock,
  ExternalLink,
} from "lucide-react";
import { usePortfolioData } from "@/hooks/usePortfolioData";
import { LoadingSpinner } from "@/components/LoadingSpinner/LoadingSpinner";
import { ErrorMessage } from "@/components/ErrorMessage/ErrorMessage";
import styles from "@/styles/pages/Home.module.css";
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
  const [showStickyHeader, setShowStickyHeader] = useState(false);

  // Get featured projects (first 3)
  const featuredProjects = projects.slice(0, 3);

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

      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const section of sections) {
        if (section.ref.current) {
          const { top, bottom } = section.ref.current.getBoundingClientRect();
          const offsetTop = top + window.scrollY;
          const offsetBottom = bottom + window.scrollY;

          if (scrollPosition >= offsetTop && scrollPosition <= offsetBottom) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (!isMobile) {
      setShowStickyHeader(false);
      return;
    }
    const handleScroll = () => {
      if (mobileHeaderRef.current) {
        const rect = mobileHeaderRef.current.getBoundingClientRect();
        setShowStickyHeader(rect.bottom <= 0);
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

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

  if (loading) {
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
        {isMobile && showStickyHeader && (
          <div className={styles.mobileSectionHeader}>
            {activeSection === "about" && "About"}
            {activeSection === "projects" && "Projects"}
            {activeSection === "contact" && "Contact"}
          </div>
        )}
        <Box
          component="section"
          ref={aboutSectionRef}
          id="about"
          sx={{
            scrollMarginTop: isMobile ? "3.5rem" : "6rem",
          }}
        >
          <div>
            <div ref={aboutContentRef}>
              <Typography
                variant="body1"
                color="text.primary"
                paragraph
                sx={{
                  lineHeight: { xs: 1.8, sm: 1.9 },
                  letterSpacing: { xs: "0.01em", sm: "0.02em" },
                  fontSize: { xs: "1rem", sm: "1.1rem" },
                  maxWidth: "65ch",
                  marginBottom: "1rem",
                }}
              >
                <strong>Front-end engineer</strong> with a track record of
                creating <strong>intuitive</strong>, <strong>performant</strong>{" "}
                user interfaces that drive <strong>content creation</strong>,{" "}
                <strong>business outcomes</strong>, and streamlined development
                workflows. Skilled in <strong>scaling design systems</strong>{" "}
                and guiding <strong>technical design decisions</strong> across{" "}
                <strong>enterprise-grade applications</strong>. Known for
                working <strong>cross-functionally</strong> with designers,
                product managers, and backend engineers to build{" "}
                <strong>accessible</strong>, reliable, and{" "}
                <strong>maintainable</strong> UI solutions. Brings a{" "}
                <strong>collaborative</strong>,{" "}
                <strong>flexible mindset</strong> and a strong sense of{" "}
                <strong>accountability</strong> to every project.
              </Typography>
              <Typography
                variant="body1"
                color="text.primary"
                paragraph
                sx={{
                  lineHeight: { xs: 1.8, sm: 1.9 },
                  letterSpacing: { xs: "0.01em", sm: "0.02em" },
                  fontSize: { xs: "1rem", sm: "1.1rem" },
                  maxWidth: "65ch",
                }}
              >
                Currently, I work as a{" "}
                <strong>freelance front-end developer</strong>, partnering with
                individual clients to design and build high-quality websites and{" "}
                <strong>web applications</strong>. I specialize in delivering{" "}
                <strong>tailored solutions</strong> that balance performance,{" "}
                <strong>usability</strong>, and <strong>visual polish</strong>.
                Whether it's a marketing site, an{" "}
                <strong>interactive product</strong>, or a{" "}
                <strong>scalable</strong> app, I bring a{" "}
                <strong>client-focused approach</strong> rooted in{" "}
                <strong>clear communication</strong>,{" "}
                <strong>efficient development practices</strong>, and a
                commitment to <strong>measurable results</strong>.
              </Typography>
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
                  <CardContent sx={{ display: "flex", gap: 2, padding: "12px", "&:last-child": { paddingBottom: "12px" } }}>
                    <Box className={styles.cardImage}>
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
                      <Typography variant="h5" component="h3">
                        {project.title}
                      </Typography>
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
        <Box
          component="section"
          ref={contactSectionRef}
          id="contact"
          sx={{
            py: 4,
            backgroundColor: "background.default",
            display: "flex",
            alignItems: "center",
            scrollMarginTop: isMobile ? "3.5rem" : "2rem",
          }}
        >
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
                <div>
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
                />
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
            This website was designed and built using <strong>Next.js</strong>,{" "}
            <strong>TypeScript</strong>, <strong>Material UI</strong>, and{" "}
            <strong>GSAP</strong>. <br /> View the source code on{" "}
            <a
              href="https://github.com/khamudom/kham-website"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "var(--color-primary)",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.25rem",
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
