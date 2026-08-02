// Feed API -> Get user by email

const { model } = require("mongoose");
const User = require("../models/user.model");

const feed = async (req, res) => {
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

module.exports = { feed };
