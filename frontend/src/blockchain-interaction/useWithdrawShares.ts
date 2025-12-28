import { useState } from "react";
import { decodeError } from "./helpers/decodeError";
import { toast } from "sonner";
import { Contract, parseUnits } from "ethers";
import abis from "./helpers/abi";
import useSigner from "./helpers/useSigner";

const useWithdrawShares = () => {
  const [loading, setLoading] = useState(false);
  const { getSigner } = useSigner();
  const withdrawShares = async (
    numberOfSharesToWithdraw: string,
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

      const shares = parseUnits(numberOfSharesToWithdraw, 18);

      // uint256 marketplaceFee = (withdrawalValue * MARKETPLACE_FEE) / 1e18;

      const tx = await vaultInstance.redeemShares(shares);
      const receipt = await tx.wait();
      console.log(receipt);

      if (receipt) {
        toast.success(
          `You sold ${numberOfSharesToWithdraw} Shares for --- ETH`
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

  return { withdrawShares, loading };
};

export default useWithdrawShares;
