import { useEffect, useState } from "react";

// type Vault = {
//   _id: string;
//   nftAddress: string;
//   totalShares: number;
//   soldShares: number;
//   pricePerShare: string;
// };

const useAllVaults = () => {
  const [allVaults, setVaults] = useState<[] | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const allVaults = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/v1/get-all-vaults/"
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
