import { Contract, parseUnits } from "ethers";
import abis from "./helpers/abi";
import useSigner from "./helpers/useSigner";
import { decodeError } from "./helpers/decodeError";

const useBuyShares = () => {
  const { getSigner } = useSigner();
  const buyShares = async (numberSharesToBuy: string, vaultAddress: string) => {
    try {
      const { signer } = await getSigner();

      const { fractionalNftVaultAbi } = abis();

      const vaultInstance = new Contract(
        vaultAddress,
        fractionalNftVaultAbi,
        signer
      );

      const shares = parseUnits(numberSharesToBuy, 18);

      const [requiredETH] = await vaultInstance._calculateSharesPrice(shares);

      console.log(requiredETH);
      const tx = await vaultInstance.buyShares(shares, { value: requiredETH });
      const receipt = await tx.wait();
      console.log(receipt);
    } catch (error) {
      decodeError(error);
    }
  };

  return { buyShares };
};

export default useBuyShares;
