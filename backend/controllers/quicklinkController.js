const Quicklink = require('../models/Quicklink');

// Add Quicklink
const addQuicklink = async (req, res) => {
  try {
    const quicklink = new Quicklink(req.body);
    await quicklink.save();
    res.status(201).json(quicklink);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all Quicklinks
const getQuicklinks = async (req, res) => {
  try {
    const links = await Quicklink.find();
    res.json(links);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Quicklink
const deleteQuicklink = async (req, res) => {
  try {
    await Quicklink.findByIdAndDelete(req.params.id);
    res.json({ message: 'Quicklink deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { addQuicklink, getQuicklinks, deleteQuicklink };

