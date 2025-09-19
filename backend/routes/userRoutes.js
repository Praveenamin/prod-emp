const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Routes
router.get("/", userController.getUsers);
router.post("/", userController.addUser);
router.put("/:id", userController.updateUser);
router.patch("/hold/:id", userController.holdUser);
router.patch("/activate/:id", userController.activateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;

