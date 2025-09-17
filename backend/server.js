const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const userRoutes = require('./routes/userRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const itAssetRoutes = require('./routes/itAssetRoutes');
const announcementRoutes = require('./routes/announcementRoutes'); // Added announcement routes

// MongoDB connection
const mongoURI = process.env.MONGO_URI || 'mongodb://employee_mongo:27017/employee-portal';
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

// API route registration
app.use('/api/users', userRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/it-assets', itAssetRoutes);
app.use('/api/announcements', announcementRoutes); // Register announcements

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend running' });
});

// Start server
const PORT = process.env.PORT || 3338;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});

const quicklinkRoutes = require('./routes/quicklinkRoutes');
app.use('/api/quicklinks', quicklinkRoutes);

