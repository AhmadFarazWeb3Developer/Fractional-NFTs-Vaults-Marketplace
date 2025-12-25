import { Request, Response } from "express";
import Vaults from "../models/vaults.model.js";
import mongoose from "mongoose";

const getAllVaults = async (req: Request, res: Response) => {
  try {
    const allVaults = await Vaults.find();

    return res.status(201).json(allVaults);
  } catch (error) {
    return res.status(500).json({
      error: "Error in getVaults controller",
    });
  }
};

export default getAllVaults;
