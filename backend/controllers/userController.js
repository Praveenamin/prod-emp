const bcrypt = require('bcryptjs');
const User = require('../models/User');

// GET /api/users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    console.error('Get users error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// POST /api/users
exports.createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, designation, phoneNumber, alternativeNumber, role } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Email and password required' });

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'User already exists' });

    const hash = await bcrypt.hash(password, 10);
    const u = await User.create({ firstName, lastName, email, password: hash, designation, phoneNumber, alternativeNumber, role: role || 'Employee', status: 'Active' });
    res.status(201).json(u);
  } catch (err) {
    console.error('Create user error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// PUT /api/users/:id
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = { ...req.body };
    if (updates.password) updates.password = await bcrypt.hash(updates.password, 10);
    const u = await User.findByIdAndUpdate(id, updates, { new: true });
    res.json(u);
  } catch (err) {
    console.error('Update user error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// DELETE /api/users/:id
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.json({ message: 'User deleted' });
  } catch (err) {
    console.error('Delete user error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// PATCH /api/users/hold/:id
exports.holdUser = async (req, res) => {
  try {
    const { id } = req.params;
    const u = await User.findByIdAndUpdate(id, { status: 'On-Hold' }, { new: true });
    res.json(u);
  } catch (err) {
    console.error('Hold user error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// PATCH /api/users/activate/:id
exports.activateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const u = await User.findByIdAndUpdate(id, { status: 'Active' }, { new: true });
    res.json(u);
  } catch (err) {
    console.error('Activate user error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

