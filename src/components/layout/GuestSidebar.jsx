import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { useSidebar } from "../../context/SidebarContext";
import { AuthContext } from "../../context/AuthContext";
import { useAuthModal, AUTH_MODES } from "../../context/AuthModalContext";
import {
  FaHome,
  FaBox,
  FaPrayingHands,
  FaUserTie,
  FaCalendarAlt,
  FaBlog,
  FaMobileAlt,
  FaSignInAlt,
  FaUserPlus,
  FaThLarge,
} from "react-icons/fa";

const GUEST_NAV = [
  { path: "/", icon: FaHome, label: "Home" },
  { path: "/products", icon: FaBox, label: "Products" },
  { path: "/user/puja", icon: FaPrayingHands, label: "Puja" },
  { path: "/user/pandit", icon: FaUserTie, label: "Pandit" },
  { path: "/calendar", icon: FaCalendarAlt, label: "Festivals & Calendar" },
  { path: "/blog", icon: FaBlog, label: "Blog" },
  { path: "/install", icon: FaMobileAlt, label: "Install App" },
];

export default function GuestSidebar() {
  const location = useLocation();
  const { sidebarOpen } = useSidebar();
  const { token } = useContext(AuthContext);
  const { openAuth } = useAuthModal();

  if (!sidebarOpen) return null;

  const handleLogin = () => openAuth(AUTH_MODES.LOGIN);
  const handleSignup = () => openAuth(AUTH_MODES.REGISTER);

  return (
    <aside className="app-sidebar">
      <nav className="app-sidebar-nav">
        {GUEST_NAV.map((item) => {
          const Icon = item.icon;
          const isActive =
            location.pathname === item.path ||
            (item.path === "/" && location.pathname === "/") ||
            (item.path !== "/" && location.pathname.startsWith(item.path));
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`app-sidebar-item ${isActive ? "active" : ""}`}
            >
              <Icon className="app-sidebar-icon" />
              <span>{item.label}</span>
            </Link>
          );
        })}
        {token ? (
          <Link
            to="/user/home"
            className={`app-sidebar-item ${location.pathname === "/user" || location.pathname === "/user/home" ? "active" : ""}`}
          >
            <FaThLarge className="app-sidebar-icon" />
            <span>Dashboard</span>
          </Link>
        ) : (
          <>
            <button
              type="button"
              className="app-sidebar-item"
              onClick={handleLogin}
            >
              <FaSignInAlt className="app-sidebar-icon" />
              <span>Login</span>
            </button>
            <button
              type="button"
              className="app-sidebar-item"
              onClick={handleSignup}
            >
              <FaUserPlus className="app-sidebar-icon" />
              <span>Sign up</span>
            </button>
          </>
        )}
      </nav>
    </aside>
  );
}
