const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUsers,
  updateUser,
  deleteUser,
  holdUser,
  activateUser
} = require("../controllers/userController");

// =============================
// Auth
// =============================
router.post("/register", registerUser);
router.post("/login", loginUser);

// =============================
// User Management
// =============================
router.get("/", getUsers);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

// =============================
// User Status Management
// =============================
router.patch("/hold/:id", holdUser);
router.patch("/activate/:id", activateUser);

module.exports = router;

