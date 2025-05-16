import React, { useState, useRef } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import {
  TextField,
  Snackbar,
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import { useTheme as useMuiTheme } from "@mui/material/styles";
import styles from "../styles/Contact.module.css";
import { Button } from "../design-system/components/Button";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const theme = useMuiTheme();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current.children,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top bottom-=100",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOpenSnackbar(true);
    setFormData({ name: "", email: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Box className="pt-20">
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box ref={contentRef}>
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Typography
              variant="h1"
              sx={{
                color: "primary.main",
                mb: 2,
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                fontWeight: 600,
              }}
            >
              Get in Touch
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "text.secondary",
                maxWidth: "600px",
                mx: "auto",
                fontSize: "clamp(1.125rem, 2vw, 1.25rem)",
              }}
            >
              Have a question or want to work together?
            </Typography>
          </Box>

          <Grid container spacing={6}>
            <Grid item xs={12} md={5}>
              <Box className={styles.contactInfo}>
                <Card
                  elevation={1}
                  sx={{
                    mb: 3,
                    borderRadius: 2,
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    "&:hover": {
                      boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
                    },
                  }}
                >
                  <CardContent>
                    <Box
                      sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}
                    >
                      <Mail color={theme.palette.primary.main} size={24} />
                      <Box>
                        <Typography variant="h6" sx={{ mb: 0.5 }}>
                          Email
                        </Typography>
                        <Typography variant="body2">
                          contact@example.com
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>

                <Card
                  elevation={1}
                  sx={{
                    mb: 3,
                    borderRadius: 2,
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    "&:hover": {
                      boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
                    },
                  }}
                >
                  <CardContent>
                    <Box
                      sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}
                    >
                      <Phone color={theme.palette.primary.main} size={24} />
                      <Box>
                        <Typography variant="h6" sx={{ mb: 0.5 }}>
                          Phone
                        </Typography>
                        <Typography variant="body2">
                          +1 (555) 123-4567
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>

                <Card
                  elevation={1}
                  sx={{
                    borderRadius: 2,
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    "&:hover": {
                      boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
                    },
                  }}
                >
                  <CardContent>
                    <Box
                      sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}
                    >
                      <MapPin color={theme.palette.primary.main} size={24} />
                      <Box>
                        <Typography variant="h6" sx={{ mb: 0.5 }}>
                          Location
                        </Typography>
                        <Typography variant="body2">
                          San Francisco, CA
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            </Grid>

            <Grid item xs={12} md={7}>
              <Card
                elevation={1}
                sx={{
                  borderRadius: 2,
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
                  },
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h4" sx={{ mb: 3 }}>
                    Send a Message
                  </Typography>
                  <Box component="form" onSubmit={handleSubmit}>
                    <TextField
                      label="Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      fullWidth
                      margin="normal"
                      variant="outlined"
                    />
                    <TextField
                      label="Email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      fullWidth
                      margin="normal"
                      variant="outlined"
                    />
                    <TextField
                      label="Message"
                      name="message"
                      multiline
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      fullWidth
                      margin="normal"
                      variant="outlined"
                    />
                    <Button
                      type="submit"
                      variant="contained"
                      startIcon={<Send size={20} />}
                      sx={{ mt: 2 }}
                    >
                      Send Message
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Container>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        message="Message sent successfully!"
      />
    </Box>
  );
};

export default Contact;
