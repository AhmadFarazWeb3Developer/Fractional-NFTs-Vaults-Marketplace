import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useVaultsAddresses from "../blockchain-interaction/useVaultsAddresses";
import { formatEther } from "ethers";

import { VaultType, VaultAddress } from "../types/Vault";
import useSingleVault from "@/blockchain-interaction/useSingleVault";

const ExploreVaultsPage = () => {
  const navigate = useNavigate();

  const [vaults, setVaults] = useState<VaultType[]>([]);

  const { allVaultsAddresses } = useVaultsAddresses();
  const { getSingleVault } = useSingleVault();

  useEffect(() => {
    const init = async () => {
      if (!allVaultsAddresses) return;

      const allData = await Promise.all(
        allVaultsAddresses.map(
          async (vaultAddress: VaultAddress) =>
            await getSingleVault(vaultAddress?.vaultAddress)
        )
      );
      setVaults(allData);

      console.log("all data : ", allData);
    };

    init();
  }, [allVaultsAddresses]);

  return (
    <div className="min-h-screen bg-black px-6 lg:px-12 py-20 text-white">
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-4xl font-bakbak">Explore Vaults</h1>

        <button
          onClick={() => navigate("/create-vault")}
          className="flex items-center gap-2 bg-[#21e786] text-black px-6 py-3 border border-black  cursor-pointer"
        >
          <Plus size={18} />
          Create Vault
        </button>
      </div>

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
                    <span>
                      {vault.soldShares} / {vault.totalShareHolders}
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
                    navigate("/single-vault", { state: { vault } })
                  }
                  className="w-full bg-[#21e786] text-black py-3  cursor-pointer border border-black"
                >
                  View Vault
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExploreVaultsPage;
