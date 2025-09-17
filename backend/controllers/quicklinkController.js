const Quicklink = require('../models/Quicklink');

// Get all quicklinks
exports.getQuicklinks = async (req, res) => {
  try {
    const links = await Quicklink.find().sort({ createdAt: -1 });
    res.json(links);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add new quicklink
exports.addQuicklink = async (req, res) => {
  try {
    const link = new Quicklink(req.body);
    await link.save();
    res.status(201).json(link);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete quicklink
exports.deleteQuicklink = async (req, res) => {
  try {
    await Quicklink.findByIdAndDelete(req.params.id);
    res.json({ message: 'Quicklink deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

