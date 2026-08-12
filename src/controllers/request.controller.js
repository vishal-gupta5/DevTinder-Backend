const ConnectionRequest = require("../models/connections.model");
const User = require("../models/user.model");

const sendInterestedRequest = async (req, res) => {
  try {
    const fromUserId = req.user._id;
    const toUserId = req.params.toUserId;
    const status = req.params.status;

    const allowedStatus = ["ignored", "interested"];

    if (!allowedStatus.includes(status)) {
      return res
        .status(404)
        .json({ message: "Invalid status type: " + status, status: false });
    }

    const toUser = await User.findById(toUserId);
    if (!toUser) {
      return res
        .status(400)
        .json({ message: "User not found!", status: false });
    }

    // if there is an existing connectionRequest

    const existingConnectionRequest = await ConnectionRequest.findOne({
      $or: [
        { fromUserId, toUserId },
        { fromUserId: toUserId, toUserId: fromUserId },
      ],
    });

    if (existingConnectionRequest) {
      return res
        .status(400)
        .json({ message: "Connection Request Already Exist!" });
    }

    const connectionRequest = new ConnectionRequest({
      fromUserId,
      toUserId,
      status,
    });

    const data = await connectionRequest.save();

    return res.status(200).json({
      message: `${req.user.firstName} is ${status} in ${toUser.firstName}`,
      status: "true",
      data,
    });
  } catch (err) {
    console.log(err.message);
    return res
      .status(500)
      .json({ message: "Something went wrong!", status: false });
  }
};

const respondToInterestedRequest = async (req, res) => {
  try {
    const loggedInUser = req.user;

    const { status, requestId } = req.params;

    // Validate the status
    const allowedStatus = ["accepted", "rejected"];

    if (!allowedStatus.includes(status)) {
      return res
        .status(400)
        .json({ message: "Invalid status type!", status: false });
    }

    const connectionRequest = await ConnectionRequest.findOne({
      _id: requestId,
      toUserId: loggedInUser._id,
      status: "interested",
    });

    if (!connectionRequest) {
      return res
        .status(400)
        .json({ message: "Connection Request not found!", status: false });
    }

    connectionRequest.status = status;

    const data = await connectionRequest.save();

    return res
      .status(200)
      .json({ message: "Connection Request " + status, status: true});
  } catch (err) {
    console.log(err.message);
    return res
      .status(400)
      .json({ message: "Something went wrong!", status: false });
  }
};

module.exports = { sendInterestedRequest, respondToInterestedRequest };
