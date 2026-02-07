import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import MuiLink from "@mui/material/Link";
import { FaLinkedin, FaGithub, FaTwitter, FaEnvelope } from "react-icons/fa";

const footerLinks = {
  company: [
    { label: "About Us", path: "/about" },
    { label: "Services", path: "/" },
    { label: "Contact", path: "/contact" },
  ],
  resources: [
    { label: "Documentation", path: "#" },
    { label: "Blog", path: "#" },
    { label: "Support", path: "/contact" },
  ],
  legal: [
    { label: "Privacy Policy", path: "#" },
    { label: "Terms of Service", path: "#" },
    { label: "Cookie Policy", path: "#" },
  ],
};

export default function AppFooter() {
  const currentYear = new Date().getFullYear();

  const linkSx = {
    color: "#cbd5e1",
    textDecoration: "none",
    fontSize: "0.9375rem",
    "&:hover": { color: "#fff" },
  };

  return (
    <Box
      component="footer"
      role="contentinfo"
      sx={{
        mt: "auto",
        py: 4,
        px: 2,
        backgroundColor: "#0f172a",
        color: "#e2e8f0",
        position: "sticky",
        bottom: 0,
        zIndex: 10,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} sx={{ mb: 2 }}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 700, color: "#fff", mb: 2 }}>
              INXINFO Labs
            </Typography>
            <Typography sx={{ color: "#cbd5e1", lineHeight: 1.7, mb: 2 }}>
              Innovation Nexus for Information. Building enterprise-ready digital solutions that scale with your business.
            </Typography>
            <Box sx={{ display: "flex", gap: 1.5 }}>
              <MuiLink href="https://linkedin.com" target="_blank" rel="noreferrer" sx={{ color: "#cbd5e1", "&:hover": { color: "#fff" } }}>
                <FaLinkedin size={22} />
              </MuiLink>
              <MuiLink href="https://github.com" target="_blank" rel="noreferrer" sx={{ color: "#cbd5e1", "&:hover": { color: "#fff" } }}>
                <FaGithub size={22} />
              </MuiLink>
              <MuiLink href="https://twitter.com" target="_blank" rel="noreferrer" sx={{ color: "#cbd5e1", "&:hover": { color: "#fff" } }}>
                <FaTwitter size={22} />
              </MuiLink>
              <MuiLink href="mailto:satish.prasad@inxinfo.com" sx={{ color: "#cbd5e1", "&:hover": { color: "#fff" } }}>
                <FaEnvelope size={22} />
              </MuiLink>
            </Box>
          </Grid>
          <Grid item xs={6} md={2}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#fff", mb: 1.5 }}>
              Company
            </Typography>
            {footerLinks.company.map((link) => (
              <Box key={link.path} sx={{ mb: 1 }}>
                <Link to={link.path} style={{ textDecoration: "none" }}>
                  <Typography sx={linkSx}>{link.label}</Typography>
                </Link>
              </Box>
            ))}
          </Grid>
          <Grid item xs={6} md={2}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#fff", mb: 1.5 }}>
              Resources
            </Typography>
            {footerLinks.resources.map((link) => (
              <Box key={link.path} sx={{ mb: 1 }}>
                {link.path.startsWith("/") ? (
                  <Link to={link.path} style={{ textDecoration: "none" }}>
                    <Typography sx={linkSx}>{link.label}</Typography>
                  </Link>
                ) : (
                  <MuiLink href={link.path} sx={linkSx}>{link.label}</MuiLink>
                )}
              </Box>
            ))}
          </Grid>
          <Grid item xs={6} md={2}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#fff", mb: 1.5 }}>
              Legal
            </Typography>
            {footerLinks.legal.map((link) => (
              <Box key={link.path} sx={{ mb: 1 }}>
                <MuiLink href={link.path} sx={linkSx}>{link.label}</MuiLink>
              </Box>
            ))}
          </Grid>
          <Grid item xs={6} md={2}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#fff", mb: 1.5 }}>
              Contact
            </Typography>
            <Typography sx={{ color: "#cbd5e1", fontSize: "0.875rem" }}>
              <MuiLink href="mailto:satish.prasad@inxinfo.com" sx={{ color: "#cbd5e1", "&:hover": { color: "#fff" } }}>
                Email Us
              </MuiLink>
            </Typography>
            <Typography sx={{ color: "#cbd5e1", fontSize: "0.875rem", mt: 1 }}>
              23 and 30 Suloka Nilaya, Vishuvardhan Rd, Near RNSIT College, Bangalore – 560098
            </Typography>
            <Typography sx={{ color: "#cbd5e1", fontSize: "0.875rem" }}>📞 8050618092</Typography>
          </Grid>
        </Grid>
        <Box sx={{ borderTop: "1px solid rgba(255,255,255,0.12)", pt: 2, textAlign: "center" }}>
          <Typography variant="body2" sx={{ color: "#94a3b8" }}>
            © {currentYear} INXINFO Labs. All rights reserved. • v1.0.0
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
