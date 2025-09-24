const express = require("express");
const { createQuickLink, getQuickLinks, deleteQuickLink } = require("../controllers/quickLinkController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, createQuickLink);
router.get("/", authMiddleware, getQuickLinks);
router.delete("/:id", authMiddleware, deleteQuickLink);

module.exports = router;

