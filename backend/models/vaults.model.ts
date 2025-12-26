import mongoose from "mongoose";

const vaultSchema = new mongoose.Schema({
  vaultAddress: {
    type: String,
    required: true,
  },
});

const Vaults = mongoose.model("vault", vaultSchema);

export default Vaults;
