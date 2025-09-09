// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test} from "forge-std/Test.sol";
import {Utils} from "./Utils.t.sol";
import {FractionalNftVault} from "../src/FractionalNftVault.sol";

contract FactoryTest is Utils {
    address vault1Owner = makeAddr("vault 1 owner");
    address vault2Owner = makeAddr("vault 2 owner");
    address vault3Owner = makeAddr("vault 3 owner");

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
        FractionalNftVault vaultInterface = FractionalNftVault(payable(vault));
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
}
