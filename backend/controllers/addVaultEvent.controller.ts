import { Request, Response } from "express";
import VaultEvent from "../models/vaultEvent.js";

const addVaultEvent = async (req: Request, res: Response) => {
  try {
    const { vaultAddress, user, sharesChange, type, timestamp } = req.body;

    if (!vaultAddress || !user || !sharesChange || !type || !timestamp) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const event = new VaultEvent({
      vaultAddress,
      user,
      sharesChange,
      type,
      timestamp,
    });

    await event.save();

    return res.status(201).json({ message: "Vault event saved", event });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error", error: err });
  }
};

export default addVaultEvent;
