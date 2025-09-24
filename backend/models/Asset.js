const mongoose = require("mongoose");

const assetSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    deviceType: {
      type: String,
      enum: ["Laptop", "Desktop"],
      required: true,
    },
    serialNumber: { type: String, required: true, unique: true },

    peripherals: {
      speaker: { type: Boolean, default: false },
      headphone: { type: Boolean, default: false },
      monitor: { type: Boolean, default: false },
      keyboard: { type: Boolean, default: false },
      mouse: { type: Boolean, default: false },
    },

    networkIP: { type: String },

    status: {
      type: String,
      enum: ["Active", "ChangeRequested"],
      default: "Active",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Asset", assetSchema);

