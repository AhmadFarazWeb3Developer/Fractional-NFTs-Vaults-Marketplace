// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

// import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {VaultToken} from "./VaultToken.sol";

import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {Address} from "@openzeppelin/contracts/utils/Address.sol";
import {FractionalNFT} from "./FractionalNFT.sol";
import {IERC721Receiver} from "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import {console} from "forge-std/console.sol";

contract FractionalNftVault is
    Ownable,
    VaultToken,
    ReentrancyGuard,
    IERC721Receiver
{
    // 1 share = 1000 tokens
    // any one can create his own shares token for his NFT
    uint256 public constant MAX_SHARES = 100; //
    uint256 public constant TOKENS_PER_SHARE = 1000 * 1e18; // 1000 tokens per share
    uint256 public constant BASE_ETH_PER_TOKEN = 5e14; // 0.0005 ETH required per token = 2.15 $
    // 1000 tokens * 0.0005 ETH = 0.5 ETH for single shares

    FractionalNFT public immutable nftContract;

    error RequiredETHForTokens(uint256 passedValue, uint256 requiredValue);

    error MinimumSharesRequired(uint256 passed, uint256 minimum); // if share is less than 0.1 revert
    error MaximumSharesSurpassed(uint256 passed, uint256 maximum); // maximum share is 100
    error InsufficientShares();
    error DirectETHTransferNotAllowed();

    constructor(
        FractionalNFT _nftContract,
        address _initialOwner
    ) Ownable(_initialOwner) {
        nftContract = _nftContract;
    }

    function depositNftToVault() external onlyOwner {
        nftContract.setNftVault(address(this)); // set vault address
        nftContract.sendNftToVault(address(this)); // list token in vault
        nftContract.approve(address(this), 0); // approve vault
    }

    function buyShares(
        uint256 _numberSharesToBuy
    ) external payable nonReentrant {
        // CHECKS
        (
            uint256 requiredETH,
            uint256 numberOfRequiredTokens
        ) = _calculateSharesPrice(_numberSharesToBuy);

        // EFFECTS

        if (balanceOf(_msgSender()) == 0) {
            shareHoldersCount++;
        }
        _mint(_msgSender(), numberOfRequiredTokens);

        // INTERACTIONS
        if (msg.value < requiredETH)
            revert RequiredETHForTokens(msg.value, requiredETH);
        else if (msg.value > requiredETH) {
            uint256 excess = msg.value - requiredETH;
            Address.sendValue(payable(_msgSender()), excess);
        }
    }

    function redeemShares(uint256 _sharesToRedeem) external nonReentrant {
        // CHECKS
        uint256 requiredTokens = (_sharesToRedeem * TOKENS_PER_SHARE) / 1e18;

        if (requiredTokens > balanceOf(_msgSender())) {
            revert InsufficientShares();
        }

        uint256 totalSharesInExistence = (totalSupply() * 1e18) /
            TOKENS_PER_SHARE;

        uint256 withdrawlValue = (address(this).balance * _sharesToRedeem) /
            totalSharesInExistence;

        // EFFECTS
        _burn(_msgSender(), requiredTokens);
        if (balanceOf(_msgSender()) == 0) {
            shareHoldersCount--;
        }
        // INTERACTIONS
        Address.sendValue(payable(_msgSender()), withdrawlValue);
    }

    function _calculateSharesPrice(
        uint256 _numberSharesToBuy
    ) public view returns (uint256, uint256) {
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

        uint256 numberOfRequiredTokens = (_numberSharesToBuy *
            TOKENS_PER_SHARE) / 1e18;

        uint256 currentETHPerToken = _updatedETHPrice();

        uint256 requiredETH = (currentETHPerToken * numberOfRequiredTokens) /
            1e18;

        return (requiredETH, numberOfRequiredTokens);
    }

    /// @notice Claim NFT if caller owns 100% of shares

    function claimNftTo(address _to) external {
        //CHECKS
        if (balanceOf(_msgSender()) != totalSupply()) {
            revert("Not full owner of shares");
        }

        //EFFECTS
        _burn(_msgSender(), balanceOf(_msgSender()));

        shareHoldersCount = 0;
        nftContract.safeTransferFrom(address(this), _to, 0);
    }

    // function to update token price based on number of buy and redeem
    function _updatedETHPrice() internal view returns (uint256) {
        // 0.1% increase per user
        uint256 percentageIncrease = (BASE_ETH_PER_TOKEN * shareHoldersCount) /
            1000;
        return BASE_ETH_PER_TOKEN + percentageIncrease;
    }

    function sweepDust(address to) external onlyOwner {
        uint256 remainingBalance = address(this).balance;

        if (remainingBalance > 0) {
            Address.sendValue(payable(to), remainingBalance);
        }
    }

    function tokenURI(uint256 tokenId) external view returns (string memory) {
        return nftContract.tokenURI(tokenId);
    }

    receive() external payable {
        revert DirectETHTransferNotAllowed();
    }

    fallback() external payable {
        revert DirectETHTransferNotAllowed();
    }

    function onERC721Received(
        address,
        address,
        uint256,
        bytes calldata
    ) external pure override returns (bytes4) {
        return IERC721Receiver.onERC721Received.selector;
    }
}
