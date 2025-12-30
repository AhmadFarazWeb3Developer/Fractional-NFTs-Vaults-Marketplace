import { useEffect, useState } from "react";

import { VaultAddress } from "../types/Vault";

const useVaultsAddresses = () => {
  const [allVaultsAddresses, setVaultsAddresses] = useState<
    VaultAddress[] | undefined
  >();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const allVaultsAddresses = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_URL_V1}/get-all-vaults/`
        );

        const data = await response.json();

        if (response.status === 201) {
          setVaultsAddresses(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    allVaultsAddresses();
  }, []);

  return { allVaultsAddresses, loading };
};

export default useVaultsAddresses;
