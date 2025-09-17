const express = require('express');
const router = express.Router();
const { addQuicklink, getQuicklinks, deleteQuicklink } = require('../controllers/quicklinkController');

router.post('/', addQuicklink);
router.get('/', getQuicklinks);
router.delete('/:id', deleteQuicklink);

module.exports = router;

