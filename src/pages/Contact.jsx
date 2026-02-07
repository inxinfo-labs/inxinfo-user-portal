import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  TextField,
  Button,
  Alert,
  Typography,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SendIcon from "@mui/icons-material/Send";
import { FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState(null);

  const validate = () => {
    const e = {};
    if (!form.name?.trim()) e.name = "Name is required";
    if (!form.email?.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Invalid email";
    if (!form.subject?.trim()) e.subject = "Subject is required";
    if (!form.message?.trim()) e.message = "Message is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = (e) => {
    e.preventDefault();
    setSubmitStatus(null);
    if (!validate()) return;
    try {
      setSubmitStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
      setErrors({});
    } catch {
      setSubmitStatus("error");
    }
  };

  const contactItems = [
    { icon: <EmailIcon />, title: "Email", content: "satish.prasad@inxinfo.com", href: "mailto:satish.prasad@inxinfo.com" },
    { icon: <PhoneIcon />, title: "Mobile", content: "8050618092", href: "tel:8050618092" },
    { icon: <LocationOnIcon />, title: "Address", content: "23 and 30 Suloka Nilaya, Vishuvardhan Rd, Near RNSIT College, Bangalore – 560098", href: null },
  ];

  return (
    <Box component="section" id="contact" sx={{ py: 6, bgcolor: "background.default" }}>
      <Container maxWidth="lg">
        <Typography variant="h4" fontWeight={700} textAlign="center" gutterBottom>
          Get In Touch
        </Typography>
        <Typography color="text.secondary" textAlign="center" sx={{ maxWidth: 600, mx: "auto", mb: 4 }}>
          Have a project in mind? Let's discuss how we can help bring your vision to life.
        </Typography>

        <Grid container spacing={3} sx={{ mb: 4 }}>
          {contactItems.map((item) => (
            <Grid item xs={12} md={4} key={item.title}>
              <Card variant="outlined" sx={{ height: "100%", textAlign: "center", py: 2 }}>
                <CardContent>
                  <Box sx={{ color: "primary.main", mb: 1 }}>{item.icon}</Box>
                  <Typography variant="subtitle1" fontWeight={600}>{item.title}</Typography>
                  {item.href ? (
                    <Typography component="a" href={item.href} color="text.secondary" sx={{ textDecoration: "none" }}>
                      {item.content}
                    </Typography>
                  ) : (
                    <Typography color="text.secondary" variant="body2">{item.content}</Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Card sx={{ overflow: "hidden" }}>
          <Grid container>
            <Grid item xs={12} md={5} sx={{ bgcolor: "primary.main", color: "white", p: 3 }}>
              <Typography variant="h6" fontWeight={700} gutterBottom>
                Let's Start a Conversation
              </Typography>
              <Typography sx={{ opacity: 0.95, mb: 2 }}>
                Whether you're looking to build a new platform, modernize existing systems, or explore innovative solutions, we're here to help.
              </Typography>
              <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1 }}>
                What We Can Help With:
              </Typography>
              <Typography component="ul" sx={{ pl: 2, "& li": { mb: 0.5 } }}>
                <li>SaaS Platform Development</li>
                <li>Cloud Migration & Architecture</li>
                <li>Enterprise Software Solutions</li>
                <li>API Development & Integration</li>
                <li>DevOps & Infrastructure</li>
                <li>Technical Consulting</li>
              </Typography>
              <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" style={{ color: "white" }}><FaLinkedin size={22} /></a>
                <a href="https://github.com" target="_blank" rel="noreferrer" style={{ color: "white" }}><FaGithub size={22} /></a>
                <a href="https://twitter.com" target="_blank" rel="noreferrer" style={{ color: "white" }}><FaTwitter size={22} /></a>
              </Box>
            </Grid>
            <Grid item xs={12} md={7} sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
                Send Us a Message
              </Typography>
              {submitStatus === "success" && (
                <Alert severity="success" onClose={() => setSubmitStatus(null)} sx={{ mb: 2 }}>
                  Thank you! Your message has been sent. We will get back to you shortly.
                </Alert>
              )}
              {submitStatus === "error" && (
                <Alert severity="error" onClose={() => setSubmitStatus(null)} sx={{ mb: 2 }}>
                  Something went wrong. Please try again or email us directly.
                </Alert>
              )}
              <Box component="form" onSubmit={submit}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Name"
                      required
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      error={!!errors.name}
                      helperText={errors.name}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email"
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                      error={!!errors.email}
                      helperText={errors.email}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Subject"
                      required
                      value={form.subject}
                      onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
                      error={!!errors.subject}
                      helperText={errors.subject}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Message"
                      required
                      multiline
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                      error={!!errors.message}
                      helperText={errors.message}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button type="submit" variant="contained" size="large" startIcon={<SendIcon />}>
                      Send Message
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Card>
      </Container>
    </Box>
  );
}
