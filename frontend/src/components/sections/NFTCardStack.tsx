import { ArrowRight, Sparkles } from "lucide-react";

const NFTCardStack = () => {
  return (
    <div className="flex-1 relative w-full  h-[600px]  max-w-[500px] flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0b3d2e]/30 via-[#21e786]/20 to-[#0b3d2e]/30 blur-[120px] rounded-full pointer-events-none  border-1 border-red-900"></div>

      {/* Card 3 */}
      <div
        className="absolute w-[300px] h-[490px] bg-black border border-white/15 overflow-hidden transition-all duration-700"
        style={{
          transform: "rotate(-15deg) translateY(50px) translateX(-30px)",
          zIndex: 1,
        }}
      >
        <div className="w-full h-[240px] relative overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1634973357973-f2ed2657db3c?w=400&h=400&fit=crop"
            alt="NFT"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
        </div>
        <div className="p-5 space-y-3 bg-black">
          <div className="space-y-1">
            <div className="text-xs text-white/60 font-semibold uppercase tracking-wider">
              Punk Collection
            </div>
            <h3 className="text-lg font-bold text-white">CryptoPunk #3100</h3>
          </div>
          <div className="flex justify-between items-center py-2 border-y border-white/10">
            <span className="text-xs text-white/40 uppercase">Floor Price</span>
            <span className="text-base font-bold text-[#21e786]">
              4,500 ETH
            </span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs text-white/40 uppercase">Progress</span>
              <span className="text-xs font-bold text-white">45 / 100</span>
            </div>
            <div className="w-full h-2 bg-white/10 overflow-hidden border border-white/10">
              <div className="h-full w-[45%] bg-[#21e786]"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Card 2 */}
      <div
        className="absolute w-[300px] h-[490px] bg-black border border-white/15 overflow-hidden transition-all duration-700"
        style={{
          transform: "rotate(-8deg) translateY(25px) translateX(0px)",
          zIndex: 2,
        }}
      >
        <div className="w-full h-[240px] relative overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=400&h=400&fit=crop"
            alt="NFT"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
        </div>
        <div className="p-5 space-y-3 bg-black">
          <div className="space-y-1">
            <div className="text-xs text-white/60 font-semibold uppercase tracking-wider">
              Ape Collection
            </div>
            <h3 className="text-lg font-bold text-white">Bored Ape #8817</h3>
          </div>
          <div className="flex justify-between items-center py-2 border-y border-white/10">
            <span className="text-xs text-white/40 uppercase">Floor Price</span>
            <span className="text-base font-bold text-[#21e786]">52.5 ETH</span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs text-white/40 uppercase">Progress</span>
              <span className="text-xs font-bold text-white">67 / 100</span>
            </div>
            <div className="w-full h-2 bg-white/10 overflow-hidden border border-white/10">
              <div className="h-full w-[67%] bg-[#21e786]"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Card 1 */}
      <div
        className="absolute w-[300px] h-[490px] bg-black border border-[#21e786] overflow-hidden transition-all duration-700 cursor-pointer"
        style={{
          transform: "rotate(0deg)",
          zIndex: 3,
        }}
      >
        <div className="w-full h-[240px] relative overflow-hidden">
          <img
            src="Lucid_Origin_Face_with_distorted_features_melting_into_a_scree_1.jpg"
            alt="NFT"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>

          <div className="absolute top-4 right-4 bg-[#21e786] text-black text-xs font-bold px-4 py-2 flex items-center gap-2 border border-black">
            <Sparkles className="w-3 h-3" />
            <span>HOT</span>
          </div>

          <div className="absolute bottom-4 left-4 bg-black px-3 py-1.5 border border-white/20">
            <div className="text-xs text-white/60">Starting at</div>
            <div className="text-sm font-bold text-white">0.152 ETH</div>
          </div>
        </div>

        <div className="p-5 space-y-3 bg-black">
          <div className="space-y-1">
            <div className="text-xs text-white/60 font-semibold uppercase tracking-wider">
              Azuki Collection
            </div>
            <h3 className="text-lg font-bold text-white">Azuki #9605</h3>
          </div>
          <div className="flex justify-between items-center py-2 border-y border-white/10">
            <span className="text-xs text-white/40 uppercase">Floor Price</span>
            <span className="text-base font-bold text-[#21e786]">15.2 ETH</span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs text-white/40 uppercase">Progress</span>
              <span className="text-xs font-bold text-white">82 / 100</span>
            </div>
            <div className="w-full h-2 bg-white/10 overflow-hidden border border-white/10">
              <div className="h-full w-[82%] bg-[#21e786]"></div>
            </div>
          </div>

          <button className="w-full bg-[#21e786] text-black py-3 font-bold text-sm flex items-center justify-center gap-2 border border-black">
            <span>Buy Shares</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NFTCardStack;
