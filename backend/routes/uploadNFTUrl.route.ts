import { Router } from "express";
import getUploadedNFTUrl from "../controllers/uploadNFTImage.controller.js";

const uploadNFTUrlRouter = Router();

uploadNFTUrlRouter.post("/uploaded-nft-url", getUploadedNFTUrl);

export default uploadNFTUrlRouter;
