import { useAppKitAccount } from "@reown/appkit/react";
import useWriteInstances from "./helpers/useWriteInstances";

const useCreateNFTVault = () => {
  const { writeInstances } = useWriteInstances();
  const { address } = useAppKitAccount();
  const createNFTVault = async (nftName: string, nftSymbol: string) => {
    const instances = await writeInstances();
    if (!instances) return;

    const { factoryInstance } = instances;

    const tx = await factoryInstance.createNftVault(nftName, nftSymbol);

    const receipt = await tx.wait();

    if (receipt) {
      const vaultAddress = await factoryInstance.vaults(address);

      const response = await fetch(
        "http://localhost:8000/api/v1/create-vault",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ vaultAddress }),
        }
      );

      await response.json();
    }

    if (!address) return;
    console.log(receipt);
  };

  return { createNFTVault };
};

export default useCreateNFTVault;
