import { Request, Response } from "express";
import VaultEvent from "../models/vaultEvent.js";

const getVaultEvents = async (req: Request, res: Response) => {
  try {
    const { vaultAddress } = req.params;
    if (!vaultAddress)
      return res.status(400).json({ message: "Vault address required" });

    const events = await VaultEvent.find({ vaultAddress }).sort({
      timestamp: 1,
    });

    return res.status(200).json(events);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error", error: err });
  }
};

export default getVaultEvents;
