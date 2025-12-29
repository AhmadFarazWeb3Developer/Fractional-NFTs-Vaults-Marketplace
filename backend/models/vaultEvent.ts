import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  vaultAddress: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
  sharesChange: {
    type: mongoose.Types.Decimal128,
    required: true,
  }, // positive for buy, negative for redeem
  type: {
    type: String,
    enum: ["buy", "redeem"],
    required: true,
  },
  timestamp: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const VaultEvent = mongoose.model("VaultEvent", eventSchema);

export default VaultEvent;
