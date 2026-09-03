import { ArrowRight, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import Navbar from "../components/Navabar";
import Footer from "../components/Footer";
import FloatingAI from "../components/FloatingAI/FloatingAI";

import "./Destinations.css";

const destinations = [
  {
    name: "Kyoto",
    country: "JAPAN",
    description: "Ancient streets, quiet temples and timeless beauty.",
    image:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1200&q=90",
  },
  {
    name: "Amalfi Coast",
    country: "ITALY",
    description: "Clifftop villages, blue water and slow Mediterranean days.",
    image:
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=1200&q=90",
  },
  {
    name: "Iceland",
    country: "ICELAND",
    description: "Wild landscapes, glaciers and endless northern skies.",
    image:
      "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=1200&q=90",
  },
  {
    name: "Santorini",
    country: "GREECE",
    description: "Whitewashed villages overlooking the Aegean Sea.",
    image:
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=1200&q=90",
  },
  {
    name: "Queenstown",
    country: "NEW ZEALAND",
    description: "Mountain adventures at the edge of the world.",
    image:
      "https://images.unsplash.com/photo-1469521669194-babb45599def?w=1200&q=90",
  },
  {
    name: "Lofoten",
    country: "NORWAY",
    description: "Dramatic peaks rising directly from the sea.",
    image:
      "https://images.unsplash.com/photo-1500534623283-312aade485b7?w=1200&q=90",
  },
];

function Destinations() {
  return (
    <main className="destinations-page">
      <Navbar activePage="destinations" />

      <FloatingAI />

      {/* HERO */}
      <section className="destinations-hero">
        <div className="destinations-hero-bg" />

        <div className="destinations-hero-overlay" />

        <motion.div
          className="destinations-hero-content"
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <span className="destinations-eyebrow">DISCOVER SOMEWHERE NEW</span>

          <h1>
            Featured
            <span>Destinations.</span>
          </h1>

          <p>
            Explore places around the world and find your
            <br />
            next unforgettable experience.
          </p>
        </motion.div>
      </section>

      {/* DESTINATIONS */}
      <section className="destination-list">
        <div className="destination-heading">
          <div>
            <span>THE WORLD AWAITS</span>
            <h2>Places worth going.</h2>
          </div>

          <p>
            From quiet corners to unforgettable landscapes, discover somewhere
            that feels like yours.
          </p>
        </div>

        <div className="destination-grid">
          {destinations.map((destination, index) => (
            <motion.article
              key={destination.name}
              className="destination-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.6,
                delay: index * 0.08,
              }}
            >
              <Link
                to={`/destinations/${destination.name
                  .toLowerCase()
                  .replace(/\s+/g, "-")}`}
                className="destination-card-link"
              >
                <div className="destination-image">
                  <img src={destination.image} alt={destination.name} />

                  <div className="destination-image-overlay" />

                  <div className="destination-number">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <div className="destination-arrow">
                    <ArrowRight size={18} />
                  </div>
                </div>

                <div className="destination-card-content">
                  <span>{destination.country}</span>

                  <h3>{destination.name}</h3>

                  <p>{destination.description}</p>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}

export default Destinations;
