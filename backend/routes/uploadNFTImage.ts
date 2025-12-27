import { Router } from "express";
import uploadNFTImage from "../controllers/uploadNFTImage.controller.js";
import multer from "multer";

const uploadNFTImageRouter = Router();
const uploadNftImage = multer({ storage: multer.memoryStorage() });

uploadNFTImageRouter.post(
  "/upload-nft-image",
  uploadNftImage.single("nftImage"),
  uploadNFTImage
);

export default uploadNFTImageRouter;
