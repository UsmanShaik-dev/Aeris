import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CalendarDays,
  MapPin,
  Sparkles,
  WandSparkles,
} from "lucide-react";

import Navbar from "../components/Navabar";
import Footer from "../components/Footer";
import FloatingAI from "../components/FloatingAI/FloatingAI";

import robot from "../assets/AI.png";

import "./Journey.css";

function Journey() {
  const [destination, setDestination] = useState("");
  const [days, setDays] = useState("");

  return (
    <main className="journey-page">
      <Navbar activePage="journey" />

      <FloatingAI />

    

      <section className="journey-hero">
        <div className="journey-hero-glow" />

        {/* AI ROBOT */}
        <motion.div
          className="journey-robot"
          initial={{ opacity: 0, x: 40, y: -20 }}
          animate={{
            opacity: 1,
            x: 0,
            y: [0, -8, 0],
          }}
          transition={{
            opacity: {
              duration: 0.7,
            },
            x: {
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            },
            y: {
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        >
          <img src={robot} alt="AI travel assistant" />
        </motion.div>

        <motion.div
          className="journey-hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div className="journey-icon">
            <Sparkles size={21} strokeWidth={1.5} />
          </div>

          <span className="journey-eyebrow">YOUR JOURNEY</span>

          <h1 className="journey-title">
            Plan your journey
            <span>with AI.</span>
          </h1>

          <p className="journey-description">
            Tell us where you're going, how long you have, and what you love.
            We'll build a journey that feels made for you.
          </p>
        </motion.div>
      </section>



      <section className="journey-planner">
        <motion.div
          className="journey-card"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="journey-card-label">01 — DESTINATION</span>

          <h2>Where are you going?</h2>

          <p>Start with a place you've always wanted to discover.</p>

          <div className="journey-input-wrapper">
            <MapPin size={17} strokeWidth={1.6} />

            <input
              className="journey-input"
              type="text"
              placeholder="e.g. Kyoto, Japan"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
          </div>
        </motion.div>

        <motion.div
          className="journey-card"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.7,
            delay: 0.1,
          }}
        >
          <span className="journey-card-label">02 — TIME</span>

          <h2>How long do you have?</h2>

          <p>We'll shape the pace of your journey around your time.</p>

          <div className="journey-input-wrapper">
            <CalendarDays size={17} strokeWidth={1.6} />

            <input
              className="journey-input"
              type="number"
              min="1"
              placeholder="Number of days"
              value={days}
              onChange={(e) => setDays(e.target.value)}
            />
          </div>
        </motion.div>

        {/* AI CARD */}

        <motion.div
          className="journey-ai-card"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            delay: 0.15,
          }}
        >
          <div className="journey-ai-glow" />

          <div className="journey-ai-icon">
            <WandSparkles size={21} strokeWidth={1.5} />
          </div>

          <span className="journey-card-label">03 — YOUR PERSONAL PLANNER</span>

          <h2>Your journey, imagined.</h2>

          <p>
            Our AI will turn your destination, time and interests into a
            thoughtful itinerary filled with places worth remembering.
          </p>

          <button className="journey-button">
            Start planning
            <ArrowRight size={16} />
          </button>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}

export default Journey;
