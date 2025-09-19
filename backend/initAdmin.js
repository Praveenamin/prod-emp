const User = require("./models/User");
const bcrypt = require("bcryptjs");

async function initAdmin() {
  try {
    const email = process.env.DEFAULT_ADMIN_EMAIL || "admin@assistanz.com";
    const password = process.env.DEFAULT_ADMIN_PASSWORD || "Z33y5Jtke5WjRtyK";

    const existing = await User.findOne({ email });
    if (existing) {
      console.log("✅ Default admin already exists:", email);
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = new User({
      firstName: "Default",
      lastName: "Admin",
      email,
      password: hashedPassword,
      designation: "Administrator",
      phoneNumber: "0000000000",
      alternativeNumber: "0000000000",
      role: "Admin",
      status: "Active"
    });

    await admin.save();
    console.log("🎉 Default admin created:", email);
  } catch (err) {
    console.error("❌ Error creating default admin:", err.message);
  }
}

module.exports = initAdmin;

