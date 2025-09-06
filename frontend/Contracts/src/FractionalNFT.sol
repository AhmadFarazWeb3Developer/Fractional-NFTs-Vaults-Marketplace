// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract FractionalNFT is Ownable, ERC721 {
    using Strings for uint256;
    address nftVault;
    string private baseURI = "VaultName/";
    event NftVaultUpadted(
        address indexed calledBy,
        address indexed oldVault,
        address indexed newVault
    );

    error NotCalledByVault(address calledBy);
    error InvalidVault(address vault);

    constructor(
        address _initialOwner,
        string memory _nftName,
        string memory _nftSymbol
    ) ERC721(_nftName, _nftSymbol) Ownable(_initialOwner) {
        _mint(_initialOwner, 0);
    }

    modifier checkVault(address _nftVault) {
        if (_nftVault == address(0)) revert InvalidVault(_nftVault);
        _;
    }
    function sendNftToVault(address _nftVault) external checkVault(_nftVault) {
        if (_msgSender() != nftVault) revert NotCalledByVault(_msgSender());

        _safeTransfer(owner(), nftVault, 0);
    }

    function tokenURI(
        uint256 tokenId
    ) public view override returns (string memory) {
        _requireOwned(tokenId);

        return
            bytes(baseURI).length > 0
                ? string.concat(_baseURI(), tokenId.toString())
                : "";
    }

    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }

    function setBaseURI(string memory baseURI_) external onlyOwner {
        baseURI = baseURI_;
    }
    function setNftVault(address _nftVault) external checkVault(_nftVault) {
        if (_msgSender() != owner() && _msgSender() != _nftVault) {
            revert OwnableUnauthorizedAccount(_msgSender());
        }

        address _oldVault = nftVault;
        nftVault = _nftVault;
        emit NftVaultUpadted(_msgSender(), _oldVault, nftVault);
    }
}
