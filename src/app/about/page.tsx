"use client";

import React from "react";
import { useApi } from "@/hooks/useApi";
import { getProfile, getSkills, getExperience } from "../../data/api";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Typography, Container, Grid, Box, Paper } from "@mui/material";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from "@mui/lab";
import { Briefcase, GraduationCap } from "lucide-react";
import styles from "@/styles/About.module.css";

export default function About() {
  const { data: profile, loading: profileLoading } = useApi(getProfile);
  const { data: skills, loading: skillsLoading } = useApi(getSkills);
  const { data: experience, loading: experienceLoading } =
    useApi(getExperience);

  if (typeof window !== "undefined") {
    // safe to use localStorage
  }

  if (profileLoading || skillsLoading || experienceLoading || !profile) {
    return <LoadingSpinner />;
  }

  return (
    <div className={styles.aboutPage}>
      {/* Hero Section */}
      <Box
        component="section"
        className={styles.hero}
        sx={{
          backgroundImage: `url(${profile.coverImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          height: "40vh",
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
            About Me
          </Typography>
        </Container>
      </Box>

      {/* Bio Section */}
      <Box component="section" sx={{ py: 8 }}>
        <Container>
          <Grid container spacing={6}>
            <Grid item xs={12} md={6}>
              <Typography variant="h2" gutterBottom>
                My Journey
              </Typography>
              {profile.bio.map((paragraph, index) => (
                <Typography
                  key={index}
                  variant="body1"
                  color="text.secondary"
                  paragraph
                >
                  {paragraph}
                </Typography>
              ))}
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  backgroundColor: "background.paper",
                  borderRadius: 2,
                }}
              >
                <Typography variant="h3" gutterBottom>
                  Skills & Expertise
                </Typography>
                <Grid container spacing={2}>
                  {skills?.map((skill) => (
                    <Grid item xs={6} key={skill.id}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                        }}
                      >
                        <span style={{ fontSize: 20 }}>{skill.iconName}</span>
                        <Typography variant="body1">{skill.name}</Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Experience Section */}
      <Box
        component="section"
        sx={{ py: 8, backgroundColor: "background.default" }}
      >
        <Container>
          <Typography variant="h2" gutterBottom>
            Experience
          </Typography>
          <Timeline position="alternate">
            {experience?.map((item) => (
              <TimelineItem key={item.id}>
                <TimelineSeparator>
                  <TimelineDot
                    sx={{
                      backgroundColor: "primary.main",
                    }}
                  >
                    {item.type === "work" ? (
                      <Briefcase size={16} />
                    ) : (
                      <GraduationCap size={16} />
                    )}
                  </TimelineDot>
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      backgroundColor: "background.paper",
                      borderRadius: 2,
                    }}
                  >
                    <Typography variant="h6" gutterBottom>
                      {item.title}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      color="primary"
                      gutterBottom
                    >
                      {item.company}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                    >
                      {item.period}
                    </Typography>
                    <Typography variant="body1">{item.description}</Typography>
                  </Paper>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </Container>
      </Box>
    </div>
  );
}
