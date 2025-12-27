import { useAppKitAccount } from "@reown/appkit/react";
import useWriteInstances from "./helpers/useWriteInstances";
import { toast } from "sonner";
import { decodeError } from "./helpers/decodeError";

const useCreateNFTVault = () => {
  const { writeInstances } = useWriteInstances();
  const { address } = useAppKitAccount();

  const createNFTVault = async (nftName: string, nftSymbol: string) => {
    if (!address) return;

    console.log(nftName);
    console.log(nftSymbol);

    try {
      const instances = await writeInstances();
      console.log(instances);
      if (!instances) return;

      const { factoryInstance } = instances;
      const tx = await factoryInstance.createNftVault(nftName, nftSymbol);

      const receipt = await tx.wait();
      if (!receipt) return;

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

      console.log(await response.json());

      if (response.status !== 201) {
        throw new Error("Backend failed to store vault");
      }

      toast.success("Vault created!", {
        action: { label: "Close", onClick: () => {} },
      });

      console.log(receipt);

      return true;
    } catch (error: any) {
      decodeError(error);
    }
  };

  return { createNFTVault };
};

export default useCreateNFTVault;
