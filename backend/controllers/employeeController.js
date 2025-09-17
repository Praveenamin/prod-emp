// controllers/employeeController.js
const Employee = require("../models/Employee");
const bcrypt = require("bcryptjs");

// Helper: remove sensitive fields from output
const sanitize = (emp) => {
  if (!emp) return null;
  const obj = emp.toObject ? emp.toObject() : emp;
  delete obj.password;
  return obj;
};

// GET /api/employees
exports.getAll = async (req, res) => {
  try {
    const list = await Employee.find().sort({ createdAt: -1 });
    res.json(list.map(sanitize));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/employees/:id
exports.getOne = async (req, res) => {
  try {
    const emp = await Employee.findById(req.params.id);
    if (!emp) return res.status(404).json({ error: "Employee not found" });
    res.json(sanitize(emp));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /api/employees
exports.create = async (req, res) => {
  try {
    const {
      firstName, lastName, email, password,
      designation, phone, altPhone, userType
    } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ error: "firstName, lastName, email and password are required" });
    }

    const exists = await Employee.findOne({ email: email.toLowerCase() });
    if (exists) return res.status(400).json({ error: "Email already exists" });

    const hashed = await bcrypt.hash(password, 10);

    const emp = new Employee({
      firstName, lastName,
      email: email.toLowerCase(),
      password: hashed,
      designation, phone, altPhone,
      userType: userType === "Admin" ? "Admin" : "Employee",
      status: "Active"
    });

    await emp.save();
    res.status(201).json(sanitize(emp));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT /api/employees/:id
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const update = { ...req.body };

    // If email being updated, normalize
    if (update.email) update.email = update.email.toLowerCase();

    // If password present -> hash it
    if (update.password) {
      update.password = await bcrypt.hash(update.password, 10);
    }

    const emp = await Employee.findByIdAndUpdate(id, update, { new: true });
    if (!emp) return res.status(404).json({ error: "Employee not found" });

    res.json(sanitize(emp));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PATCH /api/employees/:id/hold  (toggle hold/unhold)
exports.toggleHold = async (req, res) => {
  try {
    const { id } = req.params;
    const emp = await Employee.findById(id);
    if (!emp) return res.status(404).json({ error: "Employee not found" });

    emp.status = emp.status === "Active" ? "Hold" : "Active";
    await emp.save();
    res.json(sanitize(emp));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE /api/employees/:id
exports.remove = async (req, res) => {
  try {
    const { id } = req.params;
    const emp = await Employee.findByIdAndDelete(id);
    if (!emp) return res.status(404).json({ error: "Employee not found" });
    res.json({ message: "Employee deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

