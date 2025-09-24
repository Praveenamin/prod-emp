const Asset = require("../models/Asset");
const User = require("../models/User");

// Create Asset
exports.createAsset = async (req, res) => {
  try {
    const asset = await Asset.create(req.body);
    res.status(201).json(asset);
  } catch (err) {
    console.error("❌ Create Asset Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get All Assets with User Info
exports.getAssets = async (req, res) => {
  try {
    const assets = await Asset.find().populate("user", "firstName lastName email");
    res.json(assets);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update Asset
exports.updateAsset = async (req, res) => {
  try {
    const asset = await Asset.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(asset);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Delete Asset
exports.deleteAsset = async (req, res) => {
  try {
    await Asset.findByIdAndDelete(req.params.id);
    res.json({ message: "Asset deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

