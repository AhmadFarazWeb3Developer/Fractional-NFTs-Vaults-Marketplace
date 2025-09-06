// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {FractionalNFT} from "./FractionalNFT.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {IERC721Receiver} from "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";

contract FractionalNftVault is Ownable, ERC20, IERC721Receiver {
    // 1 share = 1000 tokens
    // any one can create his own shares token for his NFT
    uint256 public constant MAX_SHARES = 100; //
    uint256 public constant TOKENS_PER_SHARE = 1000 * 1e18; // 1000 tokens per share
    uint256 public constant ETH_PER_TOKEN = 5e14; // 0.0005 ETH required per token = 2.15 $
    // 1000 tokens * 0.0005 ETH = 0.5 ETH for single shares

    uint256 public totalShares = 0;

    mapping(address => uint256) public depositedETH;
    mapping(address => uint256) public shares;

    FractionalNFT nftContract;

    error RequiredETHForTokens(uint256 passedValue, uint256 requiredValue);
    error YouHaveNoShares();
    error EthWithdrawlFailed();
    error MinimumSharesRequired(uint256 passed, uint256 minimum); // if share is less than 0.1 revert
    error MaximumSharesSurpassed(uint256 passed, uint256 maximum); // maximum share is 100

    constructor(
        FractionalNFT _nftContract,
        address _initialOwner,
        string memory _tokenName,
        string memory _tokenSymbol,
        uint256 _initialSupply
    ) ERC20(_tokenName, _tokenSymbol) Ownable(_initialOwner) {
        nftContract = _nftContract;
        _mint(address(this), _initialSupply); // number of tokens minted
    }

    function depositNftToVault() external onlyOwner {
        nftContract.setNftVault(address(this)); // set vault address
        nftContract.sendNftToVault(address(this));
    }

    // assume only 100 shares are allowed
    function buyShares(uint256 _numberSharesToBuy) external payable {
        (
            uint256 requiredETH,
            uint256 numberOfRequiredTokens
        ) = _calculateSharesPrice(_numberSharesToBuy);

        if (msg.value < requiredETH)
            revert RequiredETHForTokens(msg.value, requiredETH);

        shares[_msgSender()] += _numberSharesToBuy;
        totalShares += _numberSharesToBuy;
        _mint(_msgSender(), numberOfRequiredTokens);
    }

    // lets reedem All shares
    function redeemShares() external payable {
        uint256 numberOfTokens = balanceOf(_msgSender());
        uint256 numberOfShares = shares[_msgSender()];

        if (numberOfShares == 0 || numberOfTokens == 0) {
            revert YouHaveNoShares();
        }

        uint256 withdrawlValue = ETH_PER_TOKEN * (numberOfTokens / 1e18);

        (bool success, ) = payable(_msgSender()).call{value: withdrawlValue}(
            ""
        );

        if (!success) {
            revert EthWithdrawlFailed();
        } else {
            depositedETH[_msgSender()] = 0;
            totalShares -= numberOfShares;
            _burn(_msgSender(), balanceOf(_msgSender()));
        }
    }

    function _calculateSharesPrice(
        uint256 _numberSharesToBuy
    ) public view returns (uint256, uint256) {
        uint256 maxShareScaled = MAX_SHARES * 1e18;

        if (_numberSharesToBuy < 1e17) {
            revert MinimumSharesRequired(_numberSharesToBuy, 1e17);
        } else if ((totalShares + _numberSharesToBuy) > maxShareScaled) {
            // no more than 100 shares

            uint256 availableShares = maxShareScaled - totalShares;
            revert MaximumSharesSurpassed(availableShares, _numberSharesToBuy);
        }

        uint256 numberOfRequiredTokens = _numberSharesToBuy *
            (TOKENS_PER_SHARE / 1e18);
        uint256 requiredETH = ETH_PER_TOKEN * (numberOfRequiredTokens / 1e18);

        return (requiredETH, numberOfRequiredTokens);
    }

    function tokenURI(uint256 tokenId) external view returns (string memory) {
        return nftContract.tokenURI(tokenId);
    }

    receive() external payable {
        depositedETH[_msgSender()] = msg.value;
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

// what someone sell his shares ?
// what is someone hold the tokens but address it not in the mapping ?
// how to burn shares dynamically ?

// how to changes shares prices on the basis of demand and supply ?
// how to allow someone with flexiable shares passing  or allow some to updates the shares fraction ?
