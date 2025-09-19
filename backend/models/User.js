const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    designation: { type: String },
    phoneNumber: { type: String },
    alternativeNumber: { type: String },
    role: { type: String, enum: ["Admin", "Employee"], default: "Employee" },
    status: { type: String, enum: ["Active", "On Hold"], default: "Active" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);

