export type VaultType = {
  vaultAddress: string;
  vaultOwner: string;
  tokenURI: string;
  NFTName: string;
  NFTSymbol: string;
  totalShareHolders: string;
  soldShares: string;
  floorPrice: bigint;
  allShareholderData: ShareholdersType[];
};

export type VaultAddress = {
  vaultAddress: string;
};

export type ShareholdersType = {
  shareholder: string;
  shares: string;
};

export type UserVaultShare = {
  vaultAddress: string;
  NFTName: string;
  NFTSymbol: string;
  userShares: number;
  totalShares: number;
  ownershipPercent: number;
  status: "Active" | "Partial" | "Full Ownership";
};
