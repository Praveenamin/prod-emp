require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const userRoutes = require("./routes/userRoutes");
const assetRoutes = require("./routes/assetRoutes");

const app = express();

// =============================
// Middleware
// =============================
app.use(cors());
app.use(express.json());

// =============================
// Routes
// =============================
app.use("/api/users", userRoutes);   // user management
app.use("/api/auth", userRoutes);    // register & login (mounted together)
app.use("/api/assets", assetRoutes); // IT assets
app.use("/api/auth", require("./routes/authRoutes"));
// =============================
// DB Connection
// =============================
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// =============================
// Start Server
// =============================
const PORT = process.env.PORT || 3338;
app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
});

