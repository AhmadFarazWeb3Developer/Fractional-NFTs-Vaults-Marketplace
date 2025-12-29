import express from "express";
import addVaultEvent from "../controllers/addVaultEvent.controller.js";
import getVaultEvents from "../controllers/getVaultEvents.controller.js";

const vaultEventsRouter = express.Router();

vaultEventsRouter.post("/vault-event", addVaultEvent);

vaultEventsRouter.get("/vault-events/:vaultAddress", getVaultEvents);

export default vaultEventsRouter;
