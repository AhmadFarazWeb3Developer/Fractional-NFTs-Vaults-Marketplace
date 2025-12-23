import { useAppKitNetwork } from "@reown/appkit/react";
import getProvider from "./getProvider";
import abis from "./abi";
import getAddressesByChainId from "./getAddressesByChainId";
import { Contract } from "ethers";

const useReadInstances = () => {
  const { chainId } = useAppKitNetwork();
  const readInstances = async () => {
    if (!chainId) return;

    const numericChainId =
      typeof chainId === "string" ? parseInt(chainId) : chainId;
    const provider = getProvider(numericChainId);

    const { factoryAddress } = getAddressesByChainId(numericChainId);
    const { factoryAbi } = abis();
    const factoryInstance = new Contract(factoryAddress, factoryAbi, provider);
  };
  return { readInstances };
};

export default useReadInstances;
