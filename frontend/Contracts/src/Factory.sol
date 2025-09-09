// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {FractionalNFT} from "./FractionalNFT.sol";
import {FractionalNftVault} from "./FractionalNftVault.sol";
import {Context} from "@openzeppelin/contracts/utils/Context.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract FractionalNFTsVaultsMarketplaceFactory is Context, Ownable {
    mapping(address => address) public vaults;
    mapping(string => bool) private nftNames;
    mapping(string => bool) private nftSymbols;

    error NftNameOrSymbolExits();

    constructor(address _marketPlaceOwner) Ownable(_marketPlaceOwner) {}

    // if user try to create same vault again ?
    // create mapping
    function createNftVault(
        string memory _nftName,
        string memory _nftSymbol
    ) external returns (address) {
        // No Duplication of name and symbol
        if (nftNames[_nftName] || nftSymbols[_nftSymbol]) {
            revert NftNameOrSymbolExits();
        }

        FractionalNFT nft = new FractionalNFT(
            _msgSender(),
            _nftName,
            _nftSymbol
        );

        FractionalNftVault vault = new FractionalNftVault(nft, _msgSender());
        vaults[_msgSender()] = address(vault);
        nftNames[_nftName] = true;
        nftSymbols[_nftSymbol] = true;

        return address(vault);
    }
}
