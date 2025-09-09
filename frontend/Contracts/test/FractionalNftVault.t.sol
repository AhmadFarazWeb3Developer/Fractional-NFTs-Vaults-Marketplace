// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {Utils} from "./Utils.t.sol";
import {console} from "forge-std/console.sol";

contract FractionalNftVault is Utils {
    address sharesBuyer1 = makeAddr("shares buyer 1");
    address sharesBuyer2 = makeAddr("shares buyer 2");
    address sharesBuyer3 = makeAddr("shares buyer 3");
    address sharesBuyer4 = makeAddr("shares buyer 4");

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

    function test_calculateSharesPrice() public view {
        nftVault._calculateSharesPrice(10e18); // 10 shares
        nftVault._calculateSharesPrice(5e18); // 5 shares
        nftVault._calculateSharesPrice(1e18); // 1 share
        nftVault._calculateSharesPrice(1e17); // 0.1
        nftVault._calculateSharesPrice(2e17); // 0.2
        nftVault._calculateSharesPrice(3e17); // 0.3
        nftVault._calculateSharesPrice(4e17); // 0.4

        // 10+5+1+1 = 17 shares
    }

    function test_buyShares() public {
        vm.startPrank(sharesBuyer1);
        (uint256 eth1, ) = nftVault._calculateSharesPrice(17e18); // 17 shares
        vm.deal(sharesBuyer1, eth1);
        nftVault.buyShares{value: eth1}(17e18);
        vm.stopPrank();

        vm.startPrank(sharesBuyer2);
        (uint256 eth2, ) = nftVault._calculateSharesPrice(50e18); // 20 shares
        vm.deal(sharesBuyer2, eth2);
        nftVault.buyShares{value: eth2}(50e18);
        vm.stopPrank();
        //

        vm.startPrank(sharesBuyer3);
        (uint256 eth3, ) = nftVault._calculateSharesPrice(33e18); // 33 shares
        vm.deal(sharesBuyer3, eth3);
        nftVault.buyShares{value: eth3}(33e18);
        vm.stopPrank();
    }

    function test_redeemShares() public {
        (uint256 eth1, ) = nftVault._calculateSharesPrice(17e18); // 17 shares
        (uint256 eth2, ) = nftVault._calculateSharesPrice(50e18); // 20 shares
        (uint256 eth3, ) = nftVault._calculateSharesPrice(33e18); // 33 shares

        vm.deal(sharesBuyer1, eth1);
        vm.deal(sharesBuyer2, eth2);
        vm.deal(sharesBuyer3, eth3);

        // =========  BUY SHARES  =============

        vm.startPrank(sharesBuyer1);
        nftVault.buyShares{value: eth1}(17e18);
        vm.stopPrank();

        vm.startPrank(sharesBuyer2);
        nftVault.buyShares{value: eth2}(50e18);
        vm.stopPrank();

        vm.startPrank(sharesBuyer3);
        nftVault.buyShares{value: eth3}(33e18);
        vm.stopPrank();

        // =========  REDEEM SHARES  =============

        vm.startPrank(sharesBuyer1);
        nftVault.redeemShares(17e18);
        vm.stopPrank();

        vm.startPrank(sharesBuyer2);
        nftVault.redeemShares(50e18);
        vm.stopPrank();

        vm.startPrank(sharesBuyer3);
        nftVault.redeemShares(33e18);
        vm.stopPrank();

        assertEq(address(nftVault).balance, 0);
    }

    function test_claimNftTo() public {
        vm.startPrank(nftOwner);
        nftVault.depositNftToVault();
        vm.stopPrank();

        address sharesBuyer = makeAddr("shares Buyer");
        (uint256 requiredETH, ) = nftVault._calculateSharesPrice(10e18); // 10 shares

        vm.deal(sharesBuyer, requiredETH);
        vm.startPrank(sharesBuyer);
        nftVault.buyShares{value: requiredETH}(10e18);
        nftVault.claimNftTo(sharesBuyer);
        vm.stopPrank();

        assertEq(nft.balanceOf(sharesBuyer), 1);
        assertEq(nft.balanceOf(address(nftVault)), 0);

        assertEq(nftVault.balanceOf(sharesBuyer), 0);
        assertEq(nftVault.totalSupply(), 0);

        address nftBuyer = makeAddr("NFT buyer");

        vm.startPrank(sharesBuyer);
        nftVault.nftContract().transferFrom(sharesBuyer, nftBuyer, 0); // NFT sold
        vm.stopPrank();
    }

    function test_shareHoldersCount() public {
        vm.startPrank(sharesBuyer1);
        (uint256 eth1, ) = nftVault._calculateSharesPrice(17e18); // 17 shares
        vm.deal(sharesBuyer1, eth1);
        nftVault.buyShares{value: eth1}(17e18);
        vm.stopPrank();

        vm.startPrank(sharesBuyer2);
        (uint256 eth2, ) = nftVault._calculateSharesPrice(50e18); // 20 shares
        vm.deal(sharesBuyer2, eth2);
        nftVault.buyShares{value: eth2}(50e18);
        vm.stopPrank();
        //

        vm.startPrank(sharesBuyer3);
        (uint256 eth3, ) = nftVault._calculateSharesPrice(33e18); // 33 shares
        vm.deal(sharesBuyer3, eth3);
        nftVault.buyShares{value: eth3}(33e18);
        vm.stopPrank();

        assertEq(nftVault.shareHoldersCount(), 3);
    }
}
