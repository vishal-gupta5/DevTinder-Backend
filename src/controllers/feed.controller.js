const { model } = require("mongoose");
const User = require("../models/user.model");

// Feed API -> Get user by email
const feedUser = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ message: "This user is not exist in database", status: false });
    }

    const { password, ...userWithoutPassword } = user.toObject();

    return res
      .status(200)
      .json({ message: "User Found!", status: true, userWithoutPassword });
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .json({ message: "Something went wrong!", status: false });
  }
};

// Feed API -> Get user by id
const feedUserById = async (req, res) => {
  try {
    const id = req.body.id;
    const user = await User.findById(id);

    if (!user) {
      return res
        .status(400)
        .json({ message: "User is not present", status: false });
    }

    const { password, ...userWithoutPassword } = user.toObject();

    return res
      .status(200)
      .json({ message: "User Found", data: userWithoutPassword, status: true });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .josn({ message: "Something went wrong!", status: false });
  }
};

// Feed API -> Get all the users from the database
const feed = async (req, res) => {
  try {
    const users = await User.find({}).select("-password");

    if (!users) {
      return res
        .status(400)
        .json({ message: "Users nout found!", status: false });
    }

    return res
      .status(200)
      .json({ message: "Found Users", status: true, users });
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .json({ message: "Something went wrong!", status: false });
  }
};

// Delete a user from the database
const deleteUser = async (req, res) => {
  try {
    const { id } = req.body;
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res
        .status(400)
        .json({ message: "User not found!", status: false });
    }

    return res.status(200).json({
      message: "User Deleted successfully!",
      status: true,
    });
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .json({ message: "Something went wrong!", status: false });
  }
};

// Update the user from the database

const updateUser = async (req, res) => {
  try {
    const { id, ...data } = req.body;

    const user = await User.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res
        .status(400)
        .json({ message: "User not found!", status: false });
    }

    // Hide the password
    const { password, ...userWithoutPassword } = user.toObject();

    return res.status(200).json({
      message: "User's data updated successfully!",
      status: true,
      data: userWithoutPassword,
    });
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .json({ message: "Something went wrong!", status: false });
  }
};

module.exports = { feedUser, feed, deleteUser, updateUser, feedUserById };
