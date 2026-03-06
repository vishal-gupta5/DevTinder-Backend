const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Sign Up

const signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res
        .status(400)
        .json({ message: "Something is missing!", success: false });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User is already exist!", success: false });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashPassword,
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      message: "User Created Successfully!",
      data: user,
      success: true,
    });
  } catch (err) {
    console.log(`Error: ${err}`);
    return res
      .status(400)
      .json({ message: "Something went wrong!", success: false });
  }
};

// Login

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Something is missing!", success: false });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ message: "User is not present in database", success: false });
    }

    const isValidpassword = await bcrypt.compare(password, user.password);

    if (!isValidpassword) {
      return res
        .status(400)
        .json({ message: "Invalid Password!", success: false });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "User Logged in Successfully!",
      data: user,
      success: true,
    });
  } catch (err) {
    console.log(`Error: ${err}`);
    return res
      .status(400)
      .json({ message: "Something went wrong!", success: false });
  }
};

// Logout

const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "lax",
      secure: "lax",
    });

    return res
      .status(400)
      .json({ message: "User Logged out successfully!", success: false });
  } catch (err) {
    console.log(`Error: ${err}`);
    return res
      .status(400)
      .json({ message: "Something went wrong!", success: false });
  }
};

module.exports = { signup, login, logout };
