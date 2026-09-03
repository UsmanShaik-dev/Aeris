import { ArrowUpRight } from "lucide-react";
import logo from "../assets/logo.png";

import "./Footer.css";

import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      {/* CTA */}
      <div className="footer-cta">
        <div>
          <span className="footer-cta-eyebrow">YOUR NEXT JOURNEY</span>

          <h2>
            Somewhere
            <span>worth going.</span>
          </h2>
        </div>

        <a href="#journey" className="footer-cta-button">
          Start exploring
          <ArrowUpRight size={18} />
        </a>
      </div>

      {/* Ambient glow */}
      <div className="footer-glow footer-glow-purple" />
      <div className="footer-glow footer-glow-gold" />

      <div className="footer-inner">
        {/* TOP */}
        <div className="footer-top">
          {/* BRAND */}
          <div className="footer-brand">
            <div className="footer-brand-logo">
              <img src={logo} alt="Aeris logo" />
              <span>AERIS</span>
            </div>

            <p>
              Travel differently.
              <br />
              Discover more of what matters.
            </p>
          </div>

          {/* EXPLORE */}
          <div className="footer-column">
            <span className="footer-label">EXPLORE</span>

            <a href="#destinations">Destinations</a>

            <a href="#journey">AI Planner</a>

            <a href="#why-us">Why Aeris</a>

            <a href="#">Experiences</a>
          </div>

          {/* AERIS */}
          <div className="footer-column">
            <span className="footer-label">AERIS</span>

            <a href="#">About us</a>

            <a href="#">Our story</a>

            <a href="#">Contact</a>

            <a href="#">Privacy</a>
          </div>

          {/* FOLLOW */}
          <div className="footer-column footer-social">
            <span className="footer-label">FOLLOW ALONG</span>

            <a href="#">
              Instagram
              <ArrowUpRight size={14} />
            </a>

            <a href="#">
              Twitter
              <ArrowUpRight size={14} />
            </a>

            <a href="#">
              LinkedIn
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="footer-bottom">
          <span>© 2026 AERIS. ALL RIGHTS RESERVED.</span>

          <span>MADE FOR THE CURIOUS.</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
