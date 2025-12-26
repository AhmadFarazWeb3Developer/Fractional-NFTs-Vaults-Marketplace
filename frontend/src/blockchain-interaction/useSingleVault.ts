import { Contract } from "ethers";
import abis from "./helpers/abi";
import getProvider from "./helpers/getProvider";

const useSingleVault = () => {
  const singleVault = async (vaultAddress: string) => {
    const provider = getProvider(31337);

    const { fractionalNftVaultAbi, fractionalNFTAbi } = abis();

    const VaultInstance = new Contract(
      vaultAddress,
      fractionalNftVaultAbi,
      provider
    );

    const NFTContractAddress = await VaultInstance.nftContract();

    const NFTInstance = new Contract(
      NFTContractAddress,
      fractionalNFTAbi,
      provider
    );

    const tokenURI = await NFTInstance.tokenURI(0);
    const NFTName = await NFTInstance.name();
    const NFTSymbol = await NFTInstance.symbol();

    const totalShares = 100;
    const soldShares = 82;
    const floorPrice = "15.2 ETH";

    return {
      tokenURI: tokenURI,
      NFTName,
      NFTSymbol,
      totalShares,
      soldShares,
      floorPrice,
    };
  };

  return { singleVault };
};

export default useSingleVault;
