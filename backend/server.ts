import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.config.js";
import vaultRouter from "./routes/vault.route.js";
import cors from "cors";
import uploadNFTImageRouter from "./routes/uploadNFTImage.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", vaultRouter);
app.use("/api/v1", uploadNFTImageRouter);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server is running at : ", PORT);
  });
});
