const mongoose = require("mongoose");

const assetSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // e.g., Laptop, Monitor
    type: { type: String, required: true }, // e.g., Hardware, Software
    serialNumber: { type: String, unique: true, required: true },
    purchaseDate: { type: Date },
    status: { type: String, enum: ["Assigned", "Available", "In Repair", "Retired"], default: "Available" },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Asset", assetSchema);

