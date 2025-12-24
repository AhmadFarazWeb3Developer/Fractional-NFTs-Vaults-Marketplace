import { Router } from "express";
import createVault from "../controllers/createVault.controller.js";

const vaultRouter = Router();

vaultRouter.post("/create-vault", createVault);

export default vaultRouter;
