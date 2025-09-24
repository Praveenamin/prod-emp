const mongoose = require("mongoose");

const QuickLinkSchema = new mongoose.Schema(
  {
    label: { type: String, required: true },
    url: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("QuickLink", QuickLinkSchema);

