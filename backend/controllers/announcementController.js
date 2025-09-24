const Announcement = require("../models/Announcement");

// Create
exports.createAnnouncement = async (req, res) => {
  try {
    const { title, message } = req.body;
    const newAnnouncement = await Announcement.create({ title, message });
    res.status(201).json(newAnnouncement);
  } catch (err) {
    console.error("❌ Create Announcement error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all
exports.getAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find().sort({ createdAt: -1 });
    res.json(announcements);
  } catch (err) {
    console.error("❌ Get Announcements error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete
exports.deleteAnnouncement = async (req, res) => {
  try {
    await Announcement.findByIdAndDelete(req.params.id);
    res.json({ message: "Announcement deleted" });
  } catch (err) {
    console.error("❌ Delete Announcement error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

