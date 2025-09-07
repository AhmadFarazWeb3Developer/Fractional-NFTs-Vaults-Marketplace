// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {Utils} from "./Utils.t.sol";
import {console} from "forge-std/console.sol";

contract FractionalNftVault is Utils {
    address sharesBuyer = makeAddr("shares buyer");

    function setUp() public override {
        super.setUp();
    }

    modifier onlyNftOwner() {
        vm.startPrank(nftOwner);
        _;
    }
    function test_depositNftToVault() public onlyNftOwner {
        nftVault.depositNftToVault();

        assertEq(nft.balanceOf(address(nftVault)), 1);
        assertEq(nft.balanceOf(nftOwner), 0);
    }

    function test_tokenURI() public onlyNftOwner {
        nftVault.depositNftToVault();

        assertEq(nftVault.tokenURI(0), nft.tokenURI(0));
    }

    function test_calculateSharesPrice() public {
        vm.startPrank(sharesBuyer);

        nftVault._calculateSharesPrice(10e18); // 10 shares
        nftVault._calculateSharesPrice(5e18); // 5 shares
        nftVault._calculateSharesPrice(1e18); // 1 share
        nftVault._calculateSharesPrice(1e17); // 0.1
        nftVault._calculateSharesPrice(2e17); // 0.2

        vm.stopPrank();
    }

    function test_buyShares() public {
        (uint256 requiredETH, ) = nftVault._calculateSharesPrice(1e18); // 1 share
        vm.deal(sharesBuyer, requiredETH);

        vm.startPrank(sharesBuyer);
        nftVault.buyShares{value: requiredETH}(1e18);
        vm.stopPrank();

        nftVault.balanceOf(sharesBuyer);
        assertEq(nftVault.balanceOf(sharesBuyer), 1000e18); // 1 share == 1000 tokens
        assertEq(nftVault.shares(sharesBuyer), 1e18);
        assertEq(nftVault.totalShares(), 1e18);
        assertEq(address(nftVault).balance, (1000e18 * 5e14) / 1e18);
    }

    function test_redeemShares() public {
        (uint256 requiredETH, ) = nftVault._calculateSharesPrice(1e18); // 1 share
        vm.deal(sharesBuyer, requiredETH);

        vm.startPrank(sharesBuyer);
        nftVault.buyShares{value: requiredETH}(1e18);

        nftVault.redeemShares();

        assertEq(address(nftVault).balance, 0);
        assertEq(address(sharesBuyer).balance, 0.5 ether);
        assertEq(nftVault.shares(sharesBuyer), 0);
        assertEq(nftVault.depositedETH(sharesBuyer), 0);
    }
}
