// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test} from "forge-std/Test.sol";
import {Utils} from "./Utils.t.sol";
import {FractionalNftVault} from "../src/FractionalNftVault.sol";

contract FactoryTest is Utils {
    address vault1Owner = makeAddr("vault 1 owner");
    address vault2Owner = makeAddr("vault 2 owner");
    address vault3Owner = makeAddr("vault 3 owner");

    address sharesBuyer1 = makeAddr("shares buyer 1");
    address sharesBuyer2 = makeAddr("shares buyer 2");
    address sharesBuyer3 = makeAddr("shares buyer 3");

    function setUp() public override {
        super.setUp();
    }

    function test_createNftVault() public {
        factory.createNftVault("Fractional Borad Ape", "fBA");
    }

    function test_vaults() public {
        vm.startPrank(vault1Owner);
        factory.createNftVault("Fractional Borad Ape", "fBA");
        vm.stopPrank();

        vm.startPrank(vault2Owner);
        factory.createNftVault("Fractional Cute kitties", "fCK");
        vm.stopPrank();

        vm.startPrank(vault3Owner);
        factory.createNftVault("Fractional Alpha Lizards", "fAL");
        vm.stopPrank();
    }

    function test_sendNftToVaultViaFactory() public {
        vm.startPrank(vault1Owner);

        address vault = factory.createNftVault("Fractional Borad Ape", "fBA");

        FractionalNftVault vaultInterface = createVaultInterface(vault);

        vaultInterface.depositNftToVault();

        vm.stopPrank();
    }

    function test_duplicateNft() public {
        vm.startPrank(vault1Owner);
        factory.createNftVault("Fractional Borad Ape", "fBA");
        vm.expectRevert();
        factory.createNftVault("Fractional Borad Ape", "fBA"); // both are same
        vm.expectRevert();
        factory.createNftVault("Fractional Borad", "fBA"); // one is same
        vm.expectRevert();
        factory.createNftVault("Fractional Borad Ape", "fBAs"); // one is same
        vm.stopPrank();
    }

    function test_factoryRevenue() public {
        (uint256 eth1, ) = vaultInterface._calculateSharesPrice(20e18); // 20 shares
        (uint256 eth2, ) = vaultInterface._calculateSharesPrice(50e18); // 50 shares

        vm.deal(sharesBuyer1, eth1);
        vm.deal(sharesBuyer2, eth2);

        // ========= Create NFT Vault =========
        vm.startPrank(vault1Owner);
        address vault = factory.createNftVault("Fractional Borad Ape", "fBA");
        FractionalNftVault vaultInterface = createVaultInterface(vault);
        vaultInterface.depositNftToVault();
        vm.stopPrank();

        // =========  BUY SHARES  =============

        vm.startPrank(sharesBuyer1);
        vaultInterface.buyShares{value: eth1}(20e18);
        vm.stopPrank();

        vm.startPrank(sharesBuyer2);
        vaultInterface.buyShares{value: eth2}(50e18);
        vm.stopPrank();

        // ========= REDEEM SHARES ============

        vm.startPrank(sharesBuyer1);
        vaultInterface.redeemShares(17e18);
        vm.stopPrank();

        vm.startPrank(sharesBuyer2);
        vaultInterface.redeemShares(50e18);
        vm.stopPrank();
    }

    function createVaultInterface(
        address _vault
    ) internal returns (FractionalNftVault) {
        FractionalNftVault vaultInterface = FractionalNftVault(payable(_vault));
        return vaultInterface;
    }
}
