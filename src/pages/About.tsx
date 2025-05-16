import { useRef } from "react";
import { FileDown } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import styles from "../styles/About.module.css";
import {
  Typography,
  Button,
  Container,
  Box,
  Paper,
  Divider,
} from "@mui/material";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const experienceRef = useRef<HTMLDivElement>(null);

  const experiences = [
    {
      title: "Software Engineer I",
      company: "C+E CX Studio, Microsoft Vendor",
      date: "Oct 2023 - Present",
      details: [
        "Develop reusable UI component libraries using Web Components.",
        "Build and document React Storybook components with clear adoption guidelines.",
        "Implement W3C ARIA-compliant accessibility standards.",
        "Collaborate with designers and engineers to refine component designs.",
      ],
    },
    {
      title: "UX Engineer II",
      company: "Web Experiences Prototyping Team, Microsoft",
      date: "Dec 2021 - Nov 2022",
      details: [
        "Developed high-fidelity interactive web-based prototypes using Web Components.",
        "Partnered with cross-functional teams to align prototypes with business objectives.",
        "Optimized performance and accessibility across experimental UI solutions.",
      ],
    },
    {
      title: "UX Engineer II",
      company: "Web Experiences Platform Team, Microsoft",
      date: "Nov 2017 - Dec 2021",
      details: [
        "Worked on improving UI frameworks and front-end tooling for Microsoft web platforms.",
        "Led UI performance optimizations for high-traffic Microsoft applications.",
      ],
    },
  ];

  useGSAP(() => {
    if (experienceRef.current) {
      gsap.fromTo(
        experienceRef.current.children,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: experienceRef.current,
            start: "top bottom-=100",
          },
        }
      );
    }
  }, []);

  return (
    <div>
      {/* 🔹 Hero Section */}
      <section className={styles.hero}>
        <Container>
          <Box className={styles.content}>
            <Typography variant="h1" className={styles.title}>
              Kham Udom
            </Typography>
            <Typography variant="h5" className={styles.subtitle}>
              Creating elegant, scalable, and high-performance UI solutions.
            </Typography>
            <Button
              href="/resume.pdf"
              download="kham-udom-resume.pdf"
              className={styles.resumeButton}
              variant="contained"
              startIcon={<FileDown size={20} />}
            >
              Download Resume
            </Button>
          </Box>
        </Container>
      </section>

      {/* 🔹 Experience Timeline */}
      <section className={styles.experienceSection}>
        <Container>
          <Typography
            variant="h2"
            align="center"
            className={styles.sectionTitle}
            gutterBottom
          >
            Experience
          </Typography>
          <Box ref={experienceRef} className={styles.timeline}>
            {experiences.map((exp, index) => (
              <Box key={index} className={styles.timelineItem}>
                {/* Animated Dot */}
                <Box className={styles.timelineDot}></Box>
                <Paper
                  elevation={3}
                  className={styles.timelineCard}
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.02)",
                      boxShadow: "0 10px 24px rgba(0, 0, 0, 0.15)",
                    },
                  }}
                >
                  <Typography variant="h6" className={styles.timelineTitle}>
                    {exp.title}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    className={styles.timelineCompany}
                  >
                    {exp.company}
                  </Typography>
                  <Typography variant="caption" className={styles.timelineDate}>
                    {exp.date}
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                  <ul className={styles.timelineList}>
                    {exp.details.map((detail, i) => (
                      <li key={i}>{detail}</li>
                    ))}
                  </ul>
                </Paper>
              </Box>
            ))}
          </Box>
        </Container>
      </section>

      {/* 🔹 Call to Action */}
      <section className={styles.ctaSection}>
        <Container>
          <Typography variant="h4" align="center">
            Want to collaborate on something awesome?
          </Typography>
          <Box display="flex" justifyContent="center" mt={3}>
            <Button href="/contact" variant="contained" size="large">
              Contact Me
            </Button>
          </Box>
        </Container>
      </section>
    </div>
  );
};

export default About;
