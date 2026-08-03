const express = require("express");
const { profile } = require("../controllers/profile.controller");
const auth = require("../middlewares/auth");
const profileRouter = express.Router();

profileRouter.get("/profile", auth, profile);

module.exports = profileRouter;
