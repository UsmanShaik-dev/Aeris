import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import "./FeaturedDestinations.css";

const destinations = [
  {
    country: "JAPAN",
    name: "Kyoto",
    slug: "kyoto",
    description: "Ancient streets, quiet temples and timeless beauty.",
    duration: "4–6 DAYS",
    rating: "4.8",
    image:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1200&q=85",
  },
  {
    country: "ITALY",
    name: "Amalfi Coast",
    slug: "amalfi-coast",
    description: "Cliffs, blue water and slow Mediterranean days.",
    duration: "5–7 DAYS",
    rating: "4.7",
    image:
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=1200&q=85",
  },
  {
    country: "ICELAND",
    name: "Iceland",
    slug: "iceland",
    description: "Wild landscapes beneath the northern lights.",
    duration: "6–8 DAYS",
    rating: "4.9",
    image:
      "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=1200&q=85",
  },
  {
    country: "SWITZERLAND",
    name: "Swiss Alps",
    slug: "swiss-alps",
    description: "Snowy peaks, alpine villages and breathtaking views.",
    duration: "5–8 DAYS",
    rating: "4.9",
    image:
      "https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=1200&q=85",
  },
  {
    country: "GREECE",
    name: "Santorini",
    slug: "santorini",
    description: "Whitewashed villages overlooking the Aegean Sea.",
    duration: "4–6 DAYS",
    rating: "4.8",
    image:
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=1200&q=85",
  },
];

function DestinationCard({ destination }) {
  return (
    <Link
      to={`/destinations/${destination.slug}`}
      className="destination-card-link"
    >
      <article className="destination-card">
        <img src={destination.image} alt={destination.name} />

        <div className="destination-card-overlay" />

        <div className="destination-card-content">
          <span>{destination.country}</span>

          <h3>{destination.name}</h3>

          <p>{destination.description}</p>

          <div className="destination-card-footer">
            <span>{destination.duration}</span>

            <span>★ {destination.rating}</span>
          </div>
        </div>
      </article>
    </Link>
  );
}

function DestinationGroup() {
  return (
    <div className="destination-group">
      {destinations.map((destination) => (
        <DestinationCard key={destination.name} destination={destination} />
      ))}
    </div>
  );
}

function FeaturedDestinations() {
  return (
    <section className="featured-section" id="destinations">
      <div className="section-heading">
        <div>
          <span className="section-eyebrow">DISCOVER SOMEWHERE NEW</span>

          <h2>
            Featured
            <span>Destinations</span>
          </h2>
        </div>

        <button className="view-all-button">
          View all
          <ArrowRight size={17} />
        </button>
      </div>

      <div className="destination-carousel">
        <div className="destination-track">
          <DestinationGroup />
          <DestinationGroup />
        </div>
      </div>
    </section>
  );
}

export default FeaturedDestinations;
