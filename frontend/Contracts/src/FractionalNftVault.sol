// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {FractionalNFT} from "./FractionalNFT.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {IERC721Receiver} from "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";

contract FractionalNftVault is Ownable, ERC20, IERC721Receiver {
    // 1 share = 1000 tokens
    // any one can create his own shares token for his NFT

    uint256 public constant TOKENS_PER_SHARE = 1000; // 1000 tokens per share
    uint256 public constant ETH_PER_TOKEN = 5e14; // 0.0005 ETH required per token = 2.15 $

    mapping(address => uint256) public depositedETH;
    mapping(address => uint256) public shares;

    FractionalNFT nftContract;

    error RequiredETHForTokens(uint256 passedValue, uint256 requiredValue);
    error YouHaveNoShares();
    error EthWithdrawlFailed();

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
    function buyShares(uint256 _numberOfShares) external payable {
        uint256 numberOfRequiredTokens = _calculateSharesPrice(_numberOfShares);
        uint256 requiredETH = ETH_PER_TOKEN * numberOfRequiredTokens;

        if (msg.value < requiredETH)
            revert RequiredETHForTokens(msg.value, requiredETH);

        shares[_msgSender()] += _numberOfShares;
        _mint(_msgSender(), numberOfRequiredTokens);
        //         10 shares * 1000 tokens = requiredTokens
        //         0.0005 * 10000 requiredTokens = requiredETH
        //         msg.value =>requiredETH
        // mint 100000 tokens == 10 shares
        // 1 share = 1000 tokens
        // 1 token price = 0.0005   ETH -------->  some how 2 $
        // how much deceimal points can be of a single share ?
        // only one decimal place is accepted like 0.1 ... 0.9 ..... the 1 .... 100;
    }

    // lets reedem All shares
    function reedemShares() external payable {
        uint256 numberOfTokens = balanceOf(_msgSender());
        uint256 numberOfShares = shares[_msgSender()];

        if (numberOfShares == 0 || numberOfTokens == 0) {
            revert YouHaveNoShares();
        }

        uint256 tokensToBeBurned = _calculateSharesPrice(numberOfShares);

        uint256 withdrawlValue = ETH_PER_TOKEN * tokensToBeBurned;

        (bool success, ) = payable(_msgSender()).call{value: withdrawlValue}(
            ""
        );
        if (!success) {
            revert EthWithdrawlFailed();
        } else {
            depositedETH[_msgSender()] = 0;
            _burn(_msgSender(), balanceOf(_msgSender()));
        }
    }

    function _calculateSharesPrice(
        uint256 _numberOfShares
    ) internal returns (uint256) {
        uint256 numberOfRequiredTokens = _numberOfShares * TOKENS_PER_SHARE;
        return numberOfRequiredTokens;
    }

    function tokenURI(uint256 tokenId) external view returns (string memory) {
        return nftContract.tokenURI(tokenId);
    }

    receive() external payable {
        depositedETH[_msgSender()] = msg.value;
    }

    function onERC721Received(
        address operator,
        address from,
        uint256 tokenId,
        bytes calldata data
    ) external override returns (bytes4) {
        return IERC721Receiver.onERC721Received.selector;
    }
}
