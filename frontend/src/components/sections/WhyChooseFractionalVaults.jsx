import { TrendingUp, Users, Lock } from "lucide-react";

const WhyChooseFractionalVaults = () => {
  return (
    <div className="px-6 lg:px-12 xl:px-20 py-20 border-t border-white/10">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl lg:text-5xl font-bold text-white">
            Why Choose Fractional Vaults?
          </h2>
          <p className="text-lg text-white/60">
            Experience the future of NFT investing with our innovative features
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          <div className="flex-1 min-w-[280px] max-w-[340px] bg-black p-8 border border-white/10 hover:border-[#21e786] transition-all">
            <div className="w-14 h-14 bg-black border border-[#21e786] flex items-center justify-center mb-6">
              <TrendingUp className="text-[#21e786] w-7 h-7" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">
              Price Appreciation
            </h3>
            <p className="text-white/60 leading-relaxed">
              Every share purchase increases vault price by{" "}
              <span className="text-[#21e786] font-semibold">0.1%</span>. Early
              investors benefit most from growing demand.
            </p>
          </div>

          <div className="flex-1 min-w-[280px] max-w-[340px] bg-black p-8 border border-white/10 hover:border-[#21e786] transition-all">
            <div className="w-14 h-14 bg-black border border-[#21e786] flex items-center justify-center mb-6">
              <Users className="text-[#21e786] w-7 h-7" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">
              Collective Ownership
            </h3>
            <p className="text-white/60 leading-relaxed">
              Join forces with other investors. Each vault divides into{" "}
              <span className="text-[#21e786] font-semibold">
                100 fractional shares
              </span>{" "}
              for accessible entry.
            </p>
          </div>

          <div className="flex-1 min-w-[280px] max-w-[340px] bg-black p-8 border border-white/10 hover:border-[#21e786] transition-all">
            <div className="w-14 h-14 bg-black border border-[#21e786] flex items-center justify-center mb-6">
              <Lock className="text-[#21e786] w-7 h-7" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">
              Secure Vaults
            </h3>
            <p className="text-white/60 leading-relaxed">
              NFTs safely locked in{" "}
              <span className="text-[#21e786] font-semibold">
                audited smart contracts
              </span>
              . Transparent, trustless, and fully on-chain.
            </p>
          </div>

          <div className="flex-1 min-w-[280px] max-w-[340px] bg-black p-8 border border-white/10 hover:border-[#21e786] transition-all">
            <div className="w-14 h-14 bg-black border border-[#21e786] flex items-center justify-center mb-6">
              <TrendingUp className="text-[#21e786] w-7 h-7" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">
              Withdraw Anytime
            </h3>
            <p className="text-white/60 leading-relaxed">
              Redeem your shares instantly at{" "}
              <span className="text-[#21e786] font-semibold">
                current market value
              </span>
              . Full liquidity, no lock-up periods.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseFractionalVaults;
