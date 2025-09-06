// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test} from "forge-std/Test.sol";
import {FractionalNFTsVaultsMarketplaceFactory} from "../src/Factory.sol";
import {FractionalNftVault} from "../src/FractionalNftVault.sol";
import {FractionalNFT} from "../src/FractionalNFT.sol";

import {VaultTokenMock} from "./mocks/VaultTokenMock.sol";

abstract contract Utils is Test {
    address nftOwner = makeAddr("nft owner");

    FractionalNFTsVaultsMarketplaceFactory factory;

    FractionalNftVault nftVault;
    FractionalNFT nft;

    // VaultTokenMock vaultToken;

    function setUp() public virtual {
        factory = new FractionalNFTsVaultsMarketplaceFactory();

        nft = new FractionalNFT(nftOwner, "Fractional NFT", "fNFT");

        nftVault = new FractionalNftVault(
            nft,
            nftOwner,
            "Vault Token",
            "VT",
            100 ether
        );
    }
}
