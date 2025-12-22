// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Context} from "@openzeppelin/contracts/utils/Context.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {Address} from "@openzeppelin/contracts/utils/Address.sol";

import {FractionalNFT} from "./FractionalNFT.sol";
import {FractionalNftVault} from "./FractionalNftVault.sol";

/// @title Fractional NFTs Vaults Marketplace Factory
/// @notice Factory contract to deploy FractionalNFT + FractionalNftVault pairs
/// @dev Each unique NFT collection name/symbol pair maps to one vault

contract FractionalNFTsVaultsMarketplaceFactory is Context, Ownable {
    /// @dev Maps vault Owner → deployed vault
    mapping(address => address) public vaults;

    /// @dev Tracks uniqueness of NFT names
    mapping(string => bool) private nftNames;

    /// @dev Tracks uniqueness of NFT symbols
    mapping(string => bool) private nftSymbols;

    error NftNameOrSymbolExits();

    constructor(address _marketPlaceOwner) Ownable(_marketPlaceOwner) {}

    /// @notice Deploy a new FractionalNFT + FractionalNftVault pair
    /// @param _nftName The name of the NFT collection (must be unique)
    /// @param _nftSymbol The symbol of the NFT collection (must be unique)
    /// @return Address of the newly created vault
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

        FractionalNftVault vault = new FractionalNftVault(
            nft,
            _msgSender(),
            address(this)
        );

        vaults[_msgSender()] = address(vault);
        nftNames[_nftName] = true;
        nftSymbols[_nftSymbol] = true;

        return address(vault);
    }

    /// @notice Sweep all ETH from this factory to a target address

    function sweepETH(address _address) external onlyOwner {
        Address.sendValue(payable(_address), address(this).balance);
    }

    /// @notice Receive ETH with no calldata
    receive() external payable {}

    /// @notice Rejects ETH transfers with calldata
    fallback() external payable {
        revert();
    }
}
