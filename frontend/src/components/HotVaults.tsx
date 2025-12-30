import { Plus } from "lucide-react";

import { useNavigate } from "react-router-dom";
import AllVaults from "./AllVaults";
import { useEffect, useState } from "react";
import useVaultsAddresses from "../blockchain-interaction/useAllVaultsAddresses";
import { VaultType, VaultAddress } from "../types/Vault";
import useSingleVault from "@/blockchain-interaction/useSingleVault";

const HotVaults = () => {
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
    };

    init();
  }, [allVaultsAddresses]);

  return (
    <div className="py-10 border-t border-white/10 ">
      <div className=" flex flex-row justify-between mb-10">
        <h2 className="text-4xl text-[#21e786] ">
          HOT <span className=" text-white">VAULTS</span>
        </h2>
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
  );
};

export default HotVaults;
