const express = require("express");
const router = express.Router();
const {
  createAsset,
  getAssets,
  updateAsset,
  deleteAsset,
} = require("../controllers/assetController");

// Routes
router.post("/", createAsset);
router.get("/", getAssets);
router.put("/:id", updateAsset);
router.delete("/:id", deleteAsset);

module.exports = router;

