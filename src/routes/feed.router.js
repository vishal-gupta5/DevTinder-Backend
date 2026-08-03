const express = require("express");
const {
  feedUser,
  feed,
  deleteUser,
  updateUser,
  feedUserById,
} = require("../controllers/feed.controller");
const auth = require("../middlewares/auth");
const feedRouter = express.Router();

feedRouter.get("/user", feedUser);
feedRouter.get("/feed", feed);
feedRouter.delete("/user", deleteUser);
feedRouter.patch("/user/:id", updateUser);
feedRouter.get("/userById", feedUserById);

module.exports = feedRouter;
