const express = require("express");
const {
  feedUser,
  feed,
  deleteUser,
  updateUser,
} = require("../controllers/feed.controller");
const feedRouter = express.Router();

feedRouter.get("/user", feedUser);
feedRouter.get("/feed", feed);
feedRouter.delete("/user", deleteUser);
feedRouter.patch("/user", updateUser);

module.exports = feedRouter;
