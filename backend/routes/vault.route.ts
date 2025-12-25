import { Router } from "express";
import createVault from "../controllers/createVault.controller.js";
import getAllVaults from "../controllers/getAllVaults.controller.js";

const vaultRouter = Router();

vaultRouter.post("/create-vault", createVault);
vaultRouter.get("/get-all-vaults", getAllVaults);

export default vaultRouter;
