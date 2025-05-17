"use client";
import React, { useState } from "react";
import {
  Typography,
  Container,
  Grid,
  Box,
  TextField,
  Button,
  Paper,
  Snackbar,
  Alert,
} from "@mui/material";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import styles from "@/styles/pages/Contact.module.css";
import { getImagePath } from "@/utils/imageUtils";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  const handleChange = (
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
    // Here you would typically send the form data to your backend
    // For now, we'll just show a success message
    setSnackbar({
      open: true,
      message: "Message sent successfully!",
      severity: "success",
    });
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <div className={styles.contactPage}>
      {/* Hero Section */}
      <Box
        component="section"
        className={styles.hero}
        sx={{
          backgroundImage: `url(${getImagePath(
            "/images/placeholder.jpg",
            "full"
          )})`,
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
            Get in Touch
          </Typography>
        </Container>
      </Box>

      {/* Contact Section */}
      <Box component="section" sx={{ py: 8 }}>
        <Container>
          <Grid container spacing={6}>
            {/* Contact Information */}
            <Grid item xs={12} md={4}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  backgroundColor: "background.paper",
                  borderRadius: 2,
                  height: "100%",
                }}
              >
                <Typography variant="h3" gutterBottom>
                  Contact Info
                </Typography>
                <Box sx={{ mt: 4 }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                    <Mail size={24} className={styles.contactIcon} />
                    <Box sx={{ ml: 2 }}>
                      <Typography variant="subtitle1">Email</Typography>
                      <Typography variant="body2" color="text.secondary">
                        khamu@outlook.com
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                    <Phone size={24} className={styles.contactIcon} />
                    <Box sx={{ ml: 2 }}>
                      <Typography variant="subtitle1">Phone</Typography>
                      <Typography variant="body2" color="text.secondary">
                        +1 (555) 123-4567
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <MapPin size={24} className={styles.contactIcon} />
                    <Box sx={{ ml: 2 }}>
                      <Typography variant="subtitle1">Location</Typography>
                      <Typography variant="body2" color="text.secondary">
                        San Francisco, CA
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Paper>
            </Grid>

            {/* Contact Form */}
            <Grid item xs={12} md={8}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  backgroundColor: "background.paper",
                  borderRadius: 2,
                }}
              >
                <Typography variant="h3" gutterBottom>
                  Send a Message
                </Typography>
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Message"
                        name="message"
                        multiline
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        endIcon={<Send size={20} />}
                      >
                        Send Message
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

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
