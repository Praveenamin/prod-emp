const Asset = require("../models/Asset");

exports.createAsset = async (req, res) => {
  try {
    const asset = new Asset(req.body);
    await asset.save();
    res.status(201).json(asset);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAssets = async (req, res) => {
  try {
    const assets = await Asset.find().populate("user", "firstName lastName email");
    res.json(assets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateAsset = async (req, res) => {
  try {
    const asset = await Asset.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(asset);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteAsset = async (req, res) => {
  try {
    await Asset.findByIdAndDelete(req.params.id);
    res.json({ message: "Asset deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addChangeRequest = async (req, res) => {
  try {
    const asset = await Asset.findById(req.params.id);
    if (!asset) return res.status(404).json({ message: "Asset not found" });

    asset.changeRequests.push(req.body.request);
    await asset.save();
    res.json(asset);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

