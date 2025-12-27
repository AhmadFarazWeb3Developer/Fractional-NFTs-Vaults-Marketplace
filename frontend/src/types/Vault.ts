export type VaultType = {
  vaultAddress: string;
  vaultOwner: string;
  tokenURI: string;
  NFTName: string;
  NFTSymbol: string;
  totalShareHolders: string;
  soldShares: string;
  floorPrice: bigint;
  allShareholderData: shareholdersType[];
};

export type VaultAddress = {
  vaultAddress: string;
};

export type shareholdersType = {
  shareholder: string;
  shares: string;
};
