const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const auth = async (req, res) => {
  try {
    const token = req.cookie.token;

    if (!token) {
      return res
        .status(400)
        .json({ message: "Token is missing!", success: false });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);

    if (!decode) {
      return res
        .status(400)
        .json({ message: "User is not found!", success: false });
    }

    const user = await User.findById(decode._id);
    req.user = user;
    next();
  } catch (err) {
    console.log(`Error: ${err}`);
    return res.status(400).json({ message: "Something went wrong!" , success: false});
  }
};

module.exports = auth;
