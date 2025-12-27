import { Contract, formatEther, parseEther, parseUnits } from "ethers";
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

    const tokenURI: string = await NFTInstance.tokenURI(0);
    const NFTName: string = await NFTInstance.name();
    const NFTSymbol: string = await NFTInstance.symbol();

    const totalShareHolders: string = formatEther(
      await VaultInstance.shareHoldersCount()
    );
    const soldShares = formatEther(await VaultInstance.totalSupply());
    const floorPrice = (await VaultInstance.updatedETHPrice()) * 1000n;

    return {
      tokenURI,
      NFTName,
      NFTSymbol,
      totalShareHolders,
      soldShares,
      floorPrice,
    };
  };

  return { singleVault };
};

export default useSingleVault;
