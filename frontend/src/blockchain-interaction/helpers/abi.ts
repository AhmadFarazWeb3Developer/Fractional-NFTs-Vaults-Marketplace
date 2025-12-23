import Factory from "../../../onchain-protocol/artifacts/contracts/Factory.sol/FractionalNFTsVaultsMarketplaceFactory.json";
import FractionalNFT from "../../../onchain-protocol/artifacts/contracts/FractionalNFT.sol/FractionalNFT.json";
import FractionalNftVault from "../../../onchain-protocol/artifacts/contracts/FractionalNftVault.sol/FractionalNftVault.json";
import VaultToken from "../../../onchain-protocol/artifacts/contracts/VaultToken.sol/VaultToken.json";

const abis = () => {
  return {
    factoryAbi: Factory.abi,
    fractionalNFT: FractionalNFT.abi,
    fractionalNftVault: FractionalNftVault.abi,
    vaultToken: VaultToken.abi,
  };
};

export default abis;
