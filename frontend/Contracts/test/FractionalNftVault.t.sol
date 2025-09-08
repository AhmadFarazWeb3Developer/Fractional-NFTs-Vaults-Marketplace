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
        address sharesBuyer1 = makeAddr("shares buyer 1");
        address sharesBuyer2 = makeAddr("shares buyer 2");
        address sharesBuyer3 = makeAddr("shares buyer 3");

        vm.startPrank(sharesBuyer1);
        nftVault._calculateSharesPrice(10e18); // 10 shares
        nftVault._calculateSharesPrice(5e18); // 5 shares
        nftVault._calculateSharesPrice(1e18); // 1 share
        nftVault._calculateSharesPrice(1e17); // 0.1
        nftVault._calculateSharesPrice(2e17); // 0.2
        nftVault._calculateSharesPrice(3e17); // 0.3
        nftVault._calculateSharesPrice(4e17); // 0.4
        vm.stopPrank();

        // 10+5+1+1 = 17 shares

        vm.startPrank(sharesBuyer2);
        nftVault._calculateSharesPrice(20e18); // 20 shares
        nftVault._calculateSharesPrice(30e18); // 30 shares
        vm.stopPrank();
        // 20+30 = 50 shares

        vm.startPrank(sharesBuyer3);
        nftVault._calculateSharesPrice(33e18); // 33 shares
        // 17+50+33
        vm.stopPrank();
    }

    function test_buyShares() public {
        (uint256 requiredETH, ) = nftVault._calculateSharesPrice(17e18); // 17 share
        vm.deal(sharesBuyer, requiredETH);

        vm.startPrank(sharesBuyer);
        nftVault.buyShares{value: requiredETH}(17e18);
        vm.stopPrank();

        assertEq(nftVault.balanceOf(sharesBuyer), 17e18 * 1000);
        assertEq(address(nftVault).balance, requiredETH);
    }

    function test_redeemShares() public {
        (uint256 requiredETH, ) = nftVault._calculateSharesPrice(17e18);
        vm.deal(sharesBuyer, requiredETH);

        vm.startPrank(sharesBuyer);
        nftVault.buyShares{value: requiredETH}(17e18);

        nftVault.redeemShares(10e18); // 10 shares

        console.log(address(nftVault).balance);
    }
}
