/** @jsxImportSource react */
"use client";

import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Code2,
  Layout,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Clock,
  Wrench,
  ExternalLink,
} from "lucide-react";
import { usePortfolioData } from "@/hooks/usePortfolioData";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { ErrorMessage } from "@/components/common/ErrorMessage";
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
  Box,
  Divider,
  IconButton,
  Stack,
  TextField,
  Snackbar,
  Alert,
} from "@mui/material";
import { Button } from "@/design-system/components/Button";
import { useThemeBackgrounds } from "@/hooks/useThemeBackgrounds";
import HeaderVertical from "@/components/layout/HeaderVertical";
import { ThemeSelector } from "@/components/ThemeSelector";
import RotatingTitle from "@/components/animations/RotatingTitle";
import { SocialLinks } from "@/components/common/SocialLinks";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function Page() {
  const { projects, profile, skills, loading, error } = usePortfolioData();
  const backgrounds = useThemeBackgrounds();
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
  const aboutImageRef = useRef<HTMLDivElement>(null);
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
        // If the bottom of the header is above the top of the viewport, show sticky header
        setShowStickyHeader(rect.bottom <= 0);
      }
    };
    window.addEventListener("scroll", handleScroll);
    // Run once on mount
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

  return (
    <div className={styles.mainContainer}>
      {/* Background image, hidden on mobile */}
      {backgrounds.hero && typeof backgrounds.hero === "string" && (
        <img
          src={backgrounds.hero}
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
      {/* Navigation and theme selector, hidden on mobile via CSS */}
      <div className={styles.mainNavContainer}>
        <div className={styles.mainStickyNav}>
          <HeaderVertical
            activeSection={activeSection}
            onSectionChange={setActiveSection}
          />
          <div className={styles.stickyFooter}>
            {/* Social Links */}
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
        {/* Mobile HeaderContent and social links */}
        {isMobile && (
          <div
            ref={mobileHeaderRef}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "1rem",
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
        {/* Mobile sticky section header */}
        {isMobile && showStickyHeader && (
          <div className={styles.mobileSectionHeader}>
            {activeSection === "about" && "About"}
            {activeSection === "projects" && "Projects"}
            {activeSection === "contact" && "Contact"}
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
            <Grid container>
              <div ref={aboutContentRef}>
                <Typography variant="body1" color="text.primary" paragraph>
                  <strong>Front-end engineer</strong> with a track record of
                  creating <strong>intuitive</strong>,{" "}
                  <strong>performant</strong> user interfaces that drive{" "}
                  <strong>content creation</strong>,{" "}
                  <strong>business outcomes</strong>, and streamlined
                  development workflows. Skilled in{" "}
                  <strong>scaling design systems</strong> and guiding{" "}
                  <strong>technical design decisions</strong> across{" "}
                  <strong>enterprise-grade applications</strong>. Known for
                  working <strong>cross-functionally</strong> with designers,
                  product managers, and backend engineers to build{" "}
                  <strong>accessible</strong>, reliable, and{" "}
                  <strong>maintainable</strong> UI solutions. Brings a{" "}
                  <strong>collaborative</strong>,{" "}
                  <strong>flexible mindset</strong> and a strong sense of{" "}
                  <strong>accountability</strong> to every project.
                </Typography>
                <Typography variant="body1" color="text.primary" paragraph>
                  Currently, I work as a{" "}
                  <strong>freelance front-end developer</strong>, partnering
                  with <strong>startups</strong>, <strong>enterprises</strong>,
                  and individual clients to design and build high-quality
                  websites and <strong>web applications</strong>. I specialize
                  in delivering <strong>tailored solutions</strong> that balance
                  performance, <strong>usability</strong>, and{" "}
                  <strong>visual polish</strong>. Whether it's a marketing site,
                  an <strong>interactive product</strong>, or a{" "}
                  <strong>scalable</strong> app, I bring a{" "}
                  <strong>client-focused approach</strong> rooted in{" "}
                  <strong>clear communication</strong>,{" "}
                  <strong>efficient development practices</strong>, and a
                  commitment to <strong>measurable results</strong>.
                </Typography>
                <div className={styles.skillsContainer}>
                  <div className={styles.skillsCategory}>
                    <div className={styles.categoryHeader}>
                      <Code2 className={styles.categoryIcon} size={24} />
                      <Typography variant="h6">
                        Programming Languages
                      </Typography>
                    </div>
                    <div className={styles.skillsList}>
                      {skills
                        .filter((skill) => skill.category === "languages")
                        .map((skill, index, array) => (
                          <React.Fragment key={skill.id}>
                            <div className={styles.skillItem}>
                              <span>{skill.name}</span>
                            </div>
                            {index < array.length - 1 && (
                              <span className={styles.bullet}>•</span>
                            )}
                          </React.Fragment>
                        ))}
                    </div>
                  </div>
                  <div className={styles.skillsCategory}>
                    <div className={styles.categoryHeader}>
                      <Layout className={styles.categoryIcon} size={24} />
                      <Typography variant="h6">
                        Libraries & Frameworks
                      </Typography>
                    </div>
                    <div className={styles.skillsList}>
                      {skills
                        .filter((skill) => skill.category === "frameworks")
                        .map((skill, index, array) => (
                          <React.Fragment key={skill.id}>
                            <div className={styles.skillItem}>
                              <span>{skill.name}</span>
                            </div>
                            {index < array.length - 1 && (
                              <span className={styles.bullet}>•</span>
                            )}
                          </React.Fragment>
                        ))}
                    </div>
                  </div>
                  <div className={styles.skillsCategory}>
                    <div className={styles.categoryHeader}>
                      <Wrench className={styles.categoryIcon} size={24} />
                      <Typography variant="h6">Tools & Platforms</Typography>
                    </div>
                    <div className={styles.skillsList}>
                      {skills
                        .filter((skill) => skill.category === "tools")
                        .map((skill, index, array) => (
                          <React.Fragment key={skill.id}>
                            <div className={styles.skillItem}>
                              <span>{skill.name}</span>
                            </div>
                            {index < array.length - 1 && (
                              <span className={styles.bullet}>•</span>
                            )}
                          </React.Fragment>
                        ))}
                    </div>
                  </div>
                </div>
                <div className={styles.aboutButtons}>
                  <Button
                    component={Link}
                    href="/about"
                    variant="outlined"
                    size="small"
                    endIcon={<ArrowRight size={20} />}
                  >
                    Work Experiences
                  </Button>
                </div>
              </div>
            </Grid>
          </div>
        </Box>
        {/* Featured Projects Section */}
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
              <Card
                key={project.id}
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
                <CardContent sx={{ display: "flex", gap: 2 }}>
                  <Box className={styles.cardImage}>
                    <Image
                      width={200}
                      height={80}
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
                      {project.description}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Stack>
          <Box sx={{ mt: 4 }}>
            <Button
              component={Link}
              href="/portfolio"
              variant="outlined"
              size="small"
              endIcon={<ArrowRight size={20} />}
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
            scrollMarginTop: isMobile ? "3.5rem" : "2rem",
          }}
        >
          <Container maxWidth={false} disableGutters>
            <Typography variant="h3" gutterBottom align="center">
              Let's Start a Conversation
            </Typography>
            <Typography variant="body1" color="text.secondary" align="center">
              I'm always open to discussing new projects, creative ideas, or
              opportunities to be part of your vision.
            </Typography>
            <div>
              <Box
                sx={{
                  mt: 3,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
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
                  <Typography
                    variant="body1"
                    sx={{
                      mb: 4,
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <Clock size={20} />
                    <strong>Availability:</strong> Available for freelance work
                  </Typography>
                </div>
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
                  />

                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      size="small"
                      fullWidth
                      sx={{ mt: 2 }}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </Grid>
                </Box>
              </Box>
            </div>
          </Container>
        </Box>
        <Divider sx={{ my: 3 }} />
        {/* Footer */}
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
            <strong>GSAP</strong> for animations. View the source code on{" "}
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
