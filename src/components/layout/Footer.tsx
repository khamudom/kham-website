import React from "react";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import {
  Typography,
  Container,
  Box,
  IconButton,
  Divider,
  Link as MuiLink,
} from "@mui/material";
import Link from "next/link";
import styles from "./styles/Footer.module.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box component="footer" className={styles.footer}>
      <Container maxWidth="lg">
        <Box className={styles.content}>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              mb: 4,
            }}
          >
            <Box sx={{ mb: { xs: 3, md: 0 } }}>
              <Typography
                variant="h6"
                component="div"
                sx={{ fontWeight: 600, mb: 1 }}
              >
                Kham Udom
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Frontend UX Engineer
              </Typography>
            </Box>

            <Box sx={{ display: "flex", gap: 2 }}>
              <Box
                component={Link}
                href="/"
                sx={{
                  color: "text.secondary",
                  textDecoration: "none",
                  "&:hover": { color: "primary.main" },
                }}
              >
                Home
              </Box>
              <Box
                component={Link}
                href="/about"
                sx={{
                  color: "text.secondary",
                  textDecoration: "none",
                  "&:hover": { color: "primary.main" },
                }}
              >
                About
              </Box>
              <Box
                component={Link}
                href="/projects"
                sx={{
                  color: "text.secondary",
                  textDecoration: "none",
                  "&:hover": { color: "primary.main" },
                }}
              >
                Projects
              </Box>
            </Box>
          </Box>

          <Divider sx={{ width: "100%", mb: 4 }} />

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Typography variant="body2" color="text.secondary">
              © {currentYear} Kham Udom. All rights reserved.
            </Typography>

            <Box sx={{ display: "flex", gap: 2, mt: { xs: 2, md: 0 } }}>
              <IconButton
                component={MuiLink}
                href="https://github.com/khamudom"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                sx={{
                  color: "text.secondary",
                  "&:hover": { color: "primary.main" },
                }}
              >
                <Github size={20} />
              </IconButton>
              <IconButton
                component={MuiLink}
                href="https://linkedin.com/in/khamudom"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                sx={{
                  color: "text.secondary",
                  "&:hover": { color: "primary.main" },
                }}
              >
                <Linkedin size={20} />
              </IconButton>
              <IconButton
                component={MuiLink}
                href="https://twitter.com/khamudom"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                sx={{
                  color: "text.secondary",
                  "&:hover": { color: "primary.main" },
                }}
              >
                <Twitter size={20} />
              </IconButton>
              <IconButton
                component={MuiLink}
                href="mailto:khamu@outlook.com"
                aria-label="Email"
                sx={{
                  color: "text.secondary",
                  "&:hover": { color: "primary.main" },
                }}
              >
                <Mail size={20} />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
