import styles from "./about.css";
import FooterNav from "@/components/ui/FooterNav";

export default function About() {
  return (
    <div className="">
      <section className="hero">
        <h1 className="title">About Us</h1>
        <p className="subtitle">
          We are a passionate team committed to delivering high-quality solutions
          to our clients around the globe.
        </p>
      </section>

      <section className="content">
        <div className="card">
          <h2>Who We Are</h2>
          <p>
            Founded in 2020, our company brings together creative designers,
            experienced developers, and strategic thinkers to solve real-world problems
            through innovative digital products and services.
          </p>
        </div>

        <div className="card">
          <h2>Our Mission</h2>
          <p>
            Our mission is to empower businesses by creating user-friendly,
            accessible, and impactful digital experiences that drive growth
            and build long-lasting relationships.
          </p>
        </div>

        <div className="card">
          <h2>What We Value</h2>
          <ul className="valuesList">
            <li>✔️ Transparency</li>
            <li>✔️ Innovation</li>
            <li>✔️ Collaboration</li>
            <li>✔️ Excellence</li>
            <li>✔️ Customer Success</li>
          </ul>
        </div>
      </section>

      <section className="team">
        <h2>Meet the Team</h2>
        <p>
          Our diverse and talented team is what makes us unique. We're dedicated to building
          a positive culture that encourages growth, creativity, and open communication.
        </p>
      </section>

      <FooterNav />
    </div>
  );
}
