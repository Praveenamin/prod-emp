const express = require('express');
const router = express.Router();
const quicklinkController = require('../controllers/quicklinkController');

router.get('/', quicklinkController.getQuicklinks);
router.post('/', quicklinkController.addQuicklink);
router.delete('/:id', quicklinkController.deleteQuicklink);

module.exports = router;

