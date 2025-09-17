// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const Employee = require("./models/Employee");
const employeeRoutes = require("./routes/employeeRoutes");

const app = express();
app.use(cors());
app.use(express.json());

// Config
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://mongo:27017/employeeDB";

// Health
app.get("/api/health", (req, res) => res.json({ status: "ok", message: "Backend running" }));

// Mount employee routes at both paths for compatibility
app.use("/api/employees", employeeRoutes);
app.use("/api/users", employeeRoutes); // frontend earlier may call /api/users

// Connect DB and seed admin
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log("✅ MongoDB connected");

    // Seed default admin if env vars present
    const adminEmail = process.env.DEFAULT_ADMIN_EMAIL;
    const adminPass = process.env.DEFAULT_ADMIN_PASSWORD;

    if (adminEmail && adminPass) {
      try {
        const exists = await Employee.findOne({ email: adminEmail.toLowerCase() });
        if (!exists) {
          const hashed = await bcrypt.hash(adminPass, 10);
          const admin = new Employee({
            firstName: "Default",
            lastName: "Admin",
            email: adminEmail.toLowerCase(),
            password: hashed,
            userType: "Admin",
            status: "Active"
          });
          await admin.save();
          console.log("✅ Default admin seeded (email from env).");
        } else {
          console.log("ℹ️ Default admin already exists.");
        }
      } catch (err) {
        console.error("Error while seeding admin:", err.message);
      }
    } else {
      console.log("⚠️ DEFAULT_ADMIN_EMAIL or DEFAULT_ADMIN_PASSWORD not set in env — skipping seeding.");
    }

    // Start server
    app.listen(PORT, () => console.log(`🚀 Backend running on port ${PORT}`));
  })
  .catch(err => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

