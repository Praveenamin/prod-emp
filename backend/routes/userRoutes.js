const express = require("express");
const {
  registerUser,
  loginUser,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  holdUser,
  activateUser
} = require("../controllers/userController");

const router = express.Router();

// Auth routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// User management routes
router.get("/", getUsers);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.patch("/hold/:id", holdUser);
router.patch("/activate/:id", activateUser);

module.exports = router;

