import { existsSync, mkdirSync, writeFileSync } from "fs";
import { network } from "hardhat";

const { ethers, networkName, chainType } = await network.connect();

const deployProtocol = async () => {
  try {
    const [factoryOwner] = await ethers.getSigners();

    const Factory = await ethers.deployContract(
      "FractionalNFTsVaultsMarketplaceFactory",
      [factoryOwner]
    );
    await Factory.waitForDeployment();

    const factoryAddress = await Factory.getAddress();
    const ProtocolAddresses = { FactoryAddress: factoryAddress };

    const deploymentFolder = "./deployment";
    const filePath = `${deploymentFolder}/ProtocolAddress.json`;

    if (!existsSync(deploymentFolder)) {
      mkdirSync(deploymentFolder, { recursive: true });
    }
    writeFileSync(filePath, JSON.stringify(ProtocolAddresses, null, 2));
  } catch (error) {
    console.log(error);
  }
};

deployProtocol();
