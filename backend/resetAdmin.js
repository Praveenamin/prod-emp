// backend/resetAdmin.js
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

(async () => {
  const MONGO_URI = process.env.MONGO_URI || 'mongodb://employee_mongo:27017/employee_portal';
  await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

  const email = 'admin@assistanz.com';
  const plain = process.env.DEFAULT_ADMIN_PASSWORD || 'Z33y5Jtke5WjRtyK';
  const hash = await bcrypt.hash(plain, 10);

  const res = await User.findOneAndUpdate(
    { email },
    {
      firstName: 'Admin',
      lastName: 'User',
      email,
      password: hash,
      role: 'Admin',
      status: 'Active',
      updatedAt: new Date()
    },
    { upsert: true, new: true }
  );

  console.log('✅ Admin upserted:', res.email);
  console.log('👉 Login with:', email, '/', plain);
  process.exit(0);
})();

