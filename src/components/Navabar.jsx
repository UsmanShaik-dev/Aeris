import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe2,
  Menu,
  X,
  MapPin,
  ChevronDown,
  UserRound,
  Heart,
  Compass,
  Settings,
  LogIn,
  UserPlus,
  LocateFixed,
  Loader2,
} from "lucide-react";
import { Link } from "react-router-dom";

import logo from "../assets/logo.png";

import "./Navabar.css";

function Navbar({ activePage }) {
  const [showLocation, setShowLocation] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const [location, setLocation] = useState("India");
  const [detectingLocation, setDetectingLocation] = useState(false);
  const [locationError, setLocationError] = useState("");

  const handleLocation = (value) => {
    setLocation(value);
    setLocationError("");
    setShowLocation(false);
  };

  const detectLocation = () => {
    if (!navigator.geolocation) {
      setLocationError("Location detection isn't supported.");
      return;
    }

    setDetectingLocation(true);
    setLocationError("");

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
          );

          if (!response.ok) {
            throw new Error("Unable to detect location.");
          }

          const data = await response.json();

          const address = data.address || {};

          const detectedPlace =
            address.city ||
            address.town ||
            address.village ||
            address.municipality ||
            address.state ||
            "Your location";

          const detectedCountry = address.country || "";

          setLocation(
            detectedCountry
              ? `${detectedPlace}, ${detectedCountry}`
              : detectedPlace,
          );

          setShowLocation(true);
        } catch (error) {
          setLocationError("Couldn't determine your location.");
        } finally {
          setDetectingLocation(false);
        }
      },
      (error) => {
        setDetectingLocation(false);

        if (error.code === error.PERMISSION_DENIED) {
          setLocationError("Location permission was denied.");
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          setLocationError("Location information is unavailable.");
        } else {
          setLocationError("Unable to detect your location.");
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000,
      },
    );
  };

  const closeMenu = () => {
    setShowMenu(false);
  };

  return (
    <>
      {/* =====================================================
          NAVBAR
      ====================================================== */}

      <motion.nav
        className="navbar"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
        }}
      >
        {/* BRAND */}

        <Link to="/" className="brand" onClick={closeMenu}>
          <img src={logo} alt="Aeris logo" className="brand-logo" />

          <span>AERIS</span>
        </Link>

        {/* MAIN NAVIGATION */}

        <div className="nav-links">
          <Link
            to="/explore"
            className={activePage === "explore" ? "active" : ""}
          >
            Explore
          </Link>

          <Link
            to="/destinations"
            className={activePage === "destinations" ? "active" : ""}
          >
            Destinations
          </Link>

          <Link
            to="/journey"
            className={activePage === "journey" ? "active" : ""}
          >
            My Journey
          </Link>
        </div>

        {/* =================================================
            ACTIONS
        ================================================== */}

        <div className="nav-actions">
          {/* LOCATION */}

          <div className="nav-action-wrapper">
            <button
              className={`icon-button ${
                showLocation ? "icon-button-active" : ""
              }`}
              aria-label="Change location"
              onClick={() => {
                setShowLocation(!showLocation);
                setShowMenu(false);
                setLocationError("");
              }}
            >
              <Globe2 size={18} strokeWidth={1.7} />
            </button>

            <AnimatePresence>
              {showLocation && (
                <motion.div
                  className="location-dropdown"
                  initial={{
                    opacity: 0,
                    y: -8,
                    scale: 0.96,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    y: -8,
                    scale: 0.96,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="dropdown-label">YOUR LOCATION</span>

                  {/* DETECT LOCATION */}

                  <button
                    className="detect-location-button"
                    onClick={detectLocation}
                    disabled={detectingLocation}
                  >
                    <div className="detect-location-icon">
                      {detectingLocation ? (
                        <Loader2 size={16} className="location-loader" />
                      ) : (
                        <LocateFixed size={16} strokeWidth={1.7} />
                      )}
                    </div>

                    <div className="detect-location-text">
                      <strong>
                        {detectingLocation
                          ? "Detecting location..."
                          : "Detect my location"}
                      </strong>

                      <small>Use your current position</small>
                    </div>

                    {!detectingLocation && (
                      <ChevronDown size={14} className="detect-arrow" />
                    )}
                  </button>

                  {/* ERROR */}

                  {locationError && (
                    <p className="location-error">{locationError}</p>
                  )}

                  {/* CURRENT LOCATION */}

                  <div className="current-location">
                    <div className="location-icon">
                      <MapPin size={15} />
                    </div>

                    <div>
                      <strong>{location}</strong>

                      <small>Travel recommendations</small>
                    </div>

                    <ChevronDown size={14} />
                  </div>

                  {/* LOCATION OPTIONS */}

                  <div className="location-options">
                    {["India", "Japan", "Italy", "Iceland"].map((place) => (
                      <button
                        key={place}
                        className={
                          location === place
                            ? "location-option selected"
                            : "location-option"
                        }
                        onClick={() => handleLocation(place)}
                      >
                        <span>{place}</span>

                        {location === place && (
                          <span className="location-check">✓</span>
                        )}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* MENU */}

          <div className="nav-action-wrapper">
            <button
              className={`icon-button ${showMenu ? "icon-button-active" : ""}`}
              aria-label="Open menu"
              onClick={() => {
                setShowMenu(!showMenu);
                setShowLocation(false);
              }}
            >
              {showMenu ? (
                <X size={19} strokeWidth={1.7} />
              ) : (
                <Menu size={19} strokeWidth={1.7} />
              )}
            </button>

            {/* MENU DROPDOWN */}

            <AnimatePresence>
              {showMenu && (
                <motion.div
                  className="menu-dropdown"
                  initial={{
                    opacity: 0,
                    y: -10,
                    scale: 0.96,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    y: -8,
                    scale: 0.96,
                  }}
                  transition={{
                    duration: 0.22,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {/* HEADER */}

                  <div className="menu-dropdown-header">
                    <div>
                      <span>WELCOME TO</span>
                      <strong>AERIS</strong>
                    </div>

                    <div className="menu-user-icon">
                      <UserRound size={17} strokeWidth={1.6} />
                    </div>
                  </div>

                  {/* ACCOUNT */}

                  <div className="menu-section-label">ACCOUNT</div>

                  <div className="menu-account-actions">
                    <button className="menu-account-button">
                      <LogIn size={16} strokeWidth={1.7} />
                      <span>Sign in</span>
                    </button>

                    <button className="menu-account-button primary">
                      <UserPlus size={16} strokeWidth={1.7} />
                      <span>Create account</span>
                    </button>
                  </div>

                  {/* NAVIGATION */}

                  <div className="menu-section-label">EXPLORE</div>

                  <div className="menu-links">
                    <Link to="/journey" onClick={closeMenu}>
                      <div className="menu-link-icon">
                        <Compass size={16} />
                      </div>

                      <div>
                        <strong>My Journey</strong>
                        <small>Plan your next adventure</small>
                      </div>
                    </Link>

                    <button>
                      <div className="menu-link-icon">
                        <Heart size={16} />
                      </div>

                      <div>
                        <strong>Saved places</strong>
                        <small>Your favourite destinations</small>
                      </div>
                    </button>

                    <button>
                      <div className="menu-link-icon">
                        <Settings size={16} />
                      </div>

                      <div>
                        <strong>Settings</strong>
                        <small>Personalise your experience</small>
                      </div>
                    </button>
                  </div>

                  {/* FOOTER */}

                  <div className="menu-dropdown-footer">
                    <span>Discover somewhere worth remembering.</span>

                    <span>© 2026 AERIS</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.nav>
    </>
  );
}

export default Navbar;
