const express = require("express");
const router = express.Router();
const {
  createAnnouncement,
  getAnnouncements,
  deleteAnnouncement,
} = require("../controllers/announcementController");

// Create announcement
router.post("/", createAnnouncement);

// Get all announcements
router.get("/", getAnnouncements);

// Delete announcement by ID
router.delete("/:id", deleteAnnouncement);

module.exports = router;

