const express = require("express");
const { feedUser, feed } = require("../controllers/feed.controller");
const feedRouter = express.Router();

feedRouter.get("/user", feedUser);
feedRouter.get("/feed", feed);

module.exports = feedRouter;
