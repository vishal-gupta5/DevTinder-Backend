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

module.exports = { feedUser, feed, deleteUser };
