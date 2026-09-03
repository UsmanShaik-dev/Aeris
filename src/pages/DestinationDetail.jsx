import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";

import Navbar from "../components/Navabar";
import Footer from "../components/Footer";
import FloatingAI from "../components/FloatingAI/FloatingAI";

import "./DestinationDetail.css";

const destinationData = {
  kyoto: {
    name: "Kyoto",
    country: "JAPAN",
    tagline: "Ancient beauty. Quiet moments.",
    description:
      "Walk through timeless streets, discover hidden temples and experience a Japan where tradition and modern life exist beautifully together.",
    hero: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=2000&q=90",
    images: [
      "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=1000&q=85",
      "https://images.unsplash.com/photo-1493780474015-ba834fd0ce2f?w=1000&q=85",
      "https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?w=1000&q=85",
    ],
    highlights: ["Temples", "Cherry blossoms", "Traditional streets"],
  },

  "amalfi-coast": {
    name: "Amalfi Coast",
    country: "ITALY",
    tagline: "Blue water. Slow days.",
    description:
      "Follow the dramatic coastline through colourful villages, Mediterranean views and long afternoons beside the sea.",
    hero: "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=2000&q=90",
    images: [
      "https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=1000&q=85",
      "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=1000&q=85",
      "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=1000&q=85",
    ],
    highlights: ["Coastal villages", "Mediterranean food", "Boat trips"],
  },

  iceland: {
    name: "Iceland",
    country: "ICELAND",
    tagline: "Wild places. Endless skies.",
    description:
      "Experience glaciers, waterfalls, volcanic landscapes and some of the most dramatic scenery in the world.",
    hero: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=2000&q=90",
    images: [
      "https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=1000&q=85",
      "https://images.unsplash.com/photo-1483347756197-71ef80e95f73?w=1000&q=85",
      "https://images.unsplash.com/photo-1464278533981-50106e6176b1?w=1000&q=85",
    ],
    highlights: ["Northern lights", "Waterfalls", "Glaciers"],
  },

  santorini: {
    name: "Santorini",
    country: "GREECE",
    tagline: "White walls. Endless blue.",
    description:
      "Discover cliffside villages, volcanic beaches and unforgettable sunsets above the Aegean Sea.",
    hero: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=2000&q=90",
    images: [
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=1000&q=85",
      "https://images.unsplash.com/photo-1530841377377-3ff06c0ca713?w=1000&q=85",
      "https://images.unsplash.com/photo-1603565816030-6b389eeb23cb?w=1000&q=85",
    ],
    highlights: ["Sunsets", "Island villages", "Aegean Sea"],
  },

  queenstown: {
    name: "Queenstown",
    country: "NEW ZEALAND",
    tagline: "Adventure at the edge.",
    description:
      "Surrounded by mountains and lakes, Queenstown is a place built for adventure, exploration and unforgettable views.",
    hero: "https://images.unsplash.com/photo-1469521669194-babb45599def?w=2000&q=90",
    images: [
      "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=1000&q=85",
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1000&q=85",
      "https://images.unsplash.com/photo-1469521669194-babb45599def?w=1000&q=85",
    ],
    highlights: ["Hiking", "Lake views", "Adventure"],
  },

  lofoten: {
    name: "Lofoten",
    country: "NORWAY",
    tagline: "Mountains meet the sea.",
    description:
      "Explore dramatic peaks, fishing villages and quiet beaches scattered across one of Norway's most beautiful regions.",
    hero: "https://images.unsplash.com/photo-1500534623283-312aade485b7?w=2000&q=90",
    images: [
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1000&q=85",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1000&q=85",
      "https://images.unsplash.com/photo-1483347756197-71ef80e95f73?w=1000&q=85",
    ],
    highlights: ["Mountains", "Fishing villages", "Northern lights"],
  },
};

function DestinationDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const destination = destinationData[slug];

  if (!destination) {
    return (
      <main className="destination-not-found">
        <Navbar />

        <div>
          <h1>Destination not found.</h1>

          <button onClick={() => navigate("/destinations")}>
            Back to destinations
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="destination-detail-page">
      <Navbar activePage="destinations" />

      <FloatingAI />

      {/* HERO */}
      <section className="destination-detail-hero">
        <motion.img
          src={destination.hero}
          alt={destination.name}
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />

        <div className="destination-detail-overlay" />

        {/* BACK */}
        <button className="destination-back" onClick={() => navigate(-1)}>
          <ArrowLeft size={17} />
          <span>BACK</span>
        </button>

        <motion.div
          className="destination-detail-content"
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span>{destination.country}</span>

          <h1>{destination.name}</h1>

          <p className="destination-tagline">{destination.tagline}</p>

          <p className="destination-description">{destination.description}</p>

          <button className="plan-trip-button">
            Plan this journey
            <ArrowRight size={17} />
          </button>
        </motion.div>
      </section>

      {/* INTRO */}
      <section className="destination-intro">
        <div>
          <span>DISCOVER</span>

          <h2>
            A place worth
            <br />
            <strong>remembering.</strong>
          </h2>
        </div>

        <p>{destination.description}</p>
      </section>

      {/* HIGHLIGHTS */}
      <section className="destination-highlights">
        <span>WHY GO</span>

        <div className="highlight-grid">
          {destination.highlights.map((highlight, index) => (
            <motion.div
              key={highlight}
              className="highlight-item"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <small>{String(index + 1).padStart(2, "0")}</small>

              <h3>{highlight}</h3>
            </motion.div>
          ))}
        </div>
      </section>

      {/* GALLERY */}
      <section className="destination-gallery">
        {destination.images.map((image, index) => (
          <motion.div
            key={image}
            className={`gallery-image gallery-image-${index + 1}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <img src={image} alt={`${destination.name} ${index + 1}`} />
          </motion.div>
        ))}
      </section>

      {/* FINAL CTA */}
      <section className="destination-final-cta">
        <span>YOUR NEXT JOURNEY</span>

        <h2>
          Ready to discover
          <strong>{destination.name}?</strong>
        </h2>

        <button
          onClick={() => navigate("/journey")}
          className="plan-trip-button"
        >
          Start planning
          <ArrowRight size={17} />
        </button>
      </section>

      <Footer />
    </main>
  );
}

export default DestinationDetail;
