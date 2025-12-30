import Deployment from "../../../onchain-protocol/deployment/protocolAddresses.json";

type Deployments = Record<string, { [key: string]: any }>;
const deployments = Deployment as Deployments;

const getAddressesByChainId = (chainId: number) => {
  const addresses = deployments[chainId];
  return { factoryAddress: addresses.FactoryAddress };
};
export default getAddressesByChainId;
