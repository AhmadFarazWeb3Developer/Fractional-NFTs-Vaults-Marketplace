import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAllVaults from "../blockchain-interaction/useAllVaults";
import useSingleVault from "@/blockchain-interaction/useSingleVault";

type VaultType = {
  tokenURI: string;
  NFTName: string;
  NFTSymbol: string;
  totalShares: number;
  soldShares: number;
  floorPrice: string;
};

const ExploreVaultsPage = () => {
  const navigate = useNavigate();

  const [vaults, setVaults] = useState<VaultType[]>([]);

  const { allVaults } = useAllVaults();
  const { singleVault } = useSingleVault();

  useEffect(() => {
    const init = async () => {
      if (!allVaults) return;

      const allData = await Promise.all(
        allVaults.map(
          async (vault: string) => await singleVault(vault.vaultAddress)
        )
      );

      setVaults(allData);
    };

    init();
  }, [allVaults]);

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
          const progress = Math.round(
            (vault.soldShares / vault.totalShares) * 100
          );

          return (
            <div className="bg-black border border-white/15 overflow-hidden">
              <div className="h-[220px] relative">
                <img
                  src={vault.image}
                  alt={vault.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              </div>

              <div className="p-5 space-y-3">
                <div>
                  <div className="text-xs text-white/60 uppercase">
                    {vault.collection}
                  </div>
                  <div className="text-lg">{vault.name}</div>
                </div>

                <div className="flex justify-between border-y border-white/10 py-2">
                  <span className="text-xs text-white/40">Floor</span>
                  <span className="text-[#21e786]">{vault.floorPrice}</span>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-white/40">Progress</span>
                    <span>
                      {vault.soldShares} / {vault.totalShares}
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
                  onClick={() => navigate("/single-vault")}
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
