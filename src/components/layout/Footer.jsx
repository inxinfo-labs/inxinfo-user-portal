import { useContext } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Container } from "react-bootstrap";
import { AuthContext } from "../../context/AuthContext";
import AppConfig from "../../config/appConfig";
import { usePageModal, PAGE_MODAL_TYPES } from "../../context/PageModalContext";
import { isAdmin } from "../../utils/admin";

const IconMail = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);
const IconPhone = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);
const IconLocation = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const footerLinks = (admin) => ({
  company: [
    { label: "About Us", path: "/about", pageModal: PAGE_MODAL_TYPES.ABOUT },
    { label: "Services", path: "/" },
    { label: "Contact", path: "/contact", pageModal: PAGE_MODAL_TYPES.CONTACT },
  ],
  resources: [
    ...(admin ? [{ label: "Documentation", path: "/docs" }] : []),
    { label: "Festivals & Calendar", path: "/calendar" },
    { label: "Blog", path: "/blog", pageModal: PAGE_MODAL_TYPES.BLOG },
    { label: "Install App", path: "/install" },
    { label: "Support", path: "/contact", pageModal: PAGE_MODAL_TYPES.CONTACT },
  ],
  legal: [
    { label: "Privacy Policy", path: "#" },
    { label: "Terms of Service", path: "#" },
  ],
});

export default function AppFooter() {
  const { user } = useContext(AuthContext);
  const { openPage } = usePageModal();
  const admin = isAdmin(user);
  const links = footerLinks(admin);
  const currentYear = new Date().getFullYear();

  const renderLink = (link) => {
    if (link.pageModal) {
      return (
        <button
          type="button"
          className="footer-link"
          onClick={() => openPage(link.pageModal)}
        >
          {link.label}
        </button>
      );
    }
    return (
      <Link to={link.path} className="footer-link">
        {link.label}
      </Link>
    );
  };

  return (
    <footer className="app-footer" role="contentinfo">
      <div className="footer-accent-bar" aria-hidden />
      <div className="footer-main">
        <Container>
          <Row className="footer-grid">
            <Col xs={12} lg={4} className="footer-brand-col">
              <Link to="/" className="footer-logo-link">
                <span className="footer-logo">INXINFO</span>
                <span className="footer-logo-suffix">Labs</span>
              </Link>
              <p className="footer-tagline">
                Book Hindu puja, Pandit Ji, and puja samagri for all your rituals. Traditional ceremonies at your doorstep.
              </p>
              <div className="footer-contact-list">
                <a href={`mailto:${AppConfig.contactEmail}`} className="footer-contact-item">
                  <IconMail />
                  {AppConfig.contactEmail}
                </a>
                <a href="tel:8050618092" className="footer-contact-item">
                  <IconPhone />
                  8050618092
                </a>
                <div className="footer-contact-item footer-address">
                  <IconLocation />
                  <span>23 and 30 Suloka Nilaya, Vishuvardhan Rd, Near RNSIT College, Bangalore – 560098</span>
                </div>
              </div>
            </Col>
            <Col xs={6} sm={4} lg={2} className="footer-nav-col">
              <h6 className="footer-nav-heading">Company</h6>
              <ul className="footer-nav-list">
                {links.company.map((link) => (
                  <li key={link.label}>{renderLink(link)}</li>
                ))}
              </ul>
            </Col>
            <Col xs={6} sm={4} lg={2} className="footer-nav-col">
              <h6 className="footer-nav-heading">Resources</h6>
              <ul className="footer-nav-list">
                {links.resources.map((link) => (
                  <li key={link.label}>{renderLink(link)}</li>
                ))}
              </ul>
            </Col>
            <Col xs={6} sm={4} lg={2} className="footer-nav-col">
              <h6 className="footer-nav-heading">Legal</h6>
              <ul className="footer-nav-list">
                {links.legal.map((link) => (
                  <li key={link.label}>
                    <Link to={link.path} className="footer-link">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="footer-bar">
        <Container>
          <div className="footer-bar-inner">
            <span className="footer-copyright">© {currentYear} INXINFO Labs. All rights reserved.</span>
            <div className="footer-legal-links">
              {links.legal.map((link) => (
                <Link key={link.label} to={link.path} className="footer-legal-link">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}
