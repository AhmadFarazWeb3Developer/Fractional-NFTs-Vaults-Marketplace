# Fractional NFTs Vaults Marketplace

![alt](/readme-images/Homepage.png)

**Description:**
Fractional NFTs Vaults Marketplace is a protocol where each vault represents a single NFT. Users can invest in these vaults by purchasing fractional shares of the NFT stored inside. This makes it possible for multiple investors to collectively own and benefit from high-value NFTs that may otherwise be too expensive to purchase individually. By holding shares, users can trade, redeem, or collectively profit from the underlying NFT.

## Working

1. **Factory:** Tracks the vaults.
2. **Vault Creator:** Creates a vault for an NFT and deposits the NFT into it.
3. **User:** Users can buy shares in any of the vaults.

## Revenue Model

1. **For Share Buyers:**

   - On each purchase of shares, the vault token price increases by `0.1%`.
   - Users can withdraw their shares at any time and take advantage of the increased value from more shareholders.
   - The more shareholders there are, the higher the profit potential.
   - A smaller number of shares with more holders will benefit early buyers more.
   - If someone holds 100% of the shares at any time, they can withdraw the NFT.
   - Maximum shares are `100`.

2. **For Marketplace Owner:**

   - On each share sale by a user, the marketplace takes a `0.3%` cut from the ETH that the user withdraws.

### Scope

`/Contracts/src`

- `/Factory.sol`
- `/FractionalNFT.sol`
- `/FractionalNFTVault.sol`
- `/VaultToken.sol`

### Testing

- Foundry

### Audit

- Manual audit with proper CEI, ownership, and reentrancy checks.
- Automatic tool: Slither
