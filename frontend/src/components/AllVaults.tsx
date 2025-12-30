import { ArrowUpRight } from "lucide-react";

import { useNavigate } from "react-router-dom";

import { formatEther } from "ethers";
import { VaultType } from "@/types/Vault";

interface AllVaultsProps {
  vaults: VaultType[];
}

const AllVaults = ({ vaults }: AllVaultsProps) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {vaults.map((vault) => {
          const progress = Math.round((parseInt(vault.soldShares) / 100) * 100);

          return (
            <div
              key={vault.vaultAddress}
              className="bg-black border border-white/15 overflow-hidden"
            >
              <div className="h-[220px] relative">
                <img
                  src={vault.tokenURI.slice(0, -1)}
                  alt={vault.NFTName}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              </div>

              <div className="p-5 space-y-3">
                <div>
                  <div className="text-xs text-white/60 uppercase">
                    {vault.NFTSymbol}
                  </div>
                  <div className="text-lg">{vault.NFTName}</div>
                </div>

                <div className="flex justify-between border-y border-white/10 py-2">
                  <span className="text-xs text-white/40">Floor</span>
                  <span className="text-[#21e786]">
                    {formatEther(vault.floorPrice)} ETH
                  </span>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-white/40">Progress</span>
                    <span className=" ">
                      {100 - Number(vault.soldShares)} / {100}
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
                  onClick={() =>
                    navigate(`/single-vault/${vault.vaultAddress}`)
                  }
                  className="w-full flex items-center justify-center gap-1 bg-[#21e786] text-black py-3  cursor-pointer border border-black"
                >
                  View Vault
                  <ArrowUpRight size={22} strokeWidth={2.5} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default AllVaults;
