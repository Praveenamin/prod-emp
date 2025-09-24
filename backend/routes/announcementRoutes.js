const express = require("express");
const { createAnnouncement, getAnnouncements, deleteAnnouncement } = require("../controllers/announcementController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, createAnnouncement);
router.get("/", authMiddleware, getAnnouncements);
router.delete("/:id", authMiddleware, deleteAnnouncement);

module.exports = router;

