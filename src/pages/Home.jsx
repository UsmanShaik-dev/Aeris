import Navbar from "../components/Navabar";
import Hero from "../components/Hero";
import FeaturedDestinations from "../components/FeaturedDestinations";
import WhyTravelWithUs from "../components/WhyTravelWithUs";
import AIPlanner from "../components/AIPlanner";
import FloatingAI from "../components/FloatingAI/FloatingAI";
import Footer from "../components/Footer";

function Home() {
  return (
    <main className="app">
      <Navbar />

      <Hero />

      <FeaturedDestinations />

      <WhyTravelWithUs />

      <AIPlanner />

      <FloatingAI />

      <Footer />
    </main>
  );
}

export default Home;
