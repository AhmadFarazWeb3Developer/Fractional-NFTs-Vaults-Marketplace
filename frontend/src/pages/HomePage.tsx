import { useEffect } from "react";
import Footer from "../components/Footer";
import HotVaults from "../components/HotVaults";
import Navbar from "../components/NavBar";
import HeroSection from "../components/sections/HeroSection";
import WhyChooseFractionalVaults from "../components/sections/WhyChooseFractionalVaults";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <HeroSection />
      <HotVaults />
      <WhyChooseFractionalVaults />
      <Footer />
    </div>
  );
};

export default HomePage;
