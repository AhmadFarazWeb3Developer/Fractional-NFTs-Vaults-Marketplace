import decodeError from "./helpers/decodeError";
import useVaultInstance from "./helpers/vaultInstance";

const useDepositNftToVault = () => {
  const { getVaultInstance } = useVaultInstance();
  const depositNftToVault = async (vaultAddress: string) => {
    try {
      const instance = await getVaultInstance(vaultAddress);
      const vault = instance.vaultInstance;
      const tx = await vault.depositNftToVault();
      const receipt = await tx.await();
      console.log(receipt);
    } catch (error) {
      decodeError(error);
    }
  };
  return { depositNftToVault };
};

export default useDepositNftToVault;
