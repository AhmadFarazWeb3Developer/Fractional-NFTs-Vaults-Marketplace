import hardhatToolboxMochaEthersPlugin from "@nomicfoundation/hardhat-toolbox-mocha-ethers";
import { defineConfig } from "hardhat/config";

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
  },
});

//  npx hardhat run scripts/deployProtocol.ts  --network localhost
