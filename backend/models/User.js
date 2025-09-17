import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    designation: { type: String },
    phone: { type: String },
    altPhone: { type: String },
    role: { type: String, enum: ["Admin", "Employee"], default: "Employee" },
    status: { type: String, enum: ["Active", "Hold"], default: "Active" }
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);

