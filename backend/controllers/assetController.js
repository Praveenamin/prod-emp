const Asset = require("../models/Asset");

// Add new asset
exports.createAsset = async (req, res) => {
  try {
    const asset = await Asset.create(req.body);
    res.status(201).json(asset);
  } catch (err) {
    console.error("❌ Create Asset error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all assets
exports.getAssets = async (req, res) => {
  try {
    const assets = await Asset.find().populate("assignedTo", "firstName lastName email");
    res.json(assets);
  } catch (err) {
    console.error("❌ Get Assets error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Update asset
exports.updateAsset = async (req, res) => {
  try {
    const asset = await Asset.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(asset);
  } catch (err) {
    console.error("❌ Update Asset error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete asset
exports.deleteAsset = async (req, res) => {
  try {
    await Asset.findByIdAndDelete(req.params.id);
    res.json({ message: "Asset deleted" });
  } catch (err) {
    console.error("❌ Delete Asset error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

