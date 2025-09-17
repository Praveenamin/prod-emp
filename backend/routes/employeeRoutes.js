const express = require('express');
const router = express.Router();
const { addEmployeeAssets, getEmployeeAssets, requestHardwareChange } = require('../controllers/employeeController');

router.post('/', addEmployeeAssets);
router.get('/', getEmployeeAssets);
router.post('/:id/request', requestHardwareChange);

module.exports = router;

