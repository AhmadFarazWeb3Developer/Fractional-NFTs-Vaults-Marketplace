import { useContext, useEffect, useState } from "react";
import { VaultType } from "../types/Vault";
import useSingleVault from "@/blockchain-interaction/useSingleVault";
import AllVaults from "@/components/AllVaults";
import VaultContext from "@/context/VaultContext";
import useGetUserVaults from "@/blockchain-interaction/useGetUserVaultsAddresses";

const OwnerVaults = () => {
  const [vaults, setVaults] = useState<VaultType[]>([]);

  const vaultContext = useContext(VaultContext);
  if (!vaultContext) throw new Error("VaultContext missing");
  const { areVaultsChanged, setAreVaultsChanged } = vaultContext;
  const { getUserVaultsAddresses } = useGetUserVaults();

  const { getSingleVault } = useSingleVault();

  useEffect(() => {
    const init = async () => {
      const userVaultsAddresses = await getUserVaultsAddresses();

      if (!userVaultsAddresses?.userVaults) return;

      const { userVaults } = userVaultsAddresses;

      const allData = await Promise.all(
        userVaults.map(
          async (vaultAddress: string) => await getSingleVault(vaultAddress)
        )
      );
      setVaults(allData);
      if (areVaultsChanged) {
        setAreVaultsChanged(false);
      }
    };

    init();
  }, [areVaultsChanged]);

  return <AllVaults vaults={vaults} />;
};

export default OwnerVaults;
