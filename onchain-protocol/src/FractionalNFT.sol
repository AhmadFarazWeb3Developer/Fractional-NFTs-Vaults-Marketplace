// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

/// @title FractionalNFT
/// @notice ERC721 NFT with vault binding for fractionalization.
contract FractionalNFT is Ownable, ERC721 {
    using Strings for uint256;

    /// @notice Address of the associated vault.
    address nftVault;

    /// @notice URI for metadata.
    string private baseURI = "";

    /// @notice Emitted when NFT vault is updated.
    /// @param calledBy Caller who triggered the update.
    /// @param oldVault Previous vault address.
    /// @param newVault New vault address.
    event NftVaultUpadted(
        address indexed calledBy,
        address indexed oldVault,
        address indexed newVault
    );

    /// @notice Thrown when caller is not the vault.
    error NotCalledByVault(address calledBy);

    /// @notice Thrown when vault address is invalid.
    error InvalidVault(address vault);

    /// @param _initialOwner Owner of the NFT.
    /// @param _nftName ERC721 name.
    /// @param _nftSymbol ERC721 symbol.
    constructor(
        address _initialOwner,
        string memory _nftName,
        string memory _nftSymbol,
        string memory _nftURI
    ) ERC721(_nftName, _nftSymbol) Ownable(_initialOwner) {
        _mint(_initialOwner, 0);
        baseURI = _nftURI;
    }

    /// @dev Ensures vault address is valid.
    modifier checkVault(address _nftVault) {
        if (_nftVault == address(0)) revert InvalidVault(_nftVault);
        _;
    }

    /// @notice Transfers NFT to the vault.
    /// @param _nftVault Vault address.
    function sendNftToVault(address _nftVault) external checkVault(_nftVault) {
        if (_msgSender() != nftVault) revert NotCalledByVault(_msgSender());

        _safeTransfer(owner(), nftVault, 0);
    }

    /// @inheritdoc ERC721
    function tokenURI(
        uint256 tokenId
    ) public view override returns (string memory) {
        _requireOwned(tokenId);

        return
            bytes(baseURI).length > 0
                ? string.concat(_baseURI(), tokenId.toString())
                : "";
    }

    /// @inheritdoc ERC721
    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }

    /// @notice Updates URI.
    /// @param baseURI_ New URI.
    function setBaseURI(string memory baseURI_) external onlyOwner {
        baseURI = baseURI_;
    }

    /// @notice Sets the vault address.
    /// @param _nftVault New vault address.
    function setNftVault(address _nftVault) external checkVault(_nftVault) {
        if (_msgSender() != owner() && _msgSender() != _nftVault) {
            revert OwnableUnauthorizedAccount(_msgSender());
        }

        address _oldVault = nftVault;
        nftVault = _nftVault;
        emit NftVaultUpadted(_msgSender(), _oldVault, nftVault);
    }
}
