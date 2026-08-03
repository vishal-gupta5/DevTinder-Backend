const profile = async (req, res) => {
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

module.exports = { profile };
