const QuickLink = require("../models/QuickLink");

// Create
exports.createQuickLink = async (req, res) => {
  try {
    const { label, url } = req.body;
    const newQuickLink = await QuickLink.create({ label, url });
    res.status(201).json(newQuickLink);
  } catch (err) {
    console.error("❌ Create QuickLink error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all
exports.getQuickLinks = async (req, res) => {
  try {
    const quickLinks = await QuickLink.find().sort({ createdAt: -1 });
    res.json(quickLinks);
  } catch (err) {
    console.error("❌ Get QuickLinks error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete
exports.deleteQuickLink = async (req, res) => {
  try {
    await QuickLink.findByIdAndDelete(req.params.id);
    res.json({ message: "QuickLink deleted" });
  } catch (err) {
    console.error("❌ Delete QuickLink error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

