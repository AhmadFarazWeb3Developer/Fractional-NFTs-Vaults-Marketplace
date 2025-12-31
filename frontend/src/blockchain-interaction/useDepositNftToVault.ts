import { toast } from "sonner";
import decodeError from "./helpers/decodeError";
import useVaultInstance from "./helpers/vaultInstance";

const useDepositNftToVault = () => {
  const { getVaultInstance } = useVaultInstance();
  const depositNftToVault = async (vaultAddress: string) => {
    try {
      const instance = await getVaultInstance(vaultAddress);
      const vault = instance.vaultInstance;
      const tx = await vault.depositNftToVault();
      const receipt = await tx.wait();
      console.log(receipt);
      if (receipt) {
        toast.success("NFT deposited to vault successfully!");
      }
    } catch (error) {
      await decodeError(error);
    }
  };
  return { depositNftToVault };
};

export default useDepositNftToVault;
