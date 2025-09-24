const express = require("express");
const router = express.Router();
const assetController = require("../controllers/assetController");

// Create Asset
router.post("/", assetController.createAsset);

// Get all assets
router.get("/", assetController.getAssets);

// Get single asset by ID
router.get("/:id", assetController.getAssetById);

// Update asset
router.put("/:id", assetController.updateAsset);

// Delete asset
router.delete("/:id", assetController.deleteAsset);

module.exports = router;

