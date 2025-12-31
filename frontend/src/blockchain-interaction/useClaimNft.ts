import { useState } from "react";

import useVaultInstance from "./helpers/vaultInstance";
import decodeError from "./helpers/decodeError";
import { toast } from "sonner";

const useClaimNft = () => {
  const { getVaultInstance } = useVaultInstance();
  const [loading, setLoading] = useState(false);

  const claimNft = async (vaultAddress: string, _claimTo: string) => {
    try {
      setLoading(true);

      const vaultInstance = await getVaultInstance(vaultAddress);
      const vault = vaultInstance?.vaultInstance;

      const tx = await vault.claimNftTo(_claimTo);
      const receipt = tx.wait();

      console.log(receipt);

      if (receipt) {
        toast.success("NFT claimed successfully!");
      }
    } catch (error) {
      await decodeError(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  return { claimNft, loading };
};

export default useClaimNft;
