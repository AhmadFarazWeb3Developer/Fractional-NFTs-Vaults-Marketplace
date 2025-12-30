import { useState } from "react";
import { decodeError } from "./helpers/decodeError";
import { toast } from "sonner";
import { Contract, parseUnits, Log, LogDescription } from "ethers";
import abis from "./helpers/abi";
import useSigner from "./helpers/useSigner";

type SharesRedeemedEvent = {
  vault: string;
  seller: string;
  shares: string;
  type: string;
  timestamp: string;
};

const useWithdrawShares = () => {
  const [loading, setLoading] = useState(false);
  const { getSigner } = useSigner();

  const withdrawShares = async (
    numberOfSharesToWithdraw: string,
    vaultAddress: string
  ) => {
    try {
      setLoading(true);

      const { signer } = await getSigner();
      const { fractionalNftVaultAbi } = abis();

      const vaultInstance = new Contract(
        vaultAddress,
        fractionalNftVaultAbi,
        signer
      );

      const shares = parseUnits(numberOfSharesToWithdraw, 18);

      const tx = await vaultInstance.redeemShares(shares);
      const receipt = await tx.wait();

      const iface = vaultInstance.interface;

      const parsedLogs: LogDescription[] = receipt.logs

        .map((log: Log): LogDescription | null => {
          try {
            return iface.parseLog(log);
          } catch {
            return null;
          }
        })
        .filter((e: LogDescription): e is LogDescription => e !== null);

      const redeemedEvent = parsedLogs.find((e) => e.name === "SharesRedeemed");

      if (redeemedEvent) {
        const eventData: SharesRedeemedEvent = {
          vault: redeemedEvent.args.vault,
          seller: redeemedEvent.args.seller,
          shares: redeemedEvent.args.shares.toString(),
          type: "sell",
          timestamp: redeemedEvent.args.timestamp.toString(),
        };

        await fetch(`${import.meta.env.VITE_SERVER_URL_V1}/vault-event`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(eventData),
        });
      }

      if (receipt) {
        toast.success(`You sold ${numberOfSharesToWithdraw} Shares`);
        return true;
      }
    } catch (error) {
      decodeError(error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { withdrawShares, loading };
};

export default useWithdrawShares;
