import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { network, config } from "hardhat";

const { ethers } = await network.connect("polygon_amoy");

type Deployments = Record<string, { [key: string]: any }>;

const deployProtocol = async () => {
  try {
    config.networks;
    const [factoryOwner] = await ethers.getSigners();
    const FractionalNFTsVaultsMarketplaceFactory =
      await ethers.getContractFactory("FractionalNFTsVaultsMarketplaceFactory");
    const Factory = await FractionalNFTsVaultsMarketplaceFactory.deploy(
      factoryOwner
    );

    await Factory.waitForDeployment();

    const factoryAddress = await Factory.getAddress();
    const protocolAddresses = { FactoryAddress: factoryAddress };

    const deploymentFolder = "./deployment";
    const filePath = `${deploymentFolder}/protocolAddresses.json`;
    let allDeployments: Deployments = {};

    if (!existsSync(deploymentFolder)) {
      mkdirSync(deploymentFolder, { recursive: true });
    }
    if (existsSync(filePath)) {
      allDeployments = JSON.parse(readFileSync(filePath, "utf-8"));
    }

    const net = await ethers.provider.getNetwork();
    const chainId: string = net.chainId.toString();

    allDeployments[chainId] = {
      ...protocolAddresses,
    };

    writeFileSync(filePath, JSON.stringify(allDeployments, null, 2));
  } catch (error) {
    console.log(error);
  }
};

deployProtocol();
