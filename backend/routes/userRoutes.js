import express from "express";
import { addUser, editUser, toggleHoldUser, deleteUser } from "../controllers/userController.js";

const router = express.Router();

router.post("/", addUser);
router.put("/:id", editUser);
router.patch("/:id/hold", toggleHoldUser);
router.delete("/:id", deleteUser);

export default router;

