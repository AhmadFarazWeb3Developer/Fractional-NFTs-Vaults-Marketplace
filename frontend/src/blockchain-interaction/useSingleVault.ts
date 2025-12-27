import { Contract, formatEther, parseEther, parseUnits } from "ethers";
import abis from "./helpers/abi";
import getProvider from "./helpers/getProvider";

import { shareholdersType } from "@/types/Vault";

const useSingleVault = () => {
  const getSingleVault = async (vaultAddress: string) => {
    const provider = getProvider(31337);

    console.log("vault address : ", vaultAddress);

    const { fractionalNftVaultAbi, fractionalNFTAbi } = abis();

    const VaultInstance = new Contract(
      vaultAddress,
      fractionalNftVaultAbi,
      provider
    );

    const NFTContractAddress = await VaultInstance.nftContract();

    const shareholdersCount = await VaultInstance.shareHoldersCount();
    // console.log(parseInt(shareholdersCount));
    let allShareholderData: shareholdersType[] = [];

    for (let i = 0; i < parseInt(shareholdersCount); i++) {
      const shareholder: string = await VaultInstance.shareholders(i);
      console.log("share holder : ", shareholder);
      allShareholderData.push({
        shareholder,
        shares: await VaultInstance.balanceOf(shareholder),
      });
    }

    const NFTInstance = new Contract(
      NFTContractAddress,
      fractionalNFTAbi,
      provider
    );

    const tokenURI: string = await NFTInstance.tokenURI(0);
    const vaultOwner: string = await NFTInstance.ownerOf(0);
    const NFTName: string = await NFTInstance.name();
    const NFTSymbol: string = await NFTInstance.symbol();

    const totalShareHolders: string = formatEther(shareholdersCount);
    const soldShares = formatEther(await VaultInstance.totalSupply());
    const floorPrice = (await VaultInstance.updatedETHPrice()) * 1000n;

    return {
      vaultAddress,
      vaultOwner,
      tokenURI,
      NFTName,
      NFTSymbol,
      totalShareHolders,
      soldShares,
      floorPrice,
      allShareholderData,
    };
  };

  return { getSingleVault };
};

export default useSingleVault;
