const Asset = require("../models/Asset");

// Create new asset
exports.createAsset = async (req, res) => {
  try {
    const asset = await Asset.create(req.body);
    res.status(201).json(asset);
  } catch (err) {
    console.error("❌ Asset create error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all assets with user info
exports.getAssets = async (req, res) => {
  try {
    const assets = await Asset.find().populate("user", "firstName lastName email");
    res.json(assets);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update asset
exports.updateAsset = async (req, res) => {
  try {
    const asset = await Asset.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(asset);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Delete asset
exports.deleteAsset = async (req, res) => {
  try {
    await Asset.findByIdAndDelete(req.params.id);
    res.json({ message: "Asset deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Mark hardware change request
exports.requestChange = async (req, res) => {
  try {
    const asset = await Asset.findByIdAndUpdate(
      req.params.id,
      { status: "ChangeRequested" },
      { new: true }
    );
    res.json(asset);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Approve change request
exports.approveChange = async (req, res) => {
  try {
    const asset = await Asset.findByIdAndUpdate(
      req.params.id,
      { status: "Active" },
      { new: true }
    );
    res.json(asset);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

