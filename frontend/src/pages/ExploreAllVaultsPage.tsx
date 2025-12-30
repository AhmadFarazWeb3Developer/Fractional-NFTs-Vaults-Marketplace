import { Plus } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useVaultsAddresses from "../blockchain-interaction/useVaultsAddresses";
import { VaultType, VaultAddress } from "../types/Vault";
import useSingleVault from "@/blockchain-interaction/useSingleVault";
import Navbar from "@/components/NavBar";
import AllVaults from "@/components/AllVaults";
import VaultContext from "@/context/VaultContext";

const ExploreAllVaultsPage = () => {
  const navigate = useNavigate();

  const [vaults, setVaults] = useState<VaultType[]>([]);

  const vaultContext = useContext(VaultContext);
  if (!vaultContext) throw new Error("VaultContext missing");
  const { areVaultsChanged, setAreVaultsChanged } = vaultContext;

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
      if (areVaultsChanged) {
        setAreVaultsChanged(false);
      }
    };

    init();
  }, [allVaultsAddresses, areVaultsChanged]);

  return (
    <div>
      <Navbar />

      <div className="min-h-screen bg-black py-4 text-white">
        <div className="flex justify-end items-center mb-6">
          <button
            onClick={() => navigate("/create-vault")}
            className="flex items-center gap-2 bg-[#21e786] text-black px-6 py-3 border border-black  cursor-pointer"
          >
            <Plus size={18} />
            Create Vault
          </button>
        </div>

        <AllVaults vaults={vaults} />
      </div>
    </div>
  );
};

export default ExploreAllVaultsPage;
