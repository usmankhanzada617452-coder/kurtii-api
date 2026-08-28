const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Token banane ka helper function
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "7d", // token 7 din tak valid rahega
  });
};

// Naya user register karo
// POST /api/auth/register
const registerUser = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email aur password zaroori hain",
      });
    }

    // Check karo email pehle se registered to nahi
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Ye email pehle se registered hai",
      });
    }

    // User banao (password automatically hash ho jayega Model ke andar)
    const user = await User.create({ name, email, password, phone });

    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: "Account successfully ban gaya",
      data: {
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Login karo
// POST /api/auth/login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email aur password zaroori hain",
      });
    }

    // User dhoondo
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Email ya password galat hai",
      });
    }

    // Password check karo
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Email ya password galat hai",
      });
    }

    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { registerUser, loginUser };