const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const {
  followUserController,
  unfollowUserController,
  blockUserController,
  getAllUsersController,
} = require("../controllers/users.controller");

const router = express.Router();

router.get("/", authMiddleware, getAllUsersController);

router.get("/follow/:user_id", authMiddleware, followUserController);
router.get("/unfollow/:user_id", authMiddleware, unfollowUserController);
router.get("/block/:user_id", authMiddleware, blockUserController);
// router.get("/unblock/:user_id");

module.exports = router;
