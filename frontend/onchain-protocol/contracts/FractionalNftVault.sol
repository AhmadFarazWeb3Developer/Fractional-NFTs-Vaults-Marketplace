// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {VaultToken} from "./VaultToken.sol";
import {
    ReentrancyGuard
} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {Address} from "@openzeppelin/contracts/utils/Address.sol";
import {
    IERC721Receiver
} from "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import {FractionalNFT} from "./FractionalNFT.sol";

/// @title Fractional NFT Vault
/// @notice Handles fractionalization, buying, redeeming shares and claiming NFT
contract FractionalNftVault is
    Ownable,
    VaultToken,
    ReentrancyGuard,
    IERC721Receiver
{
    // 1 share = 1000 tokens
    uint256 public constant MAX_SHARES = 100; //
    uint256 public constant TOKENS_PER_SHARE = 1000 * 1e18; // 1000 tokens per share
    uint256 public constant BASE_ETH_PER_TOKEN = 5e14; // 0.0005 ETH per token
    uint256 public constant MARKETPLACE_FEE = 3e15; // 0.3% on each sell of shares

    // 1000 tokens * 0.0005 ETH = 0.5 ETH per single share

    FractionalNFT public immutable nftContract;
    address public immutable factory;

    /// @notice Thrown when user sends less ETH than required
    error RequiredETHForTokens(uint256 passedValue, uint256 requiredValue);

    /// @notice Thrown if shares < minimum
    error MinimumSharesRequired(uint256 passed, uint256 minimum);

    /// @notice Thrown if shares > maximum
    error MaximumSharesSurpassed(uint256 passed, uint256 maximum);

    /// @notice Thrown when user has insufficient shares
    error InsufficientShares();

    /// @notice Thrown when ETH sent directly
    error DirectETHTransferNotAllowed();

    /// @param _nftContract Fractional NFT contract
    /// @param _initialOwner Owner of vault
    /// @param _factory Marketplace factory
    constructor(
        FractionalNFT _nftContract,
        address _initialOwner,
        address _factory
    ) Ownable(_initialOwner) {
        nftContract = _nftContract;
        factory = _factory;
    }

    /// @notice Deposit NFT into vault
    function depositNftToVault() external onlyOwner {
        nftContract.setNftVault(address(this));
        nftContract.sendNftToVault(address(this));
        nftContract.approve(address(this), 0);
    }

    /// @notice Buy shares by sending ETH
    /// @param _numberSharesToBuy Number of shares to purchase (18 decimals)
    function buyShares(
        uint256 _numberSharesToBuy
    ) external payable nonReentrant {
        (
            uint256 requiredETH,
            uint256 numberOfRequiredTokens
        ) = _calculateSharesPrice(_numberSharesToBuy);

        // CHECKS
        if (balanceOf(_msgSender()) == 0) {
            shareHoldersCount++;
        }

        // EFFECTS
        _mint(_msgSender(), numberOfRequiredTokens);

        if (msg.value < requiredETH)
            revert RequiredETHForTokens(msg.value, requiredETH);
        else if (msg.value > requiredETH) {
            uint256 excess = msg.value - requiredETH;
            // INTERACTION
            Address.sendValue(payable(_msgSender()), excess);
        }
    }

    /// @notice Redeem shares for ETH
    /// @param _sharesToRedeem Number of shares to redeem (18 decimals)
    function redeemShares(uint256 _sharesToRedeem) external nonReentrant {
        uint256 requiredTokens = (_sharesToRedeem * TOKENS_PER_SHARE) / 1e18;

        // CHECKS
        if (requiredTokens > balanceOf(_msgSender())) {
            revert InsufficientShares();
        }

        uint256 totalSharesInExistence = (totalSupply() * 1e18) /
            TOKENS_PER_SHARE;

        uint256 withdrawalValue = (address(this).balance * _sharesToRedeem) /
            totalSharesInExistence;
        uint256 marketplaceFee = (withdrawalValue * MARKETPLACE_FEE) / 1e18;

        // EFFECTS
        _burn(_msgSender(), requiredTokens);
        if (balanceOf(_msgSender()) == 0) {
            shareHoldersCount--;
        }

        // INTERACTIONS
        Address.sendValue(payable(factory), marketplaceFee);
        Address.sendValue(
            payable(_msgSender()),
            withdrawalValue - marketplaceFee
        );
    }

    /// @notice Calculate ETH & tokens for buying shares
    /// @param _numberSharesToBuy Number of shares (18 decimals)
    /// @return requiredETH ETH required
    /// @return numberOfRequiredTokens Tokens minted
    function _calculateSharesPrice(
        uint256 _numberSharesToBuy
    )
        public
        view
        returns (uint256 requiredETH, uint256 numberOfRequiredTokens)
    {
        uint256 maxShareScaled = MAX_SHARES * 1e18;
        uint256 totalSharesInExistence = (totalSupply() * 1e18) /
            TOKENS_PER_SHARE;

        if (_numberSharesToBuy < 1e17) {
            revert MinimumSharesRequired(_numberSharesToBuy, 1e17);
        } else if (
            (totalSharesInExistence + _numberSharesToBuy) > maxShareScaled
        ) {
            uint256 availableShares = maxShareScaled - totalSharesInExistence;
            revert MaximumSharesSurpassed(availableShares, _numberSharesToBuy);
        }

        numberOfRequiredTokens = (_numberSharesToBuy * TOKENS_PER_SHARE) / 1e18;

        uint256 currentETHPerToken = _updatedETHPrice();
        requiredETH = (currentETHPerToken * numberOfRequiredTokens) / 1e18;
    }

    /// @notice Claim NFT if caller owns 100% of shares
    /// @param _to Receiver of NFT
    function claimNftTo(address _to) external {
        // CHECKS
        if (balanceOf(_msgSender()) != totalSupply()) {
            revert("Not full owner of shares");
        }

        // EFFECTS
        _burn(_msgSender(), balanceOf(_msgSender()));
        shareHoldersCount = 0;
        // INTERACTIONS
        nftContract.safeTransferFrom(address(this), _to, 0);
    }

    /// @notice Calculate updated ETH price per token
    /// @return New ETH price per token
    function _updatedETHPrice() internal view returns (uint256) {
        uint256 percentageIncrease = (BASE_ETH_PER_TOKEN * shareHoldersCount) /
            1000;
        return BASE_ETH_PER_TOKEN + percentageIncrease;
    }

    /// @notice Sweep remaining ETH to address
    /// @param to Address receiving ETH
    function sweepDust(address to) external onlyOwner {
        uint256 remainingBalance = address(this).balance;
        if (remainingBalance > 0) {
            Address.sendValue(payable(to), remainingBalance);
        }
    }

    /// @notice Get NFT metadata URI
    /// @param tokenId Token ID
    function tokenURI(uint256 tokenId) external view returns (string memory) {
        return nftContract.tokenURI(tokenId);
    }

    receive() external payable {
        revert DirectETHTransferNotAllowed();
    }

    fallback() external payable {
        revert DirectETHTransferNotAllowed();
    }

    /// @notice Handle ERC721 received
    function onERC721Received(
        address,
        address,
        uint256,
        bytes calldata
    ) external pure override returns (bytes4) {
        return IERC721Receiver.onERC721Received.selector;
    }
}
