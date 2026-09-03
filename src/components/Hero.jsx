import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, ArrowRight, MapPin, Search } from "lucide-react";

import "./Hero.css";

function Hero() {
  const videoRef = useRef(null);

  /* =====================================================
     VIDEO STATE
  ====================================================== */

  const [activeIndex, setActiveIndex] = useState(0);

  const videos = ["/hero2.mp4", "/hero.mp4", "/hero1.mp4"];

  /* =====================================================
     WEATHER STATE
  ====================================================== */

  const [weather, setWeather] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(true);

  const [city, setCity] = useState("Bengaluru");

  /* =====================================================
     LOCATION SEARCH STATE
  ====================================================== */

  const [locationInput, setLocationInput] = useState("");
  const [isChangingLocation, setIsChangingLocation] = useState(false);

  /* =====================================================
   CURRENCY
===================================================== */

  const currencyMap = {
    IN: "INR ₹",
    US: "USD $",
    GB: "GBP £",
    JP: "JPY ¥",
    CN: "CNY ¥",
    KR: "KRW ₩",
    AE: "AED د.إ",
    SG: "SGD $",
    AU: "AUD $",
    CA: "CAD $",
    NZ: "NZD $",
    CH: "CHF",
    DE: "EUR €",
    FR: "EUR €",
    IT: "EUR €",
    ES: "EUR €",
    PT: "EUR €",
    NL: "EUR €",
    BE: "EUR €",
    AT: "EUR €",
    IE: "EUR €",
    FI: "EUR €",
    GR: "EUR €",
    TH: "THB ฿",
    MY: "MYR RM",
    ID: "IDR Rp",
    VN: "VND ₫",
    PH: "PHP ₱",
    BR: "BRL R$",
    MX: "MXN $",
    ZA: "ZAR R",
    TR: "TRY ₺",
    RU: "RUB ₽",
    SA: "SAR ﷼",
    QA: "QAR ﷼",
    KW: "KWD د.ك",
    IL: "ILS ₪",
  };

  /* =====================================================
     FETCH WEATHER
  ====================================================== */

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setWeatherLoading(true);

        const response = await fetch(
          `http://localhost:5000/api/weather?city=${encodeURIComponent(city)}`,
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch weather");
        }

        setWeather(data);
      } catch (error) {
        console.error("Weather fetch error:", error);

        setWeather(null);
      } finally {
        setWeatherLoading(false);
      }
    };

    fetchWeather();
  }, [city]);

  /* =====================================================
     LOCATION CHANGE
  ====================================================== */

  const handleLocationChange = () => {
    const trimmedLocation = locationInput.trim();

    if (!trimmedLocation) return;

    setCity(trimmedLocation);

    setLocationInput("");

    setIsChangingLocation(false);
  };

  /* =====================================================
     LOCATION ENTER KEY
  ====================================================== */

  const handleLocationKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();

      handleLocationChange();
    }

    if (event.key === "Escape") {
      setIsChangingLocation(false);

      setLocationInput("");
    }
  };

  /* =====================================================
     VIDEO ENDED
  ====================================================== */

  const handleVideoEnded = () => {
    setActiveIndex((current) => (current + 1) % videos.length);
  };

  /* =====================================================
     LOAD NEW VIDEO
  ====================================================== */

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    video.load();

    const playVideo = async () => {
      try {
        await video.play();
      } catch (error) {
        console.log("Autoplay prevented:", error);
      }
    };

    playVideo();
  }, [activeIndex]);

  /* =====================================================
     CHANGE VIDEO
  ====================================================== */

  const handleImageClick = (index) => {
    setActiveIndex(index);
  };

  /* =====================================================
     WEATHER ICON
  ====================================================== */

  const getWeatherIcon = () => {
    if (!weather) return "🌤️";

    switch (weather.weatherMain) {
      case "Clear":
        return "☀️";

      case "Clouds":
        return "☁️";

      case "Rain":
        return "🌧️";

      case "Thunderstorm":
        return "⛈️";

      case "Snow":
        return "❄️";

      case "Drizzle":
        return "🌦️";

      case "Mist":
      case "Fog":
      case "Haze":
        return "🌫️";

      default:
        return "🌤️";
    }
  };

  /* =====================================================
   LOCAL TIME
===================================================== */

  const getLocalTime = () => {
    if (!weather?.timezone) {
      return "--:--";
    }

    // OpenWeather timezone is in seconds.
    const timezoneOffset = weather.timezone;

    // Convert current UTC time using the city's timezone offset.
    const utcTime = new Date(
      Date.now() + new Date().getTimezoneOffset() * 60000,
    );

    const cityTime = new Date(utcTime.getTime() + timezoneOffset * 1000);

    return cityTime.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };
  /* =====================================================
   CURRENCY
===================================================== */

  const getCurrency = () => {
    if (!weather?.countryCode) {
      return "--";
    }

    return currencyMap[weather.countryCode] || "Local currency";
  };

  /* =====================================================
     RENDER
  ====================================================== */

  return (
    <section className="hero" id="explore">
      {/* =====================================================
          BACKGROUND VIDEO
      ====================================================== */}

      <div className="hero-video-wrapper">
        <video
          ref={videoRef}
          key={`video-${activeIndex}`}
          className="hero-video hero-video-active"
          autoPlay
          muted
          playsInline
          onEnded={handleVideoEnded}
        >
          <source src={videos[activeIndex]} type="video/mp4" />
        </video>
      </div>

      <div className="hero-overlay" />

      <div className="hero-vignette" />

      {/* =====================================================
          HERO CONTENT
      ====================================================== */}

      <section className="hero-content">
        <motion.div
          className="hero-copy"
          initial={{
            opacity: 0,
            y: 35,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1,
            delay: 0.25,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <p className="eyebrow">EXPLORE THE WORLD</p>

          <h1>
            FIND YOUR NEXT
            <span>HORIZON</span>
          </h1>

          <p className="hero-description">
            Discover places worth getting lost in.
            <br />
            Real stories. Real places. Real adventures.
          </p>

          {/* SEARCH */}

          <div className="search-wrapper">
            <div className="search-icon">
              <Search size={21} strokeWidth={1.8} />
            </div>

            <input
              type="text"
              placeholder="Where do you want to go?"
              aria-label="Search destination"
            />

            <button className="search-button" aria-label="Search">
              <ArrowRight size={20} />
            </button>
          </div>
        </motion.div>

        {/* =====================================================
            WATCH JOURNEY
        ====================================================== */}

        <motion.button
          className="journey-trigger"
          initial={{
            opacity: 0,
            x: -20,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.8,
            delay: 0.9,
          }}
        >
          <span className="play-button">▶</span>

          <span className="journey-text">
            <strong>WATCH THE JOURNEY</strong>

            <small>Inspiring destinations</small>
          </span>
        </motion.button>
      </section>

      {/* =====================================================
          DESTINATION RAIL
      ====================================================== */}

      <motion.div
        className="destination-rail"
        initial={{
          opacity: 0,
          x: 25,
        }}
        animate={{
          opacity: 1,
          x: 0,
        }}
        transition={{
          duration: 1,
          delay: 0.8,
        }}
      >
        <div
          className={`rail-image ${activeIndex === 0 ? "active" : ""}`}
          onClick={() => handleImageClick(0)}
        >
          <img
            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=300&q=80"
            alt="Mountain landscape"
          />
        </div>

        <div
          className={`rail-image ${activeIndex === 1 ? "active" : ""}`}
          onClick={() => handleImageClick(1)}
        >
          <img
            src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=300&q=80"
            alt="Traditional Japanese temple"
          />
        </div>

        <div
          className={`rail-image ${activeIndex === 2 ? "active" : ""}`}
          onClick={() => handleImageClick(2)}
        >
          <img
            src="https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=300&q=80"
            alt="Coastal destination"
          />
        </div>

        <div className="rail-dots">
          <span className={activeIndex === 0 ? "active" : ""} />

          <span className={activeIndex === 1 ? "active" : ""} />

          <span className={activeIndex === 2 ? "active" : ""} />
        </div>
      </motion.div>

      {/* =====================================================
          SCROLL INDICATOR
      ====================================================== */}

      <motion.div
        className="scroll-indicator"
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          delay: 1.5,
          duration: 1,
        }}
      >
        <div className="scroll-icon">
          <ArrowDown size={20} strokeWidth={1.5} />
        </div>

        <span>SCROLL TO EXPLORE</span>
      </motion.div>

      {/* =====================================================
          LOCATION CARD
      ====================================================== */}

      <motion.div
        className="location-card"
        initial={{
          opacity: 0,
          y: 25,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 1.1,
          duration: 0.8,
        }}
      >
        {/* =====================================================
            LOCATION
        ====================================================== */}

        <div className="location-info">
          <div className="location-icon">
            <MapPin size={18} />
          </div>

          <div>
            <span>CURRENTLY IN</span>

            <strong>
              {weather?.city || city}
              {weather?.country ? `, ${weather.country}` : ""}
            </strong>

            {!isChangingLocation ? (
              <button type="button" onClick={() => setIsChangingLocation(true)}>
                Change location
              </button>
            ) : (
              <div className="location-change">
                <input
                  type="text"
                  value={locationInput}
                  onChange={(event) => setLocationInput(event.target.value)}
                  onKeyDown={handleLocationKeyDown}
                  placeholder="Enter city..."
                  autoFocus
                />

                <button
                  type="button"
                  onClick={handleLocationChange}
                  disabled={!locationInput.trim()}
                >
                  Search
                </button>

                <button
                  type="button"
                  className="location-cancel"
                  onClick={() => {
                    setIsChangingLocation(false);

                    setLocationInput("");
                  }}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>

        {/* =====================================================
            WEATHER
        ====================================================== */}

        <div className="weather-preview">
          {weatherLoading ? (
            <>
              <div className="weather-symbol">⏳</div>

              <strong>--°</strong>

              <div className="weather-details">
                <span>Loading weather...</span>

                <small>Please wait</small>
              </div>
            </>
          ) : weather ? (
            <>
              <div className="weather-symbol">{getWeatherIcon()}</div>

              <strong>{weather.temperature}°</strong>

              <div className="weather-details">
                <span>{weather.condition}</span>

                <small>
                  H: {weather.high}° &nbsp;&nbsp; L: {weather.low}°
                </small>
              </div>
            </>
          ) : (
            <>
              <div className="weather-symbol">🌤️</div>

              <strong>--°</strong>

              <div className="weather-details">
                <span>Weather unavailable</span>

                <small>Try another city</small>
              </div>
            </>
          )}
        </div>

        {/* =====================================================
            META
        ====================================================== */}

        <div className="location-meta">
          <div>
            <span>LOCAL TIME</span>

            <strong>{weatherLoading ? "--:--" : getLocalTime()}</strong>
          </div>

          <div>
            <span>CURRENCY</span>

            <strong>{weatherLoading ? "--" : getCurrency()}</strong>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default Hero;
