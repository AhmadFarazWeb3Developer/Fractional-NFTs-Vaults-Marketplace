import { formatEther, parseUnits } from "ethers";
// import { decodeError } from "./helpers/decodeError";
import { DecodedError, ErrorDecoder } from "ethers-decode-error";

import { useState } from "react";
import { toast } from "sonner";
import type { Contract, Log, LogDescription } from "ethers";
import useVaultInstance from "./helpers/vaultInstance";
import abis from "./helpers/abi";
import customErrorsInterface from "./helpers/customErrorsInterface";

const { factoryAbi, fractionalNftVaultAbi, vaultTokenAbi, fractionalNFTAbi } =
  abis();

const errorDecoder = ErrorDecoder.create([
  factoryAbi,
  fractionalNftVaultAbi,
  vaultTokenAbi,
  fractionalNFTAbi,
]);

const useBuyShares = () => {
  const [loading, setLoading] = useState(false);

  const { getVaultInstance } = useVaultInstance();

  let instance: Contract;
  const buyShares = async (
    numberOfSharesToBuy: string,
    vaultAddress: string
  ) => {
    try {
      setLoading(true);

      const vaultInstance = await getVaultInstance(vaultAddress);
      const vault = vaultInstance?.vaultInstance;
      instance = vault;

      const sharesToBuy = parseUnits(numberOfSharesToBuy, 18);

      const [requiredETH] = await vault._calculateSharesPrice(sharesToBuy);

      const tx = await vault.buyShares(sharesToBuy, {
        value: requiredETH,
      });

      const receipt = await tx.wait();

      const iface = vault.interface;

      const parsedLog: LogDescription | null =
        receipt.logs
          .map((log: Log): LogDescription | null => {
            try {
              return iface.parseLog(log);
            } catch {
              return null;
            }
          })
          .find((e: LogDescription) => e?.name === "SharesBought") ?? null;

      if (parsedLog) {
        const vault = parsedLog.args.vault;
        const buyer = parsedLog.args.buyer;
        const shares = parsedLog.args.shares.toString();
        const timestamp = parsedLog.args.timestamp.toNumber
          ? parsedLog.args.timestamp.toNumber()
          : Number(parsedLog.args.timestamp);

        await fetch(`${import.meta.env.VITE_SERVER_URL_V1}/vault-event`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            vaultAddress: vault,
            user: buyer,
            sharesChange: shares,
            type: "buy",
            timestamp,
          }),
        });
      }

      if (receipt) {
        toast.success(
          `You bought ${numberOfSharesToBuy} Shares for ${formatEther(
            requiredETH
          )} ETH`
        );
        return true;
      }
    } catch (error: any) {
      console.log(error);

      const {
        reason,
        type,
        data,
        args,
        name,
        selector,
        signature,
        fragment,
      }: DecodedError = await errorDecoder.decode(error);

      // console.log(reason);
      console.log(type);
      // console.log(data);
      // console.log(args);
      // console.log(name);
      // console.log(selector);
      // console.log(signature);
      // console.log(fragment);

      const decodedError: DecodedError = await errorDecoder.decode(error);

      console.log(decodedError);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return { buyShares, loading };
};

export default useBuyShares;
