const express = require("express");
const router = express.Router();
const {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  holdUser,
  activateUser,
} = require("../controllers/userController");

// GET all users
router.get("/", getUsers);

// Create new user
router.post("/", createUser);

// Update user by ID
router.put("/:id", updateUser);

// Delete user by ID
router.delete("/:id", deleteUser);

// Put user on hold
router.patch("/hold/:id", holdUser);

// Reactivate user
router.patch("/activate/:id", activateUser);

module.exports = router;

