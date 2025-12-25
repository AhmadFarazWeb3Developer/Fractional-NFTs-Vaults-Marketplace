import { ArrowRight } from "lucide-react";
import NFTCardStack from "./NFTCardStack";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-12 lg:gap-20">
        <div className="flex-1 space-y-8 max-w-2xl">
          <div className="space-y-6">
            <h1 className="text-6xl sm:text-5xl leading-[1.1] tracking-wide">
              OWN A FRACTION OF PREMIUM {""}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#21e786] to-[#21e786]"></span>
              <span className="text-white/80">NFTs</span>
            </h1>

            <p className="text-xl sm:text-xl text-white/60 leading-relaxed max-w-xl font-poppins  font-light">
              Invest in high-value NFTs without breaking the bank.{" "}
              <span className="text-[#21e786]">Buy fractional shares</span>,
              earn from price appreciation, and trade anytime.
            </p>
          </div>

          <div className="flex flex-wrap gap-5 pt-4">
            <button
              onClick={() => navigate("/explore-vaults")}
              className="group relative bg-[#21e786] text-black px-10 py-5  transition-all hover:opacity-90 overflow-hidden cursor-pointer"
            >
              <span className="relative flex items-center gap-2">
                Explore Vaults
                <ArrowRight className="w-5 h-5" />
              </span>
            </button>

            <button
              onClick={() => navigate("/learn-more")}
              className="bg-black text-white px-10 py-5  border border-white/20 hover:border-[#21e786] transition-all cursor-pointer"
            >
              Learn More
            </button>
          </div>

          <div className="flex flex-wrap gap-8 pt-8 border-t border-white/10 font-poppins">
            <div>
              <div className="text-3xl  text-white mb-1">$2.4M+</div>
              <div className="text-sm text-white/50">Total Locked</div>
            </div>
            <div>
              <div className="text-3xl  text-white mb-1">1.2K+</div>
              <div className="text-sm text-white/50">Investors</div>
            </div>
            <div>
              <div className="text-3xl  text-white mb-1">47</div>
              <div className="text-sm text-white/50">Active Vaults</div>
            </div>
          </div>
        </div>

        <NFTCardStack />
      </div>
    </div>
  );
};

export default HeroSection;
