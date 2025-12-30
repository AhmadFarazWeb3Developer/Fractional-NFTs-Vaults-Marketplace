import { Contract } from "ethers";
import abis from "./abi";
import useSigner from "./useSigner";

const useVaultInstance = () => {
  const { getSigner } = useSigner();
  const getVaultInstance = async (vaultAddress: string) => {
    const { signer } = await getSigner();
    const { fractionalNftVaultAbi } = abis();

    const vaultInstance = new Contract(
      vaultAddress,
      fractionalNftVaultAbi,
      signer
    );

    return { vaultInstance };
  };

  return { getVaultInstance };
};

export default useVaultInstance;
