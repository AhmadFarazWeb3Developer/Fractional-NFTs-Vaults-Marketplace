import { useState } from "react";
import Footer from "../components/Footer";
import HotVaults from "../components/HotVaults";
import Navbar from "../components/NavBar";
import HeroSection from "../components/sections/HeroSection";
import WhyChooseFractionalVaults from "@/components/sections/WhyChooseFractionalVaults";
import { VaultType } from "@/types/Vault";

const HomePage = () => {
  const [topVault, setTopVault] = useState<VaultType>();

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <HeroSection topVault={topVault} />
      <HotVaults setTopVault={setTopVault} />
      <WhyChooseFractionalVaults />
      <Footer />
    </div>
  );
};

export default HomePage;
