import Navbar from "../components/NavBar";
import HeroSection from "../components/sections/HeroSection";
import WhyChooseFractionalVaults from "../components/sections/WhyChooseFractionalVaults";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <HeroSection />
      <WhyChooseFractionalVaults />
    </div>
  );
};

export default HomePage;
