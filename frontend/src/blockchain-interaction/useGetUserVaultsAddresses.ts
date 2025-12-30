import { useAppKitAccount } from "@reown/appkit/react";
import useReadInstances from "./helpers/useReadInstances";
import { VaultAddress } from "@/types/Vault";

const useGetUserVaultsAddresses = () => {
  const { address } = useAppKitAccount();
  const { readInstances } = useReadInstances();

  const getUserVaultsAddresses = async () => {
    const instances = await readInstances();

    if (!instances) return;

    const { factoryInstance } = instances;

    let userVaults: VaultAddress[] = [];

    const count = await factoryInstance.userVaultsLength(address);

    for (let i = 0; i < Number(count); i++) {
      userVaults.push({
        vaultAddress: await factoryInstance.userVaults(address, i),
      });
    }

    return { userVaults };
  };

  return { getUserVaultsAddresses };
};
export default useGetUserVaultsAddresses;
