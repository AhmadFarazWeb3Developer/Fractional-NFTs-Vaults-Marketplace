import { useEffect, useState } from "react";

// type Vault = {
//   _id: string;
//   nftAddress: string;
//   totalShares: number;
//   soldShares: number;
//   pricePerShare: string;
// };

const useAllVaults = () => {
  const [allVaults, setVaults] = useState<string[] | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const allVaults = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_URL_V1}/get-all-vaults/`
        );

        const data = await response.json();

        console.log("data : ", data);
        if (response.status === 201) {
          setVaults(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    allVaults();
  }, []);

  return { allVaults, loading };
};

export default useAllVaults;
