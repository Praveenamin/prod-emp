const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const assetRoutes = require("./routes/assetRoutes");
const announcementRoutes = require("./routes/announcementRoutes");  // ✅ import first
const quicklinkRoutes = require("./routes/quicklinkRoutes");        // ✅ import first

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Default route
app.get("/", (req, res) => {
  res.send("OK");
});

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/assets", assetRoutes);
app.use("/api/announcements", announcementRoutes); // ✅ works now
app.use("/api/quicklinks", quicklinkRoutes);       // ✅ works now

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(3338, () => console.log("🚀 Backend running on port 3338"));
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));

