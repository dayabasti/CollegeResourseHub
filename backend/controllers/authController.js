const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ✅ REGISTER CONTROLLER
const registerUser = async (req, res) => {
  try {
    const { name, email, password, adminCode } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const role =
      adminCode === process.env.ADMIN_SECRET ? "admin" : "user";

    const newUser = new User({
      name,
      email,
      password,
      role,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully", role });
  } catch (err) {
    console.error("Registration Error:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// ✅ LOGIN CONTROLLER
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({ token,
      role: user.role,
      name:user.name,
    });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// ✅ EXPORT BOTH
module.exports = {
  registerUser,
  loginUser,
};
