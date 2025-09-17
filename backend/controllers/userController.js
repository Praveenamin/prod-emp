import User from "../models/User.js";
import bcrypt from "bcryptjs";

// Add User
export const addUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, designation, phone, altPhone, role } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName, lastName, email,
      password: hashedPassword,
      designation, phone, altPhone, role
    });

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Edit User
export const editUser = async (req, res) => {
  try {
    const { id } = req.params;
    const update = req.body;

    if (update.password) {
      update.password = await bcrypt.hash(update.password, 10);
    }

    const user = await User.findByIdAndUpdate(id, update, { new: true });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Hold/Unhold User
export const toggleHoldUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    user.status = user.status === "Active" ? "Hold" : "Active";
    await user.save();

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete User
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

