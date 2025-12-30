import { useState } from "react";

import useVaultInstance from "./helpers/vaultInstance";

const useClaimNft = () => {
  const { getVaultInstance } = useVaultInstance();
  const [loading, setLoading] = useState(false);

  const claimNft = async (vaultAddress: string, _claimTo: string) => {
    setLoading(true);

    const vaultInstance = await getVaultInstance(vaultAddress);
    const vault = vaultInstance?.vaultInstance;

    const tx = await vault.claimNftTo(_claimTo);
    const receipt = tx.wait();

    console.log(receipt);
  };
  return { claimNft, loading };
};

export default useClaimNft;
