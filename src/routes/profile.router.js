const express = require("express");
const { view, edit } = require("../controllers/profile.controller");
const auth = require("../middlewares/auth");
const profileRouter = express.Router();

profileRouter.get("/view", auth, view);
profileRouter.patch("/edit", auth, edit);

module.exports = profileRouter;
