// models/Employee.js
const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true }, // hashed
    designation: { type: String, default: "" },
    phone: { type: String, default: "" },
    altPhone: { type: String, default: "" },
    userType: { type: String, enum: ["Admin", "Employee"], default: "Employee" },
    status: { type: String, enum: ["Active", "Hold"], default: "Active" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Employee", employeeSchema);

