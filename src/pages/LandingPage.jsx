import { useState } from "react";
import Hero from "../features/landing/Hero";
import Features from "../features/landing/Features";
import LandingServices from "../features/landing/LandingServices";
import PujaOffers from "../features/landing/PujaOffers";
import PromoBanner from "../features/landing/PromoBanner";
import FeaturedPujas from "../features/landing/FeaturedPujas";
import MapSection from "../features/landing/MapSection";
import CTA from "../features/landing/CTA";
import About from "./About";
import Contact from "./Contact";
import Modal from "../components/Modal";

export default function LandingPage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <section id="home">
        <Hero onOpenModal={() => setModalOpen(true)} />
      </section>

      {/* Our Services at top so visible without scrolling */}
      <LandingServices />

      {/* Advertisement: Shradh Puja & All Puja */}
      <PromoBanner />

      {/* Satyanarayan & Griha Pravesh with images */}
      <FeaturedPujas />

      {/* Puja offers / promotions */}
      <PujaOffers />

      <Features />

      <MapSection />

      <section id="about">
        <About />
      </section>

      <CTA onOpenModal={() => setModalOpen(true)} />

      <section id="contact">
        <Contact />
      </section>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <h3 className="fw-bold mb-3" style={{ color: "var(--primary-700)" }}>Book Puja &amp; Pandit Ji</h3>
        <p className="mb-4 text-muted">
          Get in touch to book traditional Hindu puja, Pandit Ji for your occasion, or order puja samagri.
          We are here for all your ritual needs.
        </p>
        <div className="d-flex gap-2 flex-wrap">
          <a
            href="mailto:satish.prasad@inxinfo.com"
            className="btn btn-primary"
            style={{ background: "var(--gradient-primary)", border: "none", borderRadius: "0.75rem" }}
          >
            Contact Us
          </a>
          <button
            type="button"
            className="btn btn-outline-secondary"
            style={{ borderRadius: "0.75rem" }}
            onClick={() => setModalOpen(false)}
          >
            Close
          </button>
        </div>
      </Modal>
    </>
  );
}
