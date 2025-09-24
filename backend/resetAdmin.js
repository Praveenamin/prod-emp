const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("./models/User");

const MONGO_URI = process.env.MONGO_URI || "mongodb://employee_mongo:27017/employee_portal";

async function resetAdmin() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB");

    const email = "admin@assistanz.com";
    const password = "Admin@123"; // new reset password
    const hashed = await bcrypt.hash(password, 10);

    const admin = await User.findOneAndUpdate(
      { email },
      {
        firstName: "Admin",
        lastName: "User",
        email,
        password: hashed,
        role: "Admin",
        status: "Active",
      },
      { new: true, upsert: true }
    );

    console.log("✅ Admin reset:", admin.email);
    console.log("👉 Login with:", email, "/", password);
    process.exit(0);
  } catch (err) {
    console.error("❌ Error:", err);
    process.exit(1);
  }
}

resetAdmin();

