"use client";

import React, { JSX } from "react";
import { useApi } from "@/hooks/useApi";
import { fetchProfile, fetchSkills, fetchExperience } from "@/utils/api";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { ErrorMessage } from "@/components/common/ErrorMessage";
import {
  Typography,
  Container,
  Box,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Divider,
} from "@mui/material";
import { Download, Calendar, MapPin } from "lucide-react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import styles from "@/styles/pages/About.module.css";

export default function About() {
  const {
    data: profileResponse,
    loading: profileLoading,
    error: profileError,
  } = useApi(fetchProfile);
  const {
    data: skillsResponse,
    loading: skillsLoading,
    error: skillsError,
  } = useApi(fetchSkills);
  const {
    data: experienceResponse,
    loading: experienceLoading,
    error: experienceError,
  } = useApi(fetchExperience);

  const [expanded, setExpanded] = React.useState<string | false>(false);
  const hasSetInitialExpanded = React.useRef(false);

  const handleChange =
    (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const profile = profileResponse?.data;
  const skills = skillsResponse?.data?.data || [];
  const experience = experienceResponse?.data?.data || [];

  React.useEffect(() => {
    if (experience.length > 0 && !hasSetInitialExpanded.current) {
      setExpanded(experience[0].id);
      hasSetInitialExpanded.current = true;
    }
  }, [experience]);

  if (!profile) {
    return null;
  }

  if (profileLoading || skillsLoading || experienceLoading) {
    return <LoadingSpinner size="large" />;
  }

  if (profileError || skillsError || experienceError) {
    return (
      <ErrorMessage
        message="Failed to load about page data. Please try again later."
        onRetry={() => window.location.reload()}
      />
    );
  }

  return (
    <>
      {/* Sticky Header */}
      <header className={styles.stickyHeader}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            maxWidth: "1280px",
          }}
        >
          <Button startIcon={<ArrowBackIcon />} href="/" color="inherit">
            Kham Udom
          </Button>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Download size={20} />}
            href="/khamu_resume.pdf"
            size="small"
            download
          >
            Download Resume
          </Button>
        </div>
      </header>
      {/* Main Content */}
      <Box component="section" sx={{ py: 9 }}>
        <Container
          maxWidth={false}
          sx={{ maxWidth: "1280px", margin: "0 auto" }}
        >
          <Typography variant="h1" sx={{ fontSize: "3rem", lineHeight: 1 }}>
            Experience
          </Typography>
          <Box sx={{ mt: 4 }}>
            {experience.map((item) => (
              <Accordion
                key={item.id}
                expanded={expanded === item.id}
                onChange={handleChange(item.id)}
                sx={{
                  mb: 2,
                  borderRadius: 2,
                  boxShadow: expanded === item.id ? 4 : 1,
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon sx={{ color: "text.primary" }} />}
                  aria-controls={`${item.id}-content`}
                  id={`${item.id}-header`}
                  sx={{
                    "& .MuiAccordionSummary-content": { alignItems: "center" },
                    borderRadius: 2,
                    mb: 3,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      width: "100%",
                    }}
                  >
                    <Chip
                      label={item.type}
                      color={item.type === "Contract" ? "success" : "primary"}
                      size="small"
                      sx={{ mr: 2, fontWeight: 600, mb: 1 }}
                    />
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h4" color="text.primary" mb={1}>
                        {item.position}
                      </Typography>
                      <Typography variant="h6" color="text.primary">
                        {item.company}
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 2,
                          mt: 0.5,
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 0.5,
                          }}
                        >
                          <Calendar
                            size={18}
                            style={{ marginRight: 4, opacity: 0.7 }}
                          />
                          <Typography variant="body2" color="text.secondary">
                            {typeof item.startDate === "string" &&
                            item.startDate === "Present"
                              ? "Present"
                              : new Date(item.startDate).toLocaleDateString(
                                  "en-US",
                                  {
                                    year: "numeric",
                                    month: "long",
                                  }
                                )}{" "}
                            -{" "}
                            {typeof item.endDate === "string" &&
                            item.endDate === "Present"
                              ? "Present"
                              : item.endDate
                              ? new Date(item.endDate).toLocaleDateString(
                                  "en-US",
                                  {
                                    year: "numeric",
                                    month: "long",
                                  }
                                )
                              : "Present"}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 0.5,
                          }}
                        >
                          <MapPin
                            size={18}
                            style={{ marginRight: 4, opacity: 0.7 }}
                          />
                          <Typography variant="body2" color="text.secondary">
                            {item.location}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </AccordionSummary>
                <AccordionDetails
                  sx={{ background: "background.paper", borderRadius: 2 }}
                >
                  <Divider sx={{ mb: 2 }} />
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 700, mb: 1 }}
                  >
                    Key Achievements
                  </Typography>
                  <Box component="ul" sx={{ pl: 3, mb: 2 }}>
                    {item.description.map((desc, idx) => (
                      <li
                        key={idx}
                        style={{
                          marginBottom: 8,
                          textAlign: "left",
                          fontSize: 16,
                          color: "var(--color-text-secondary)",
                        }}
                      >
                        {desc}
                      </li>
                    ))}
                  </Box>
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 700, mb: 1 }}
                  >
                    Technologies & Skills
                  </Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {item.technologies.map((tech, idx) => (
                      <Chip
                        key={idx}
                        label={tech}
                        variant="outlined"
                        color="primary"
                      />
                    ))}
                  </Box>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        </Container>
      </Box>
    </>
  );
}
