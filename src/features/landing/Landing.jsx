import { useState } from "react";
import Hero from "./Hero";
import Features from "./Features";
import CTA from "./CTA";
import Modal from "../../components/Modal";

export default function Landing() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Hero onOpenModal={() => setModalOpen(true)} />
      <Features />
      <CTA onOpenModal={() => setModalOpen(true)} />

      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <h3 className="fw-bold mb-3">Talk to Sales</h3>
        <p>We’d love to discuss your enterprise needs.</p>
      </Modal>
    </>
  );
}
