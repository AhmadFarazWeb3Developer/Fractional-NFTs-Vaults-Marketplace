import { VaultType } from "@/types/Vault";
import { formatEther } from "ethers";
import { ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface NFTCardStackProp {
  topVault?: VaultType;
}
const NFTCardStack = ({ topVault }: NFTCardStackProp) => {
  if (!topVault) {
    return;
  }
  console.log(topVault?.tokenURI);
  const navigate = useNavigate();
  const progress = Math.round((parseInt(topVault?.soldShares) / 100) * 100);

  return (
    <div className="flex-1 relative w-full h-[600px] max-w-[500px] flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-br from-[#21e786]/20 via-[#21e786]/10 to-[#21e786]/20 blur-[120px] pointer-events-none" />

      {/* Card 3 (back) */}
      <div
        className="absolute w-[300px] h-[490px] bg-black border border-white/15 overflow-hidden transition-all duration-700"
        style={{
          transform: "translate(0px, 0px) rotate(-15deg)",
          zIndex: 1,
        }}
      >
        <div className="w-full h-[240px] relative overflow-hidden">
          <img
            src="Leonardo_Phoenix_10_sinais_de_que_voc_est_sentindo_os_efeitos_0.jpg"
            alt="NFT"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        </div>

        <div className="p-5 space-y-3 bg-black">
          <div className="space-y-1">
            <div className="text-xs text-white/60  uppercase tracking-wider">
              Punk Collection
            </div>
            <h3 className="text-lg  text-white">CryptoPunk #3100</h3>
          </div>

          <div className="flex justify-between items-center py-2 border-y border-white/10">
            <span className="text-xs text-white/40 uppercase">Floor Price</span>
            <span className="text-base  text-[#21e786]">4,500 ETH</span>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs text-white/40 uppercase">Progress</span>
              <span className="text-xs  text-white">45 / 100</span>
            </div>
            <div className="w-full h-2 bg-white/10 border border-white/10">
              <div className="h-full w-[45%] bg-[#21e786]" />
            </div>
          </div>
        </div>
      </div>

      {/* Card 2 (middle) */}
      <div
        className="absolute w-[300px] h-[490px] bg-black border border-white/15 overflow-hidden transition-all duration-700"
        style={{
          transform: "translate(0px, 0px) rotate(-7deg)",
          zIndex: 2,
        }}
      >
        <div className="w-full h-[240px] relative overflow-hidden">
          <img
            src="alchemyrefiner_alchemymagic_0_c20d2543-62d0-46c6-b6d8-a3e4321c5f83_0.jpg"
            alt="NFT"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        </div>

        <div className="p-5 space-y-3 bg-black">
          <div className="space-y-1">
            <div className="text-xs text-white/60  uppercase tracking-wider">
              Ape Collection
            </div>
            <h3 className="text-lg  text-white">Bored Ape #8817</h3>
          </div>

          <div className="flex justify-between items-center py-2 border-y border-white/10">
            <span className="text-xs text-white/40 uppercase">Floor Price</span>
            <span className="text-base  text-[#21e786]">52.5 ETH</span>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs text-white/40 uppercase">Progress</span>
              <span className="text-xs  text-white">67 / 100</span>
            </div>
            <div className="w-full h-2 bg-white/10 border border-white/10">
              <div className="h-full w-[67%] bg-[#21e786]" />
            </div>
          </div>
        </div>
      </div>

      {/* Card 1 (front) */}

      {topVault ? (
        <div
          className="absolute w-[300px] h-[490px] bg-black border border-white/15 overflow-hidden transition-all duration-700"
          style={{
            transform: "translate(0px, 0px) rotate(0deg)",
            zIndex: 3,
          }}
        >
          <div className="w-full h-[240px] relative overflow-hidden">
            <img
              src={topVault.tokenURI.slice(0, -1)}
              alt="NFT"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

            <div className="absolute top-4 right-4 text-[#21e786] text-xs px-4 py-2 flex items-center gap-2 ">
              <Sparkles className="w-3 h-3" />
              <span>HOT</span>
            </div>
          </div>

          <div className="p-5 space-y-3 bg-black">
            <div className="space-y-1">
              <div className="text-xs text-white/60 uppercase tracking-wider">
                {topVault.NFTName}
              </div>
              <h3 className="text-lg text-white">{topVault.NFTSymbol}</h3>
            </div>

            <div className="flex justify-between items-center py-2 border-y border-white/10">
              <span className="text-xs text-white/40 uppercase">
                Floor Price
              </span>
              <span className="text-base text-[#21e786]">
                {formatEther(topVault.floorPrice)} ETH
              </span>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-white/40">Progress</span>
                <span className=" ">
                  {100 - Number(topVault.soldShares)} / {100}
                  <p className=" font-poppins text-white/40"> Remaining</p>
                </span>
              </div>
              <div className="h-2 border border-white/10 bg-white/10">
                <div
                  className="h-full bg-[#21e786]"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <button
              onClick={() => navigate(`/single-vault/${topVault.vaultAddress}`)}
              className="w-full bg-[#21e786] text-black py-3 text-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Buy Shares</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div
          className="absolute w-[300px] h-[490px] bg-black border border-white/15 overflow-hidden transition-all duration-700"
          style={{
            transform: "translate(0px, 0px) rotate(0deg)",
            zIndex: 3,
          }}
        >
          <div className="w-full h-[240px] relative overflow-hidden">
            <img src="" alt="NFT" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

            <div className="absolute top-4 right-4 text-[#21e786] text-xs px-4 py-2 flex items-center gap-2 border border-black">
              <Sparkles className="w-3 h-3" />
              <span>HOT</span>
            </div>

            <div className="absolute bottom-4 left-4 bg-black px-3 py-1.5 border border-white/20">
              <div className="text-xs text-white/60">Starting at</div>
              <div className="text-sm text-white">0.152 ETH</div>
            </div>
          </div>

          <div className="p-5 space-y-3 bg-black">
            <div className="space-y-1">
              <div className="text-xs text-white/60 uppercase tracking-wider">
                Azuki
              </div>
              <h3 className="text-lg text-white">AZK</h3>
            </div>

            <div className="flex justify-between items-center py-2 border-y border-white/10">
              <span className="text-xs text-white/40 uppercase">
                Floor Price
              </span>
              <span className="text-base text-[#21e786]">15.2 ETH</span>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs text-white/40 uppercase">
                  Progress
                </span>
                <span className="text-xs text-white">82 / 100</span>
              </div>
              <div className="w-full h-2 bg-white/10 border border-white/10">
                <div className="h-full w-[82%] bg-[#21e786]" />
              </div>
            </div>

            <button className="w-full bg-[#21e786] text-black py-3 text-sm flex items-center justify-center gap-2 cursor-pointer">
              <span>Buy Shares</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NFTCardStack;
