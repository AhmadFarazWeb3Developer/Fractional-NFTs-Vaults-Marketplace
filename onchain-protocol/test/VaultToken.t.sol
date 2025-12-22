 // =========== UNCOMMENT FOR TESTING  ==============

/* 

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {Utils} from "./Utils.t.sol";

contract VaultTokenTest is Utils {
    address minter = makeAddr("minter");

    function setUp() public override {
        super.setUp();
        vaultToken.mint(minter, 1000 ether); //  1M supply
    }

    function test_transfer() public {
        address firstRecepient = makeAddr("first recepient");
        address secondRecepient = makeAddr("second recepient");

        vm.startPrank(minter);
        vaultToken.transfer(firstRecepient, 500 ether);
        vaultToken.transfer(secondRecepient, 500 ether);
        vm.stopPrank();

        assertEq(vaultToken.balanceOf(minter), 0);
        assertEq(vaultToken.shareHoldersCount(), 2);

        vm.startPrank(secondRecepient);
        vaultToken.transfer(firstRecepient, 250 ether); // 500+250

        vaultToken.transfer(minter, 250 ether); // 0 + 250

        assertEq(vaultToken.shareHoldersCount(), 2);
        assertEq(vaultToken.balanceOf(secondRecepient), 0);
        assertEq(vaultToken.shareHoldersCount(), 2);

        vm.stopPrank();
    }

    function test_transferFrom() public {
        // OPERATORS
        address firstOperator = makeAddr("first Operator");
        address secondOperator = makeAddr("second Operator");

        // RECEPIENTS
        address firstRecepient = makeAddr("first recepient");
        address secondRecepient = makeAddr("second recepient");

        vm.startPrank(minter);
        vaultToken.approve(firstOperator, 250 ether);
        vaultToken.approve(secondOperator, 250 ether);
        vm.stopPrank();

        vm.startPrank(firstOperator);
        vaultToken.transferFrom(minter, firstRecepient, 250 ether);
        vm.stopPrank();

        vm.startPrank(secondOperator);
        vaultToken.transferFrom(minter, secondRecepient, 250 ether);
        vm.stopPrank();

        vm.startPrank(firstRecepient);
        vaultToken.transfer(firstOperator, 150 ether);
        vm.stopPrank();

        assertEq(vaultToken.shareHoldersCount(), 4);
    }
}






*/
