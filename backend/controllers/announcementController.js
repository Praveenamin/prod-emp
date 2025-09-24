const Announcement = require("../models/Announcement");

// Create new announcement
exports.createAnnouncement = async (req, res) => {
  try {
    const { title, message } = req.body;
    const announcement = await Announcement.create({
      title,
      message,
      createdBy: req.user.id
    });
    res.status(201).json(announcement);
  } catch (err) {
    res.status(500).json({ message: "❌ Failed to create announcement" });
  }
};

// Get all announcements
exports.getAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find().sort({ createdAt: -1 });
    res.json(announcements);
  } catch (err) {
    res.status(500).json({ message: "❌ Failed to fetch announcements" });
  }
};

// Delete announcement
exports.deleteAnnouncement = async (req, res) => {
  try {
    await Announcement.findByIdAndDelete(req.params.id);
    res.json({ message: "✅ Announcement deleted" });
  } catch (err) {
    res.status(500).json({ message: "❌ Failed to delete announcement" });
  }
};

