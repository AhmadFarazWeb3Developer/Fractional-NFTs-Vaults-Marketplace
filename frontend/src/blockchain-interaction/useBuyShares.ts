import { Contract, formatEther, parseUnits } from "ethers";
import abis from "./helpers/abi";
import useSigner from "./helpers/useSigner";
import { decodeError } from "./helpers/decodeError";
import { useState } from "react";
import { toast } from "sonner";

const useBuyShares = () => {
  const { getSigner } = useSigner();
  const [loading, setLoading] = useState(false);

  const buyShares = async (
    numberOfSharesToBuy: string,
    vaultAddress: string
  ) => {
    try {
      setLoading(true);
      const { signer } = await getSigner();

      const { fractionalNftVaultAbi } = abis();

      const vaultInstance = new Contract(
        vaultAddress,
        fractionalNftVaultAbi,
        signer
      );

      const shares = parseUnits(numberOfSharesToBuy, 18);

      const [requiredETH] = await vaultInstance._calculateSharesPrice(shares);

      console.log(requiredETH);
      const tx = await vaultInstance.buyShares(shares, { value: requiredETH });
      const receipt = await tx.wait();
      console.log(receipt);

      if (receipt) {
        toast.success(
          `You bougth ${numberOfSharesToBuy} Shares for ${formatEther(
            requiredETH
          )} ETH`
        );
        return true;
      }
    } catch (error) {
      setLoading(false);
      decodeError(error);
    } finally {
      setLoading(false);
    }
  };

  return { buyShares, loading };
};

export default useBuyShares;
