const Asset = require("../models/Asset");
const User = require("../models/User");

// Create new asset
exports.createAsset = async (req, res) => {
  try {
    const asset = new Asset(req.body);
    await asset.save();
    res.status(201).json(asset);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all assets (with user info populated)
exports.getAssets = async (req, res) => {
  try {
    const assets = await Asset.find().populate("assignedTo", "firstName lastName email");
    res.json(assets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update asset
exports.updateAsset = async (req, res) => {
  try {
    const asset = await Asset.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate("assignedTo");
    res.json(asset);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete asset
exports.deleteAsset = async (req, res) => {
  try {
    await Asset.findByIdAndDelete(req.params.id);
    res.json({ message: "Asset deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

