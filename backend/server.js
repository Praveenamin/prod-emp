const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

dotenv.config();

const userRoutes = require('./routes/userRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const announcementRoutes = require('./routes/announcementRoutes');
const quicklinkRoutes = require('./routes/quicklinkRoutes');
const User = require('./models/User');

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/announcements', announcementRoutes);
app.use('/api/quicklinks', quicklinkRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  console.log('✅ MongoDB connected');

  // Ensure default admin exists (does NOT delete other users)
  try {
    const adminEmail = process.env.DEFAULT_ADMIN_EMAIL;
    const adminPassword = process.env.DEFAULT_ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
      console.warn("⚠️  DEFAULT_ADMIN_EMAIL or DEFAULT_ADMIN_PASSWORD not set in .env");
    } else {
      let admin = await User.findOne({ email: adminEmail });
      if (!admin) {
        const hashedPassword = await bcrypt.hash(adminPassword, 10);
        admin = new User({
          firstName: 'Admin',
          lastName: 'User',
          email: adminEmail,
          password: hashedPassword,
          role: 'Admin',
          status: 'Active',
        });
        await admin.save();
        console.log(`✅ Default admin created: ${adminEmail}`);
      } else {
        console.log(`✅ Default admin already exists: ${adminEmail}`);
      }
    }
  } catch (err) {
    console.error("❌ Error ensuring default admin:", err);
  }
})
.catch(err => {
  console.error("❌ MongoDB connection error:", err);
});

// Start server
const PORT = process.env.PORT || 3338;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

