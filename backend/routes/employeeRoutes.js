// routes/employeeRoutes.js
const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/employeeController");

// list & create
router.get("/", ctrl.getAll);
router.post("/", ctrl.create);

// single employee ops
router.get("/:id", ctrl.getOne);
router.put("/:id", ctrl.update);
router.patch("/:id/hold", ctrl.toggleHold);
router.delete("/:id", ctrl.remove);

module.exports = router;

