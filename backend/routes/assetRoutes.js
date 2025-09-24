const express = require("express");
const router = express.Router();
const assetCtrl = require("../controllers/assetController");
const authMiddleware = require("../middleware/authMiddleware");

// All routes require authentication
router.post("/", authMiddleware, assetCtrl.createAsset);
router.get("/", authMiddleware, assetCtrl.getAssets);
router.put("/:id", authMiddleware, assetCtrl.updateAsset);
router.delete("/:id", authMiddleware, assetCtrl.deleteAsset);

// Extra routes
router.patch("/:id/request-change", authMiddleware, assetCtrl.requestChange);
router.patch("/:id/approve-change", authMiddleware, assetCtrl.approveChange);

module.exports = router;

