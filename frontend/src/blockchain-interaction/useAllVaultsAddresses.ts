import { useEffect, useState } from "react";

import { VaultAddress } from "../types/Vault";
import useReadInstances from "./helpers/useReadInstances";

const useAllVaultsAddresses = () => {
  const [allVaultsAddresses, setVaultsAddresses] = useState<
    VaultAddress[] | undefined
  >();
  const [loading, setLoading] = useState(true);

  const { readInstances } = useReadInstances();

  useEffect(() => {
    const fetchAllVaultsAddresses = async () => {
      const instances = await readInstances();
      if (!instances) return;
      const { factoryInstance } = instances;

      try {
        const count = await factoryInstance.allVaultsLength();

        const allAddresses: VaultAddress[] = [];

        for (let i = 0; i < Number(count); i++) {
          const vaultAddress = await factoryInstance.allVaults(i);
          allAddresses.push({ vaultAddress: vaultAddress });
        }

        setVaultsAddresses(allAddresses);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllVaultsAddresses();
  }, []);

  return { allVaultsAddresses, loading };
};

export default useAllVaultsAddresses;
