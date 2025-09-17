const ITAsset = require('../models/ITAsset');

// Add new IT asset
exports.addAsset = async (req, res) => {
  try {
    const asset = new ITAsset(req.body);
    await asset.save();
    res.status(201).json(asset);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// List all assets
exports.getAllAssets = async (req, res) => {
  try {
    const assets = await ITAsset.find().populate('employeeId', 'firstName lastName email');
    res.json(assets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update IT asset
exports.updateAsset = async (req, res) => {
  try {
    const asset = await ITAsset.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(asset);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete IT asset
exports.deleteAsset = async (req, res) => {
  try {
    await ITAsset.findByIdAndDelete(req.params.id);
    res.json({ message: "Asset deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

