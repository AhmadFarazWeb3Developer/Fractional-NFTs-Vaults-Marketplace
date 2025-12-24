import mongoose from "mongoose";

const vaultSchema = new mongoose.Schema({
  vaultAddress: {
    type: String,
    required: true,
  },
});

const Vaults = mongoose.model("valut", vaultSchema);

export default Vaults;
