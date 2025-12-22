// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test} from "forge-std/Test.sol";
import {FractionalNFTsVaultsMarketplaceFactory} from "../src/Factory.sol";
import {FractionalNftVault} from "../src/FractionalNftVault.sol";
import {FractionalNFT} from "../src/FractionalNFT.sol";
import {VaultToken} from "../src/VaultToken.sol";

abstract contract Utils is Test {
    address factoryOwner = makeAddr("factory owner");
    address nftOwner = makeAddr("nft owner");

    FractionalNFTsVaultsMarketplaceFactory factory;

    FractionalNftVault nftVault;
    FractionalNFT nft;

    VaultToken vaultToken;

    function setUp() public virtual {
        nft = new FractionalNFT(nftOwner, "Fractional NFT", "fNFT");

        // user will always interact with factory
        factory = new FractionalNFTsVaultsMarketplaceFactory(factoryOwner);

        nftVault = new FractionalNftVault(nft, nftOwner, address(factory));
        //         vaultToken = new VaultToken();
    }
}
