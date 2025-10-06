const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const {
  getAllFollowersForChatController,
} = require("../controllers/chat.controller");

const router = express.Router();

router.get("/all-followings", authMiddleware, getAllFollowersForChatController);

module.exports = router;
