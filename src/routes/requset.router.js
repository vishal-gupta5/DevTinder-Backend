const express = require("express");
const auth = require("../middlewares/auth");
const { send } = require("../controllers/request.controller");
const requestRouter = express.Router();

requestRouter.post("/send/:status/:toUserId", auth, send);

module.exports = requestRouter;
