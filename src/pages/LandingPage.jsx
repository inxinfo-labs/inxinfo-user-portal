import { useState } from "react";
import Hero from "../features/landing/Hero";
import Features from "../features/landing/Features";
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
        <h3 className="fw-bold mb-3">Get Started with INXINFO Labs</h3>
        <p className="mb-4">
          We'd love to discuss your enterprise needs and how we can help transform 
          your business with our innovative solutions.
        </p>
        <div className="d-flex gap-2">
          <a 
            href="mailto:satish.prasad@inxinfo.com"
            className="btn btn-primary"
          >
            Contact Us
          </a>
          <button 
            className="btn btn-outline-secondary"
            onClick={() => setModalOpen(false)}
          >
            Close
          </button>
        </div>
      </Modal>
    </>
  );
}
