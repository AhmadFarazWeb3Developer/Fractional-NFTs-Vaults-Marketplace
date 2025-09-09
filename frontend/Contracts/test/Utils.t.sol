// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test} from "forge-std/Test.sol";
import {FractionalNFTsVaultsMarketplaceFactory} from "../src/Factory.sol";
import {FractionalNftVault} from "../src/FractionalNftVault.sol";
import {FractionalNFT} from "../src/FractionalNFT.sol";
import {VaultToken} from "../src/VaultToken.sol";

abstract contract Utils is Test {
    address nftOwner = makeAddr("nft owner");

    FractionalNFTsVaultsMarketplaceFactory factory;

    FractionalNftVault nftVault;
    FractionalNFT nft;



    VaultToken vaultToken;

    function setUp() public virtual {
        factory = new FractionalNFTsVaultsMarketplaceFactory();

        nft = new FractionalNFT(nftOwner, "Fractional NFT", "fNFT");

        nftVault = new FractionalNftVault(nft, nftOwner);

        //         vaultToken = new VaultToken();
    }
}
