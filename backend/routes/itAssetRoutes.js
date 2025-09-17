const express = require('express');
const router = express.Router();
const itAssetController = require('../controllers/itAssetController');

// Add IT asset
router.post('/', itAssetController.addAsset);

// List all IT assets
router.get('/', itAssetController.getAllAssets);

// Update IT asset by ID
router.put('/:id', itAssetController.updateAsset);

// Delete IT asset by ID
router.delete('/:id', itAssetController.deleteAsset);

module.exports = router;

