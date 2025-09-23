const Asset = require("../models/Asset");
const User = require("../models/User");

// Create new Asset
exports.createAsset = async (req, res) => {
  try {
    const asset = new Asset(req.body);
    await asset.save();
    res.status(201).json(asset);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all assets with user info
exports.getAssets = async (req, res) => {
  try {
    const assets = await Asset.find().populate("assignedTo", "firstName lastName email");
    res.json(assets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update asset
exports.updateAsset = async (req, res) => {
  try {
    const asset = await Asset.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!asset) return res.status(404).json({ message: "Asset not found" });
    res.json(asset);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete asset
exports.deleteAsset = async (req, res) => {
  try {
    const asset = await Asset.findByIdAndDelete(req.params.id);
    if (!asset) return res.status(404).json({ message: "Asset not found" });
    res.json({ message: "Asset deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add hardware change request
exports.addChangeRequest = async (req, res) => {
  try {
    const asset = await Asset.findById(req.params.id);
    if (!asset) return res.status(404).json({ message: "Asset not found" });

    asset.changeRequests.push({ request: req.body.request });
    await asset.save();

    res.json(asset);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

