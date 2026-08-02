const express = require("express");
const {
  feedUser,
  feed,
  deleteUser,
} = require("../controllers/feed.controller");
const feedRouter = express.Router();

feedRouter.get("/user", feedUser);
feedRouter.get("/feed", feed);
feedRouter.delete("/user", deleteUser);

module.exports = feedRouter;
