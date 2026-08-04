const express = require("express");
const { signup, login, logout } = require("../controllers/auth.controller");
const auth = require("../middlewares/auth");
const authRouter = express.Router();

authRouter.post("/signup", signup);
authRouter.post("/login",  login);
authRouter.post("/logout", logout);

module.exports = authRouter;
