const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);

// DB connect
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));
const initAdmin = require("./initAdmin");

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log("✅ MongoDB Connected");
    await initAdmin(); // ensure default admin exists
  })
  .catch((err) => console.error("❌ MongoDB Error:", err));

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

const assetRoutes = require("./routes/assetRoutes");
app.use("/api/assets", assetRoutes);

// Start server
const PORT = process.env.PORT || 3338;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

