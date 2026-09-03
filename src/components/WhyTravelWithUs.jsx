import { ArrowUpRight, Compass, Heart, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

import AIImage from "../assets/AI.png";
import CompassImage from "../assets/compass.png";
import MadeForYouImage from "../assets/madeforyou.png";

import "./WhyTravelWithUs.css";

const features = [
  {
    number: "01",
    icon: Sparkles,
    image: AIImage,
    title: "Intelligent Planning",
    description:
      "Tell us what you love, where you want to go, and how much time you have. Our AI helps shape the journey around you.",
    accent: "purple",
  },
  {
    number: "02",
    icon: Compass,
    image: CompassImage,
    title: "Curated Experiences",
    description:
      "Skip the generic tourist checklist. Discover places, experiences and hidden gems worth remembering.",
    accent: "gold",
  },
  {
    number: "03",
    icon: Heart,
    image: MadeForYouImage,
    title: "Made For You",
    description:
      "Every journey should feel personal. Build trips around your pace, interests, budget and way of exploring.",
    accent: "rose",
  },
];

function WhyTravelWithUs() {
  return (
    <section className="why-section" id="why-us">
      {/* Background decoration */}
      <div className="why-orb why-orb-purple" />
      <div className="why-orb why-orb-gold" />

      {/* Heading */}
      <div className="why-heading why-heading-centered">
        <div>
          <span className="section-eyebrow">WHY CHOOSE US?</span>

          <h2>
            Travel
            <span>differently.</span>
          </h2>
        </div>

        <p>
          Less planning. More discovering.
          <br />
          We help turn your next trip into something
          <br className="desktop-break" />
          you'll actually remember.
        </p>
      </div>

      {/* Feature cards */}
      <div className="why-grid">
        {features.map((feature, index) => {
          const Icon = feature.icon;

          return (
            <motion.article
              className={`why-card why-card-${feature.accent}`}
              key={feature.number}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.7,
                delay: index * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {/* TOP - number + small icon */}
              <div className="why-card-top">
                <span className="why-number">{feature.number}</span>

                {/* KEEPING THE ORIGINAL SMALL ICON */}
                <div className="why-icon">
                  <Icon size={20} />
                </div>
              </div>

              {/* CENTER IMAGE */}
              <div className="why-card-image">
                <div className="why-image-halo" />

                <img src={feature.image} alt="" draggable="false" />
              </div>

              {/* CONTENT */}
              <div className="why-card-content">
                <h3>{feature.title}</h3>

                <p>{feature.description}</p>
              </div>

              {/* ARROW */}
              <div className="why-card-arrow">
                <ArrowUpRight size={18} />
              </div>

              {/* CARD GLOW */}
              <div className="why-card-glow" />
            </motion.article>
          );
        })}
      </div>

      {/* Bottom statement */}
      <motion.div
        className="why-bottom"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <span>YOUR JOURNEY STARTS HERE</span>

        <div className="why-line" />

        <span>EXPLORE WITHOUT LIMITS</span>
      </motion.div>
    </section>
  );
}

export default WhyTravelWithUs;
