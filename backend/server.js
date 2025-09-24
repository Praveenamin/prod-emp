require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const assetRoutes = require('./routes/assetRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// health
app.get('/', (req, res) => res.send('OK'));

// mount routes
app.use('/api/auth', authRoutes);   // login/register
app.use('/api/users', userRoutes);  // user management
app.use('/api/assets', assetRoutes); // assets

const MONGO_URI = process.env.MONGO_URI || 'mongodb://employee_mongo:27017/employee_portal';

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => {
  console.error('❌ MongoDB connection error:', err);
  process.exit(1);
});

const PORT = process.env.PORT || 3338;
app.listen(PORT, () => console.log(`🚀 Backend running on port ${PORT}`));

const assetRoutes = require("./routes/assetRoutes");
app.use("/api/assets", assetRoutes);


