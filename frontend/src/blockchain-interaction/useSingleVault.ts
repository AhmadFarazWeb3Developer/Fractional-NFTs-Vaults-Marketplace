import { Contract } from "ethers";
import abis from "./helpers/abi";
import getProvider from "./helpers/getProvider";
import useReadInstances from "./helpers/useReadInstances";

const useSingleVault = () => {
  const { readInstances } = useReadInstances();

  const singleVault = async (vaultAddress: string) => {
    const provider = getProvider(31337);

    const { fractionalNftVaultAbi, fractionalNFTAbi } = abis(); // console.log(await factoryInstance.attach(vaultAddress).tokenURI(0));

    const fractionalNFTInstance = new Contract(
      vaultAddress,
      fractionalNFTAbi,
      provider
    );
    const fractionalNFTVaultInstance = new Contract(
      vaultAddress,
      fractionalNftVaultAbi,
      provider
    );

    console.log(await fractionalNFTInstance.tokenURI(0));
    console.log(await fractionalNFTInstance.name());
    console.log(await fractionalNFTInstance.symbol());
    console.log(await fractionalNFTVaultInstance.MAX_SHARES());
  };

  return { singleVault };
};

export default useSingleVault;
