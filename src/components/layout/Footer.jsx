import { useContext } from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import MuiLink from "@mui/material/Link";
import { FaLinkedin, FaGithub, FaTwitter, FaEnvelope } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";
import { usePageModal, PAGE_MODAL_TYPES } from "../../context/PageModalContext";
import { isAdmin } from "../../utils/admin";

const footerLinks = (admin) => ({
  company: [
    { label: "About Us", path: "/about", pageModal: PAGE_MODAL_TYPES.ABOUT },
    { label: "Services", path: "/" },
    { label: "Contact", path: "/contact", pageModal: PAGE_MODAL_TYPES.CONTACT },
  ],
  resources: [
    ...(admin ? [{ label: "Documentation", path: "/docs" }] : []),
    { label: "Blog", path: "/blog", pageModal: PAGE_MODAL_TYPES.BLOG },
    { label: "Support", path: "/contact", pageModal: PAGE_MODAL_TYPES.CONTACT },
  ],
  legal: [
    { label: "Privacy Policy", path: "#" },
    { label: "Terms of Service", path: "#" },
    { label: "Cookie Policy", path: "#" },
  ],
});

export default function AppFooter() {
  const { user } = useContext(AuthContext);
  const { openPage } = usePageModal();
  const admin = isAdmin(user);
  const links = footerLinks(admin);
  const currentYear = new Date().getFullYear();

  const linkSx = {
    color: "#cbd5e1",
    textDecoration: "none",
    fontSize: "0.9375rem",
    "&:hover": { color: "#ff9933" },
  };

  const iconSx = {
    color: "#94a3b8",
    "&:hover": { color: "#ff9933" },
    transition: "color 0.2s ease",
  };

  return (
    <Box component="footer" role="contentinfo" sx={{ mt: "auto", zIndex: 10 }}>
      {/* Ritual / festival accent strip */}
      <Box
        sx={{
          height: 4,
          background: "linear-gradient(90deg, #ff9933 0%, #ff9933 33.33%, #ffffff 33.33%, #ffffff 66.66%, #b91c1c 66.66%, #b91c1c 100%)",
        }}
      />
      <Box
        sx={{
          py: 4,
          px: 2,
          background: "linear-gradient(180deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)",
          color: "#e2e8f0",
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} sx={{ mb: 3 }}>
            <Grid item xs={12} md={4}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 800,
                  background: "linear-gradient(135deg, #fff 0%, #ff9933 100%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                  mb: 2,
                  letterSpacing: "-0.02em",
                }}
              >
                INXINFO Labs
              </Typography>
              <Typography sx={{ color: "#cbd5e1", lineHeight: 1.75, mb: 2, fontSize: "0.9375rem" }}>
                Book Hindu puja, Pandit Ji, and puja samagri for all your rituals. Traditional ceremonies at your doorstep.
              </Typography>
              <Box sx={{ display: "flex", gap: 1.5 }}>
                <MuiLink href="https://linkedin.com" target="_blank" rel="noreferrer" sx={iconSx}>
                  <FaLinkedin size={22} />
                </MuiLink>
                <MuiLink href="https://github.com" target="_blank" rel="noreferrer" sx={iconSx}>
                  <FaGithub size={22} />
                </MuiLink>
                <MuiLink href="https://twitter.com" target="_blank" rel="noreferrer" sx={iconSx}>
                  <FaTwitter size={22} />
                </MuiLink>
                <MuiLink href="mailto:satish.prasad@inxinfo.com" sx={iconSx}>
                  <FaEnvelope size={22} />
                </MuiLink>
              </Box>
            </Grid>
            <Grid item xs={6} md={2}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#ff9933", mb: 1.5, textTransform: "uppercase", letterSpacing: "0.05em", fontSize: "0.75rem" }}>
                Company
              </Typography>
            {links.company.map((link) => (
              <Box key={link.path + link.label} sx={{ mb: 1 }}>
                {link.pageModal ? (
                  <Typography component="button" type="button" onClick={() => openPage(link.pageModal)} sx={{ ...linkSx, border: 0, background: "none", cursor: "pointer", padding: 0 }}>
                    {link.label}
                  </Typography>
                ) : (
                  <Link to={link.path} style={{ textDecoration: "none" }}>
                    <Typography sx={linkSx}>{link.label}</Typography>
                  </Link>
                )}
              </Box>
            ))}
          </Grid>
          <Grid item xs={6} md={2}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#ff9933", mb: 1.5, textTransform: "uppercase", letterSpacing: "0.05em", fontSize: "0.75rem" }}>
                Resources
              </Typography>
            {links.resources.map((link) => (
              <Box key={link.path + link.label} sx={{ mb: 1 }}>
                {link.pageModal ? (
                  <Typography component="button" type="button" onClick={() => openPage(link.pageModal)} sx={{ ...linkSx, border: 0, background: "none", cursor: "pointer", padding: 0 }}>
                    {link.label}
                  </Typography>
                ) : link.path.startsWith("/") ? (
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
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#ff9933", mb: 1.5, textTransform: "uppercase", letterSpacing: "0.05em", fontSize: "0.75rem" }}>
                Legal
              </Typography>
            {links.legal.map((link) => (
              <Box key={link.path} sx={{ mb: 1 }}>
                <Link to={link.path} style={{ textDecoration: "none" }}>
                  <Typography sx={linkSx}>{link.label}</Typography>
                </Link>
              </Box>
            ))}
          </Grid>
          <Grid item xs={6} md={2}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#ff9933", mb: 1.5, textTransform: "uppercase", letterSpacing: "0.05em", fontSize: "0.75rem" }}>
                Contact
              </Typography>
            <Typography sx={{ color: "#cbd5e1", fontSize: "0.875rem" }}>
              <MuiLink href="mailto:satish.prasad@inxinfo.com" sx={{ color: "#cbd5e1", "&:hover": { color: "#ff9933" } }}>
                Email Us
              </MuiLink>
            </Typography>
            <Typography sx={{ color: "#cbd5e1", fontSize: "0.875rem", mt: 1 }}>
              23 and 30 Suloka Nilaya, Vishuvardhan Rd, Near RNSIT College, Bangalore – 560098
            </Typography>
            <Typography sx={{ color: "#cbd5e1", fontSize: "0.875rem" }}>📞 8050618092</Typography>
          </Grid>
        </Grid>
        <Box sx={{ borderTop: "1px solid rgba(255, 153, 51, 0.2)", pt: 3, textAlign: "center" }}>
            <Typography variant="body2" sx={{ color: "#94a3b8", fontSize: "0.875rem" }}>
              © {currentYear} INXINFO Labs. All rights reserved. • v1.0.0
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
