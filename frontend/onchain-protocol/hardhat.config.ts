import hardhatToolboxMochaEthersPlugin from "@nomicfoundation/hardhat-toolbox-mocha-ethers";
import { defineConfig } from "hardhat/config";
import dotenv from "dotenv";
dotenv.config();

if (!process.env.PRIVATE_KEY) {
  throw new Error("PRIVATE_KEY not set");
}

export default defineConfig({
  plugins: [hardhatToolboxMochaEthersPlugin],

  solidity: {
    compilers: [
      {
        version: "0.8.30",
        settings: { optimizer: { enabled: true, runs: 200 } },
      },
    ],
  },

  networks: {
    localhost: {
      type: "http",
      chainId: 31337,
      url: "http://127.0.0.1:8545/",
    },
    polygon_amoy: {
      type: "http",
      chainType: "l1",
      url: `https://polygon-amoy.g.alchemy.com/v2/${process.env.ALCHEMY_RPC_API_KEY}`,
      accounts: [process.env.PRIVATE_KEY],
      chainId: 80002,
    },
    avalanche_fuji: {
      type: "http",
      chainType: "l1",
      url: `https://avax-fuji.g.alchemy.com/v2/${process.env.ALCHEMY_RPC_API_KEY}`,
      accounts: [process.env.PRIVATE_KEY],
      chainId: 43113,
    },
    bnb_smart_chain: {
      type: "http",
      chainType: "l1",
      url: `https://bnb-testnet.g.alchemy.com/v2/${process.env.ALCHEMY_RPC_API_KEY}`,
      accounts: [process.env.PRIVATE_KEY],
      chainId: 97,
    },
    arbitrum_sepolia: {
      type: "http",
      url: `https://arb-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_RPC_API_KEY}`,
      accounts: [process.env.PRIVATE_KEY],
      chainId: 421614,
    },
  },
});

// npx hardhat run scripts/deployProtocol.ts --network localhost
// npx hardhat run scripts/deployProtocol.ts --network polygon_amoy // anomy public provider is slow
// npx hardhat run scripts/deployProtocol.ts --network avalanche_fuji // very cheap
// npx hardhat run scripts/deployProtocol.ts --network bnb_smart_chain // not deployed fails
// npx hardhat run scripts/deployProtocol.ts --network arbitrum_sepolia
