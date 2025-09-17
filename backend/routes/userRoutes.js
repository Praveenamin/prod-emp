const express = require('express');
const router = express.Router();
const { addUser, editUser, holdUser, deleteUser, getUsers } = require('../controllers/userController');

// CRUD routes
router.post('/', addUser);
router.get('/', getUsers);
router.put('/:id', editUser);
router.patch('/:id/hold', holdUser);
router.delete('/:id', deleteUser);

module.exports = router;

