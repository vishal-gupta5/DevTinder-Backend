const express = require("express");
const { feed } = require("../controllers/feed.controller");
const feedRouter = express.Router();

feedRouter.get("/user", feed);

module.exports = feedRouter;