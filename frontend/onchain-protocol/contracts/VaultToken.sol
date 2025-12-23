// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// REMOVE ABSTRACT KEYWORD FOR TESTING THE vaultToken

/// @title VaultToken
/// @notice ERC20 token tracking unique shareholders.
abstract contract VaultToken is ERC20 {
    /// @notice Number of shareholders.
    uint256 public shareHoldersCount = 0;

    /// @notice Emitted when shareholder count changes.
    /// @param For Address affected.
    /// @param Vaule New shareholder count.
    event ShareHoldersCountUpdated(address indexed For, uint256 indexed Vaule);

    /// @dev ERC20 init with fixed name/symbol.
    constructor() ERC20("Vault Token", "VT") {}

    /// @notice Transfer tokens.
    /// @param to Recipient.
    /// @param value Amount.
    function transfer(
        address to,
        uint256 value
    ) public override returns (bool) {
        address owner = _msgSender();

        _updateShareHoldersCount(owner, to, value);
        _transfer(owner, to, value);
        return true;
    }

    /// @notice Transfer tokens on behalf.
    /// @param from Sender.
    /// @param to Recipient.
    /// @param value Amount.
    function transferFrom(
        address from,
        address to,
        uint256 value
    ) public override returns (bool) {
        address spender = _msgSender();

        _updateShareHoldersCount(from, to, value);
        _spendAllowance(from, spender, value);
        _transfer(from, to, value);
        return true;
    }

    /// @dev Updates shareholder count.
    /// @param _from Sender.
    /// @param _to Recipient.
    /// @param _value Amount.
    function _updateShareHoldersCount(
        address _from,
        address _to,
        uint256 _value
    ) internal {
        uint256 fromBalance = balanceOf(_from);
        uint256 toBalance = balanceOf(_to);

        require(_value != 0, "Can't send 0 tokens");
        require(_value <= fromBalance, "Insufficient balance");

        uint256 fromBalanceAfter = fromBalance - _value;
        uint256 toBalanceAfter = toBalance + _value;

        if (toBalance == 0 && toBalanceAfter > 0) {
            shareHoldersCount++;
            emit ShareHoldersCountUpdated(_to, shareHoldersCount);
        }

        if (fromBalance > 0 && fromBalanceAfter == 0) {
            shareHoldersCount--;
            emit ShareHoldersCountUpdated(_from, shareHoldersCount);
        }
    }

    // /// @notice Mint tokens (testing).
    // /// @param _to Recipient.
    // /// @param _value Amount.
    // function mint(address _to, uint256 _value) public {
    //     uint256 currentBalance = balanceOf(_to);
    //     _mint(_to, _value);

    //     if (currentBalance == 0 && _value > 0) {
    //         shareHoldersCount++;
    //         emit ShareHoldersCountUpdated(_to, shareHoldersCount);
    //     }
    // }
}
