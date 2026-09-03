import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navabar";
import Footer from "../components/Footer";
import FloatingAI from "../components/FloatingAI/FloatingAI";

import "./Explore.css";

const exploreData = {
  Popular: {
    image:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=2000&q=90",

    eyebrow: "EXPLORE THE WORLD",

    title: "Where will you go",
    highlight: "next?",

    description:
      "Discover places worth getting lost in. Real stories, real places, real adventures.",

    cards: [
      {
        country: "JAPAN",
        name: "Kyoto",
        description: "Ancient streets and timeless beauty.",
        image:
          "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=900&q=85",
      },
      {
        country: "ICELAND",
        name: "Iceland",
        description: "Wild landscapes beneath northern lights.",
        image:
          "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=900&q=85",
      },
      {
        country: "ITALY",
        name: "Amalfi Coast",
        description: "Cliffs, blue water and slow days.",
        image:
          "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=900&q=85",
      },
    ],
  },

  Trending: {
    image:
      "https://images.unsplash.com/photo-1500534623283-312aade485b7?w=2000&q=90",

    eyebrow: "TRENDING NOW",

    title: "Go where the",
    highlight: "world is looking.",

    description:
      "The destinations everyone's dreaming about right now — before they become yesterday's story.",

    cards: [
      {
        country: "PORTUGAL",
        name: "Lisbon",
        description: "Colourful streets and ocean air.",
        image:
          "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=900&q=85",
      },
      {
        country: "GREECE",
        name: "Santorini",
        description: "Whitewashed villages above the Aegean.",
        image:
          "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=900&q=85",
      },
      {
        country: "INDONESIA",
        name: "Bali",
        description: "Tropical mornings and hidden temples.",
        image:
          "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=900&q=85",
      },
    ],
  },

  Nearby: {
    image:
      "https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=2000&q=90",

    eyebrow: "CLOSER THAN YOU THINK",

    title: "Find your next",
    highlight: "escape nearby.",

    description:
      "You don't always need a passport. Discover beautiful places waiting just a little closer to home.",

    cards: [
      {
        country: "INDIA",
        name: "Coorg",
        description: "Misty hills and quiet coffee estates.",
        image:
          "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=900&q=85",
      },
      {
        country: "INDIA",
        name: "Goa",
        description: "Golden beaches and slower days.",
        image:
          "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=900&q=85",
      },
      {
        country: "INDIA",
        name: "Munnar",
        description: "Green valleys wrapped in mist.",
        image:
          "https://images.unsplash.com/photo-1500534623283-312aade485b7?w=900&q=85",
      },
    ],
  },

  Recommended: {
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=2000&q=90",

    eyebrow: "CURATED FOR YOU",

    title: "Somewhere",
    highlight: "worth remembering.",

    description:
      "Handpicked destinations for curious travellers looking for something beyond the ordinary.",

    cards: [
      {
        country: "JAPAN",
        name: "Hakone",
        description: "Mountain air and views of Fuji.",
        image:
          "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=900&q=85",
      },
      {
        country: "NORWAY",
        name: "Lofoten",
        description: "Dramatic mountains meeting the sea.",
        image:
          "https://images.unsplash.com/photo-1500534623283-312aade485b7?w=900&q=85",
      },
      {
        country: "NEW ZEALAND",
        name: "Queenstown",
        description: "Adventure at the edge of the world.",
        image:
          "https://images.unsplash.com/photo-1469521669194-babb45599def?w=900&q=85",
      },
    ],
  },
};

const categories = ["Recommended", "Popular", "Trending", "Nearby"];

function Explore() {
  const [activeCategory, setActiveCategory] = useState("Recommended");

  const current = exploreData[activeCategory];

  return (
    <main className="explore-page">
      <Navbar activePage="explore" />
      <FloatingAI />
      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="explore-hero">
        {/* Background Image */}

        <div className="explore-background">
          <AnimatePresence mode="wait">
            <motion.img
              key={current.image}
              src={current.image}
              alt=""
              initial={{
                opacity: 0,
                scale: 1.06,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                scale: 1.02,
              }}
              transition={{
                duration: 0.8,
                ease: "easeInOut",
              }}
            />
          </AnimatePresence>
        </div>

        <div className="explore-overlay" />

        {/* Hero Content */}

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            className="explore-content"
            initial={{
              opacity: 0,
              y: 25,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -15,
            }}
            transition={{
              duration: 0.5,
            }}
          >
            <span className="explore-eyebrow">{current.eyebrow}</span>

            <h1 className="explore-title">
              {current.title}
              <span>{current.highlight}</span>
            </h1>

            <p className="explore-description">{current.description}</p>

            <div className="explore-search">
              <Search size={20} strokeWidth={1.7} />

              <input type="text" placeholder="Search destinations..." />

              <button>
                <ArrowRight size={18} />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* =====================================================
          DISCOVER NAV
      ====================================================== */}

      <section className="discover-section">
        <div className="discover-heading">
          <span>DISCOVER</span>

          <div className="discover-tabs">
            {categories.map((category) => (
              <button
                key={category}
                className={
                  activeCategory === category
                    ? "discover-tab active"
                    : "discover-tab"
                }
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* =====================================================
            DESTINATION CARDS
        ====================================================== */}

        <div className="explore-cards">
          <AnimatePresence mode="popLayout">
            {current.cards.map((card, index) => (
              <Link
                to={`/destinations/${card.name
                  .toLowerCase()
                  .replace(/\s+/g, "-")}`}
                className="explore-card-link"
              >
                <motion.article
                  key={`${activeCategory}-${card.name}`}
                  className="explore-card"
                  initial={{
                    opacity: 0,
                    y: 25,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: -20,
                  }}
                  transition={{
                    duration: 0.45,
                    delay: index * 0.08,
                  }}
                >
                  <div className="explore-card-image">
                    <img src={card.image} alt={card.name} />

                    <div className="explore-card-overlay" />
                  </div>

                  <div className="explore-card-content">
                    <span>{card.country}</span>

                    <h2>{card.name}</h2>

                    <p>{card.description}</p>

                    <div className="explore-card-arrow">
                      <ArrowRight size={16} />
                    </div>
                  </div>
                </motion.article>
              </Link>
            ))}
          </AnimatePresence>
        </div>
      </section>
      <Footer />
    </main>
  );
}

export default Explore;
