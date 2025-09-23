const express = require("express");
const router = express.Router();
const assetController = require("../controllers/assetController");
const auth = require("../middleware/authMiddleware"); // token protection

// CRUD
router.post("/", auth, assetController.createAsset);
router.get("/", auth, assetController.getAssets);
router.put("/:id", auth, assetController.updateAsset);
router.delete("/:id", auth, assetController.deleteAsset);

// Change request
router.post("/:id/change-request", auth, assetController.addChangeRequest);

module.exports = router;

