import { useAppKitNetwork } from "@reown/appkit/react";

import getAddressesByChainId from "./getAddressesByChainId";
import abis from "./abi";
import useSigner from "./useSigner";

import { Contract } from "ethers";

const useWriteInstances = () => {
  const { chainId } = useAppKitNetwork();
  const { getSigner } = useSigner();

  const writeInstances = async () => {
    if (!chainId) return;

    const numericChainId =
      typeof chainId === "string" ? parseInt(chainId) : chainId;
    const { factoryAddress } = getAddressesByChainId(numericChainId);
    const { factoryAbi } = abis();
    const { signer } = await getSigner();

    const factoryInstance = new Contract(factoryAddress, factoryAbi, signer);
    console.log(chainId);
    console.log(factoryInstance);

    return { factoryInstance };
  };

  return { writeInstances };
};

export default useWriteInstances;
