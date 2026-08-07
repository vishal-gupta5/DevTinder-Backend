// profile/view API

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
    if (!validateEditProfit(req)) {
      return res
        .status(400)
        .json({ message: "Invalid Edit Request!", status: false });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Something went wrong!", status: false });
  }
};

module.exports = { view };
