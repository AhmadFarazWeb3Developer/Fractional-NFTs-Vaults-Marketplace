import { ArrowRight } from "lucide-react";
import { HotVaultCardProps } from "../interfaces/HotVaultCardProps";

const vaults = [
  {
    nftId: "1",
    nftImage:
      "https://cdn.decrypt.co/wp-content/uploads/2021/11/timbaland-bored-ape-nft-gID_6.png",
    collection: "Bored Ape Yacht Club",
    nftName: "Bored Ape #1234",
    floorPrice: "4,500 ETH",
    totalShares: 100,
    soldShares: 45,
  },
  {
    nftId: "2",
    nftName: "CryptoPunk #5678",
    collection: "CryptoPunks",
    nftImage: "https://rallyrd.com/wp-content/uploads/2022/03/Punk-02.jpg",
    floorPrice: "52.5 ETH",
    totalShares: 100,
    soldShares: 67,
  },
  {
    nftId: "3",
    nftName: "Moonbird #7890",
    collection: "Moonbirds",
    nftImage:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9JbNBUGddklk9Pr-DWzdd4FOC655m6JsGBA&s",
    floorPrice: "15.2 ETH",
    totalShares: 100,
    soldShares: 82,
  },
  {
    nftId: "4",
    nftName: "Clone X #2345",
    collection: "Clone X",
    nftImage:
      "https://imageio.forbes.com/specials-images/imageserve/61a5031d6a4e45c93370c192/0x0.png?format=png&crop=1009,757,x0,y166,safe&height=900&width=1600&fit=bounds",
    floorPrice: "3.1 ETH",
    totalShares: 100,
    soldShares: 50,
  },
];

const HotVaultCard = ({
  nftImage,
  collection,
  nftName,
  floorPrice,
  totalShares,
  soldShares,
  nftId,
}: HotVaultCardProps) => {
  const progress = Math.round((soldShares / totalShares) * 100);

  return (
    <div className="w-full sm:w-[calc(25%-1rem)] bg-black border border-white/15 overflow-hidden transition-all hover:shadow-lg">
      <div className="w-full h-[240px] relative overflow-hidden">
        <img
          src={nftImage}
          alt={nftName}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
      </div>

      <div className="py-5 px-2 space-y-3">
        <div className="space-y-1">
          <div className="text-xs text-white/60 uppercase tracking-wider">
            {collection}
          </div>
          <h3 className="text-lg text-white">{nftName}</h3>
        </div>

        <div className="flex justify-between items-center py-2 border-y border-white/10">
          <span className="text-xs text-white/40 uppercase">Floor Price</span>
          <span className="text-base text-[#21e786]">{floorPrice}</span>
        </div>

        {/* Progress */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs text-white/40 uppercase">Progress</span>
            <span className="text-xs text-white">
              {soldShares} / {totalShares}
            </span>
          </div>
          <div className="w-full h-2 bg-white/10 overflow-hidden border border-white/10">
            <div
              className="h-full"
              style={{ width: `${progress}%`, backgroundColor: "#21e786" }}
            ></div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-3">
          <button className="flex-1 bg-[#21e786] text-black py-2 cursor-pointer flex items-center justify-center gap-2 border border-black">
            Buy Shares <ArrowRight className="w-4 h-4" />
          </button>

          <button className="flex-1 bg-black text-white border border-white/20 hover:border-[#21e786] py-2 cursor-pointer">
            View Holders
          </button>
        </div>
      </div>
    </div>
  );
};

const HotVaults = () => {
  return (
    <div className="py-10 ">
      <h2 className="text-4xl text-[#21e786] mb-10">
        HOT <span className=" text-white">VAULTS</span>
      </h2>
      <div className="flex flex-wrap gap-4">
        {vaults.map((vault) => (
          <HotVaultCard key={vault.nftId} {...vault} />
        ))}
      </div>
    </div>
  );
};

export default HotVaults;
