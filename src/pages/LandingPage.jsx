import Home from "./Home";
import About from "./About";
import Contact from "./Contact";

export default function LandingPage() {
  return (
    <>
      <section id="home">
        <Home />
      </section>

      <section id="about">
        <About />
      </section>

      <section id="contact">
        <Contact />
      </section>
    </>
  );
}
