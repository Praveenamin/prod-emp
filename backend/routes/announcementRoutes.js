const express = require('express');
const router = express.Router();
const { addAnnouncement, getAnnouncements, deleteAnnouncement } = require('../controllers/announcementController');

router.post('/', addAnnouncement);
router.get('/', getAnnouncements);
router.delete('/:id', deleteAnnouncement);

module.exports = router;

