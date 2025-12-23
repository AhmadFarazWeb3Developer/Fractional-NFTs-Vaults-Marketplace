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
    if (!address) return;
    console.log(receipt);

    console.log(await factoryInstance.vaults(address));
  };

  return { createNFTVault };
};

export default useCreateNFTVault;
