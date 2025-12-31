import { useState } from "react";

import { toast } from "sonner";
import { parseUnits, Log, LogDescription } from "ethers";

import useVaultInstance from "./helpers/vaultInstance";
import decodeError from "./helpers/decodeError";

type SharesRedeemedEvent = {
  vaultAddress: string;
  user: string;
  sharesChange: string;
  type: string;
  timestamp: string;
};

const useWithdrawShares = () => {
  const [loading, setLoading] = useState(false);

  const { getVaultInstance } = useVaultInstance();

  const withdrawShares = async (
    numberOfSharesToWithdraw: string,
    vaultAddress: string
  ) => {
    try {
      setLoading(true);

      const vaultInstance = await getVaultInstance(vaultAddress);
      const vault = vaultInstance.vaultInstance;

      const shares = parseUnits(numberOfSharesToWithdraw, 18);

      const tx = await vault.redeemShares(shares);
      const receipt = await tx.wait();

      const iface = vault.interface;

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
          vaultAddress: redeemedEvent.args.vault,
          user: redeemedEvent.args.seller,
          sharesChange: redeemedEvent.args.shares.toString(),
          type: "redeem",
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
      await decodeError(error);

      return false;
    } finally {
      setLoading(false);
    }
  };

  return { withdrawShares, loading };
};

export default useWithdrawShares;
