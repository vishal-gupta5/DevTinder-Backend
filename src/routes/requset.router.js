const express = require("express");
const auth = require("../middlewares/auth");
const { sendInterestedRequest, respondToInterestedRequest } = require("../controllers/request.controller");
const requestRouter = express.Router();

requestRouter.post("/send/:status/:toUserId", auth, sendInterestedRequest);
requestRouter.post("/review/:status/:requestId", auth, respondToInterestedRequest);

module.exports = requestRouter;
