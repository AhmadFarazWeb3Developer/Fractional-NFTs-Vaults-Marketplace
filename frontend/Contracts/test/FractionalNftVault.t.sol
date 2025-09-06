// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {Utils} from "./Utils.t.sol";

contract FractionalNftVault is Utils {
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

    function test_buyShares() public {
        address sharesBuyer = makeAddr("shares buyer");

        vm.startPrank(sharesBuyer);

        nftVault._calculateSharesPrice(10e18); // 10 shares
        nftVault._calculateSharesPrice(5e18); // 5 shares
        nftVault._calculateSharesPrice(1e18); // 1 share
        nftVault._calculateSharesPrice(1e17); // 0.1
        nftVault._calculateSharesPrice(2e17); // 0.2

        // nftVault.buyShares(10);

        vm.stopPrank();
    }
}
