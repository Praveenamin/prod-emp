const QuickLink = require("../models/QuickLink");

// Create quicklink
exports.createQuickLink = async (req, res) => {
  try {
    const { label, url } = req.body;
    const quickLink = await QuickLink.create({
      label,
      url,
      createdBy: req.user.id
    });
    res.status(201).json(quickLink);
  } catch (err) {
    res.status(500).json({ message: "❌ Failed to create quick link" });
  }
};

// Get all quicklinks
exports.getQuickLinks = async (req, res) => {
  try {
    const quickLinks = await QuickLink.find().sort({ createdAt: -1 });
    res.json(quickLinks);
  } catch (err) {
    res.status(500).json({ message: "❌ Failed to fetch quick links" });
  }
};

// Delete quicklink
exports.deleteQuickLink = async (req, res) => {
  try {
    await QuickLink.findByIdAndDelete(req.params.id);
    res.json({ message: "✅ Quick link deleted" });
  } catch (err) {
    res.status(500).json({ message: "❌ Failed to delete quick link" });
  }
};

