import { useEffect, useContext } from "react";
import { Navbar, Nav, Container, NavDropdown, Image, Button } from "react-bootstrap";
import { useNavigate, NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { ThemeContext } from "../../context/ThemeContext";

export default function AppHeader() {
  const navigate = useNavigate();
  const { user, avatar, refreshAvatar } = useContext(AuthContext); // 🔹 use global avatar
  const { theme, toggleTheme } = useContext(ThemeContext);

  // 🔹 Ensure avatar is loaded at login
  useEffect(() => {
    if (user && !avatar) {
      refreshAvatar();
    }
  }, [user, avatar, refreshAvatar]);

  const token = localStorage.getItem("accessToken");

  return (
    <Navbar expand="lg" sticky="top" className="border-bottom shadow-sm bg-body">
      <Container fluid>
        {/* BRAND */}
        <Navbar.Brand
          onClick={() => navigate("/user/home")}
          className="fw-bold"
          style={{ cursor: "pointer" }}
        >
          SatishLabs
        </Navbar.Brand>

        <Navbar.Toggle />
        <Navbar.Collapse>
          {token && user && (
            <Nav className="ms-auto align-items-center">
              <div className="d-flex align-items-center gap-3">
                {/* HOME NAV LINK */}
                <NavLink
                  to="/user/home"
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "fw-bold text-primary" : "text-secondary"}`
                  }
                >
                  Home
                </NavLink>
                <NavLink
                  to="/user/about"
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "fw-bold text-primary" : "text-secondary"}`
                  }
                >
                  About
                </NavLink>

                <NavLink
                  to="/user/contact"
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "fw-bold text-primary" : "text-secondary"}`
                  }
                >
                  Contact
                </NavLink>

                {/* THEME TOGGLE */}
                <Button
                  variant="outline-secondary"
                  size="sm"
                  className="rounded-circle"
                  onClick={toggleTheme}
                >
                  {theme === "light" ? "🌙" : "☀️"}
                </Button>

                {/* PROFILE AVATAR DROPDOWN */}
                <NavDropdown
                  align="end"
                  id="profile-dropdown"
                  title={
                    <Image
                      src={avatar || "/assets/images/default-avatar.png"} // 🔹 fallback
                      roundedCircle
                      width={36}
                      height={36}
                    />
                  }
                >
                  <NavDropdown.Header
                    className="fw-semibold text-center rounded p-1"
                    style={{ color: "#fff", backgroundColor: "#0d6efd" }}
                  >
                    {user.name}
                  </NavDropdown.Header>

                  <NavDropdown.Divider />

                  <NavDropdown.Item onClick={() => navigate("/user/profile")}>
                    👤 View Profile
                  </NavDropdown.Item>

                  <NavDropdown.Item onClick={() => navigate("/user/profile/update")}>
                    ✏️ Update Profile
                  </NavDropdown.Item>

                  <NavDropdown.Item onClick={() => navigate("/user/profile/pic")}>
                    🖼️ Change Profile Picture
                  </NavDropdown.Item>

                  <NavDropdown.Divider />

                  <NavDropdown.Item
                    className="text-danger text-center fw-semibold"
                    onClick={() => {
                      localStorage.clear();
                      navigate("/auth/login");
                    }}
                  >
                    🚪 Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </div>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
