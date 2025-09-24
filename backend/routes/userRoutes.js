const express = require("express");
const router = express.Router();
const {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  holdUser,
  activateUser
} = require("../controllers/userController");

// @route   GET /api/users
// @desc    Get all users
router.get("/", getUsers);

// @route   POST /api/users
// @desc    Create new user
router.post("/", createUser);

// @route   PUT /api/users/:id
// @desc    Update user
router.put("/:id", updateUser);

// @route   DELETE /api/users/:id
// @desc    Delete user
router.delete("/:id", deleteUser);

// @route   PATCH /api/users/hold/:id
// @desc    Put user on hold
router.patch("/hold/:id", holdUser);

// @route   PATCH /api/users/activate/:id
// @desc    Reactivate user
router.patch("/activate/:id", activateUser);

module.exports = router;

