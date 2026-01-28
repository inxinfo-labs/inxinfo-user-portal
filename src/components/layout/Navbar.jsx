import { useContext, useState } from "react";
import { AppBar, Toolbar, Typography, Button, Menu, MenuItem, Box, Avatar } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import SettingsIcon from "@mui/icons-material/Settings";
import { AuthContext } from "../../context/AuthContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { token, avatar, logout } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  // Scroll to section if on landing page, else navigate to landing first
  const scrollToSection = (id) => {
    if (window.location.pathname === "/") {
      const el = document.getElementById(id);
      el?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate(`/#${id}`);
    }
  };

  return (
    <AppBar position="sticky" color="default" elevation={1}>
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{ textDecoration: "none", color: "inherit", fontWeight: 600 }}
        >
          INXINFO Labs
        </Typography>

        <Box sx={{ flexGrow: 1, ml: 4 }}>
          <Button onClick={() => scrollToSection("home")}>Home</Button>
          <Button onClick={() => scrollToSection("about")}>About</Button>
          <Button onClick={() => scrollToSection("contact")}>Contact</Button>
        </Box>

        {!token ? (
          <>
            <Button
              component={Link}
              to="/auth/login"
              variant="outlined"
              color="primary"
              sx={{ ml: 2 }}
            >
              Login
            </Button>
            <Button
              component={Link}
              to="/auth/register"
              variant="contained"
              color="primary"
              sx={{ ml: 2 }}
            >
              Register
            </Button>
          </>
        ) : (
          <>
            <Button
              startIcon={<SettingsIcon />}
              onClick={handleMenuOpen}
              sx={{ textTransform: "none" }}
            >
              Settings
            </Button>

            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleMenuClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <MenuItem
                onClick={() => {
                  navigate("/user/profile");
                  handleMenuClose();
                }}
              >
                Profile
              </MenuItem>
              <MenuItem
                onClick={() => {
                  navigate("/user/profile/update");
                  handleMenuClose();
                }}
              >
                Update Profile
              </MenuItem>
              <MenuItem
                onClick={() => {
                  navigate("/user/profile/pic");
                  handleMenuClose();
                }}
              >
                Upload Profile Picture
              </MenuItem>
            </Menu>

            <Button
              variant="outlined"
              color="error"
              sx={{ ml: 2 }}
              onClick={() => { logout(); navigate("/"); }}
            >
              Logout
            </Button>

            {avatar && <Avatar src={avatar} sx={{ ml: 2, width: 32, height: 32 }} />}
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
