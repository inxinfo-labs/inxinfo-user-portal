import { useContext, useState } from "react";
import { AppBar, Toolbar, Typography, Button, Menu, MenuItem, Box, Avatar, IconButton, useMediaQuery, useTheme } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import SettingsIcon from "@mui/icons-material/Settings";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { AuthContext } from "../../context/AuthContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { token, avatar, logout } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleNavClick = (link) => {
    setMobileMenuOpen(false);
    if (link.path === "/") {
      navigate("/");
      setTimeout(() => {
        const el = document.getElementById("home");
        el?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      navigate(link.path);
    }
  };

  const navLinks = [
    { label: "Home", path: "/", isRoute: true },
    { label: "About", path: "/about", isRoute: true },
    { label: "Contact", path: "/contact", isRoute: true },
  ];

  return (
    <AppBar 
      position="sticky" 
      elevation={0}
      sx={{ 
        background: "white",
        borderBottom: "1px solid #e2e8f0",
        color: "#1e293b"
      }}
    >
      <Toolbar sx={{ py: 1 }}>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{ 
            textDecoration: "none", 
            color: "#2563eb", 
            fontWeight: 700,
            fontSize: "1.5rem",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            "&:hover": {
              opacity: 0.9
            }
          }}
        >
          INXINFO Labs
        </Typography>

        {/* Desktop Navigation */}
        {!isMobile && (
          <Box sx={{ flexGrow: 1, ml: 4, display: "flex", gap: 1 }}>
            {navLinks.map((link) => (
              <Button
                key={link.path}
                onClick={() => handleNavClick(link)}
                sx={{
                  color: "#475569",
                  fontWeight: 500,
                  textTransform: "none",
                  "&:hover": {
                    color: "#0d9488",
                    background: "rgba(13, 148, 136, 0.08)"
                  }
                }}
              >
                {link.label}
              </Button>
            ))}
          </Box>
        )}

        {/* Mobile Menu Button */}
        {isMobile && (
          <Box sx={{ flexGrow: 1 }} />
        )}

        {isMobile && (
          <IconButton
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            sx={{ color: "#475569" }}
          >
            {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
        )}

        {/* Auth Buttons */}
        {!token ? (
          <Box sx={{ display: "flex", gap: 1, ml: 2 }}>
            <Button
              component={Link}
              to="/auth/login"
              variant="outlined"
              sx={{
                color: "#0d9488",
                borderColor: "#0d9488",
                textTransform: "none",
                fontWeight: 600,
                borderRadius: "8px",
                "&:hover": {
                  borderColor: "#0f766e",
                  background: "rgba(13, 148, 136, 0.08)"
                }
              }}
            >
              Login
            </Button>
            <Button
              component={Link}
              to="/auth/register"
              variant="contained"
              sx={{
                background: "linear-gradient(135deg, #0d9488 0%, #0f766e 100%)",
                textTransform: "none",
                fontWeight: 600,
                borderRadius: "8px",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                "&:hover": {
                  background: "linear-gradient(135deg, #0f766e 0%, #115e59 100%)",
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                  transform: "translateY(-2px)"
                }
              }}
            >
              Register
            </Button>
          </Box>
        ) : (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, ml: 2 }}>
            <Button
              startIcon={<SettingsIcon />}
              onClick={handleMenuOpen}
              sx={{
                textTransform: "none",
                color: "#475569",
                fontWeight: 500,
                "&:hover": {
                  color: "#2563eb",
                  background: "rgba(37, 99, 235, 0.05)"
                }
              }}
            >
              {!isMobile && "Settings"}
            </Button>

            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleMenuClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              PaperProps={{
                sx: {
                  borderRadius: "12px",
                  boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
                  mt: 1,
                  minWidth: 200
                }
              }}
            >
              <MenuItem
                onClick={() => {
                  navigate("/user/profile");
                  handleMenuClose();
                }}
                sx={{
                  "&:hover": {
                    background: "rgba(37, 99, 235, 0.05)"
                  }
                }}
              >
                Profile
              </MenuItem>
              <MenuItem
                onClick={() => {
                  navigate("/user/profile/update");
                  handleMenuClose();
                }}
                sx={{
                  "&:hover": {
                    background: "rgba(37, 99, 235, 0.05)"
                  }
                }}
              >
                Update Profile
              </MenuItem>
              <MenuItem
                onClick={() => {
                  navigate("/user/profile/pic");
                  handleMenuClose();
                }}
                sx={{
                  "&:hover": {
                    background: "rgba(37, 99, 235, 0.05)"
                  }
                }}
              >
                Upload Profile Picture
              </MenuItem>
            </Menu>

            <Button
              variant="outlined"
              sx={{
                color: "#ef4444",
                borderColor: "#ef4444",
                textTransform: "none",
                fontWeight: 600,
                borderRadius: "8px",
                "&:hover": {
                  borderColor: "#dc2626",
                  background: "rgba(239, 68, 68, 0.05)"
                }
              }}
              onClick={() => { logout(); navigate("/"); }}
            >
              Logout
            </Button>

            {avatar && (
              <Avatar 
                src={avatar} 
                sx={{ 
                  ml: 1, 
                  width: 36, 
                  height: 36,
                  border: "2px solid #e2e8f0",
                  cursor: "pointer",
                "&:hover": {
                  borderColor: "#0d9488"
                }
              }}
                onClick={() => navigate("/user/profile")}
              />
            )}
          </Box>
        )}
      </Toolbar>

      {/* Mobile Menu */}
      {isMobile && mobileMenuOpen && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            p: 2,
            borderTop: "1px solid #e2e8f0",
            background: "#f8fafc"
          }}
        >
          {navLinks.map((link) => (
            <Button
              key={link.path}
              onClick={() => handleNavClick(link)}
              fullWidth
              sx={{
                color: "#475569",
                fontWeight: 500,
                textTransform: "none",
                justifyContent: "flex-start",
                "&:hover": {
                  color: "#0d9488",
                  background: "rgba(13, 148, 136, 0.08)"
                }
              }}
            >
              {link.label}
            </Button>
          ))}
        </Box>
      )}
    </AppBar>
  );
}
