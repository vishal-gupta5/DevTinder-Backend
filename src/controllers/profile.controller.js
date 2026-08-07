// profile/view API

const { validateEditProfile } = require("../utils/constant");

const view = async (req, res) => {
  try {
    const user = req.user;

    return res
      .status(200)
      .json({ message: "User Profile", status: true, data: user });
  } catch (err) {
    console.log(err.message);
    return res
      .status(400)
      .json({ message: "Something went wrong", status: false });
  }
};

// profile/edit API

const edit = async (req, res) => {
  try {
    if (!validateEditProfile(req)) {
      return res
        .status(400)
        .json({ message: "Invalid Edit Request!", status: false });
    }

    const loggedInUser = req.user;

    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

    await loggedInUser.save();

    return res.status(200).json({
      message: "User updated successfully!",
      status: true,
      data: loggedInUser,
    });
  } catch (err) {
    console.error("error", err.message);
    return res
      .status(500)
      .json({ message: "Something went wrong!", status: false });
  }
};

module.exports = { view, edit };
