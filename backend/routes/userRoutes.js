const express = require('express');
const router = express.Router();
const uc = require('../controllers/userController');

router.get('/', uc.getUsers);
router.post('/', uc.createUser);
router.put('/:id', uc.updateUser);
router.delete('/:id', uc.deleteUser);
router.patch('/hold/:id', uc.holdUser);
router.patch('/activate/:id', uc.activateUser);

module.exports = router;

