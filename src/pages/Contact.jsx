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
import emailjs from "@emailjs/browser";
import api from "../services/api";

const CONTACT_EMAIL = "satish.prasad@inxinfo.com";
const EMAILJS_SERVICE = process.env.REACT_APP_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;
const EMAILJS_CONFIGURED = EMAILJS_SERVICE && EMAILJS_TEMPLATE && EMAILJS_PUBLIC_KEY;

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState(null);
  const [submitError, setSubmitError] = useState("");
  const [sending, setSending] = useState(false);

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

  const submit = async (e) => {
    e.preventDefault();
    setSubmitStatus(null);
    setSubmitError("");
    if (!validate()) return;

    setSending(true);
    try {
      if (EMAILJS_CONFIGURED) {
        await emailjs.send(
          EMAILJS_SERVICE,
          EMAILJS_TEMPLATE,
          {
            to_email: CONTACT_EMAIL,
            from_name: form.name.trim(),
            from_email: form.email.trim(),
            subject: form.subject?.trim() || "Contact from INXINFO Labs",
            message: form.message?.trim(),
          },
          { publicKey: EMAILJS_PUBLIC_KEY }
        );
      } else {
        await api.post("/contact", {
          name: form.name.trim(),
          email: form.email.trim(),
          subject: form.subject?.trim() || "Contact from INXINFO Labs",
          message: form.message?.trim(),
        });
      }
      setSubmitStatus("sent");
      setForm({ name: "", email: "", subject: "", message: "" });
      setErrors({});
    } catch (err) {
      setSubmitStatus("error");
      setSubmitError(err.response?.data?.message || "Something went wrong. Please try again or email us directly at " + CONTACT_EMAIL);
    } finally {
      setSending(false);
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setSubmitStatus("copied");
      setTimeout(() => setSubmitStatus(null), 2000);
    } catch {
      setSubmitStatus(null);
    }
  };

  const contactItems = [
    { icon: <EmailIcon />, title: "Email", content: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
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
          Need help booking a puja or Pandit Ji? Get in touch for your Hindu ritual and puja samagri needs.
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
                Puja &amp; Pandit Ji Enquiries
              </Typography>
              <Typography sx={{ opacity: 0.95, mb: 2 }}>
                Book traditional Hindu puja, Pandit Ji for ceremonies, or order puja samagri. We are here for all your ritual needs.
              </Typography>
              <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1 }}>
                We Can Help With:
              </Typography>
              <Typography component="ul" sx={{ pl: 2, "& li": { mb: 0.5 } }}>
                <li>Puja booking (festival, Shradh, Satyanarayan)</li>
                <li>Pandit Ji at home</li>
                <li>Puja samagri &amp; ritual items</li>
                <li>Griha pravesh &amp; wedding ceremonies</li>
                <li>Custom rituals &amp; consultations</li>
                <li>Bulk orders for events</li>
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
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {EMAILJS_CONFIGURED
                  ? `Your message will be sent directly to ${CONTACT_EMAIL}. We will reply to the email you enter.`
                  : `Your message will be sent to ${CONTACT_EMAIL}. Click "Send Message" to open your email app—you must then click Send in that app for us to receive it. Or copy our email below and send from Gmail.`}
              </Typography>
              {submitStatus === "sent" && (
                <Alert severity="success" onClose={() => setSubmitStatus(null)} sx={{ mb: 2 }}>
                  Message sent. We received it at {CONTACT_EMAIL} and will reply to you shortly.
                </Alert>
              )}
              {submitStatus === "success" && (
                <Alert severity="info" onClose={() => setSubmitStatus(null)} sx={{ mb: 2 }}>
                  Your email app should have opened. <strong>Click Send in that app</strong> to deliver the message to us.
                </Alert>
              )}
              {submitStatus === "copied" && (
                <Alert severity="success" onClose={() => setSubmitStatus(null)} sx={{ mb: 2 }}>
                  Email address copied. Paste it in Gmail or your email and send your message there.
                </Alert>
              )}
              {submitStatus === "error" && (
                <Alert severity="error" onClose={() => { setSubmitStatus(null); setSubmitError(""); }} sx={{ mb: 2 }}>
                  {submitError || `Something went wrong. Please try again or email us directly at ${CONTACT_EMAIL}.`}
                </Alert>
              )}
              <Box sx={{ mb: 2, display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
                <Typography variant="body2" color="text.secondary">
                  Or copy our email and send from your inbox:
                </Typography>
                <Button size="small" variant="outlined" onClick={copyEmail} sx={{ textTransform: "none" }}>
                  {CONTACT_EMAIL} — Copy
                </Button>
              </Box>
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
                    <Button type="submit" variant="contained" size="large" startIcon={<SendIcon />} disabled={sending}>
                      {sending ? "Sending…" : "Send Message"}
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
