const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authMiddleware, adminOnly } = require('../middleware/authMiddleware');

// All user routes require login
router.use(authMiddleware);

// Only admins can manage users
router.get('/', adminOnly, userController.getAllUsers);
router.post('/', adminOnly, userController.createUser);
router.put('/:id', adminOnly, userController.updateUser);
router.delete('/:id', adminOnly, userController.deleteUser);
router.patch('/hold/:id', adminOnly, userController.holdUser);

module.exports = router;

