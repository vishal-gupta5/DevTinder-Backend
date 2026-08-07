const express = require("express");
const { view } = require("../controllers/profile.controller");
const auth = require("../middlewares/auth");
const profileRouter = express.Router();

profileRouter.get("/profile/view", auth, view);

module.exports = profileRouter;
