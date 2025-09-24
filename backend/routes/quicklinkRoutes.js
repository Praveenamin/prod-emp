const express = require("express");
const router = express.Router();
const {
  createQuickLink,
  getQuickLinks,
  deleteQuickLink,
} = require("../controllers/quickLinkController");

// Create
router.post("/", createQuickLink);

// Get all
router.get("/", getQuickLinks);

// Delete by ID
router.delete("/:id", deleteQuickLink);

module.exports = router;

