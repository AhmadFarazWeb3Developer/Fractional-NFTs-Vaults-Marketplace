import { Interface } from "ethers";

const customErrorsInterface = new Interface([
  "error NftNameOrSymbolExits()",
  "error NotCalledByVault(address calledBy)",
  "error InvalidVault(address vault)",
  "error RequiredETHForTokens(uint256 passedValue, uint256 requiredValue)",
  "error MinimumSharesRequired(uint256 passed, uint256 minimum)",
  "error MaximumSharesSurpassed(uint256 passed, uint256 maximum)",
  "error InsufficientShares()",
  "error DirectETHTransferNotAllowed()",
]);

export default customErrorsInterface;
