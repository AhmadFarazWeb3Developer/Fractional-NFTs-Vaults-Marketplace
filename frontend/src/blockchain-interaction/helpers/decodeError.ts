import { toast } from "sonner";
import abis from "./abi";
import { DecodedError, ErrorDecoder } from "ethers-decode-error";

const { factoryAbi, fractionalNftVaultAbi, vaultTokenAbi, fractionalNFTAbi } =
  abis();

const decodeError = async (err: any) => {
  const errorDecoder = ErrorDecoder.create([
    factoryAbi,
    fractionalNftVaultAbi,
    vaultTokenAbi,
    fractionalNFTAbi,
  ]);

  console.log(err);
  const decodedError: DecodedError = await errorDecoder.decode(err);

  toast.error(decodedError.reason);

  return;
};
export default decodeError;
