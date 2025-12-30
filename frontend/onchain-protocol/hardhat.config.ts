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
      url: "https://rpc-amoy.polygon.technology",
      accounts: [process.env.PRIVATE_KEY],
      chainId: 80002,
    },
  },
});

//  npx hardhat run scripts/deployProtocol.ts  --network localhost
// npx hardhat run scripts/deployProtocol.ts --network polygon_amoy
