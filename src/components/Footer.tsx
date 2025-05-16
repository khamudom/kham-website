import React from 'react';
import { Github, Linkedin, Mail, Twitter } from 'lucide-react';
import { Typography, Container, Box, IconButton, Divider, Link as MuiLink } from '@mui/material';
import { Link } from 'react-router-dom';
import styles from '../styles/Footer.module.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <Box component="footer" className={styles.footer}>
      <Container maxWidth="lg">
        <Box className={styles.content}>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: 'center', width: '100%', mb: 4 }}>
            <Box sx={{ mb: { xs: 3, md: 0 } }}>
              <Typography variant="h6" component="div" sx={{ fontWeight: 600, mb: 1 }}>
                Kham Udom
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Frontend UX Engineer
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Box component={Link} to="/" sx={{ color: 'text.secondary', textDecoration: 'none', '&:hover': { color: 'primary.main' } }}>
                Home
              </Box>
              <Box component={Link} to="/about" sx={{ color: 'text.secondary', textDecoration: 'none', '&:hover': { color: 'primary.main' } }}>
                About
              </Box>
              <Box component={Link} to="/work" sx={{ color: 'text.secondary', textDecoration: 'none', '&:hover': { color: 'primary.main' } }}>
                Work
              </Box>
              <Box component={Link} to="/contact" sx={{ color: 'text.secondary', textDecoration: 'none', '&:hover': { color: 'primary.main' } }}>
                Contact
              </Box>
            </Box>
          </Box>
          
          <Divider sx={{ width: '100%', mb: 4 }} />
          
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: { xs: 2, md: 0 } }}>
              © {currentYear} Kham Udom. All rights reserved.
            </Typography>
            
            <Box className={styles.socialLinks}>
              <IconButton
                href="https://github.com/khamudom"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}
              >
                <Github size={20} />
              </IconButton>
              <IconButton
                href="https://linkedin.com/in/khamudom"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}
              >
                <Linkedin size={20} />
              </IconButton>
              <IconButton
                href="https://twitter.com/khamudom"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}
              >
                <Twitter size={20} />
              </IconButton>
              <IconButton
                href="mailto:khamu@outlook.com"
                aria-label="Email"
                sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}
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