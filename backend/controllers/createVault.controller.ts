import { Request, Response } from "express";
import Vaults from "../models/vaults.model.js";

const createVault = async (req: Request, res: Response) => {
  try {
    const { vaultAddress } = req.body;
    if (!vaultAddress) {
      return res.status(400).json({ error: "Vault address required!" });
    }
    const newVault = new Vaults({ vaultAddress });
    const savedNewVault = newVault.save();

    return res.status(201).json(savedNewVault);
  } catch (error: any) {
    return res
      .status(500)
      .json({ error: "Error in createVault controller", details: error });
  }
};

export default createVault;
