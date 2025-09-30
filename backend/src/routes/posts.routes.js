const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const {
  createPostController,
  getAllPostsController,
  deletePostController,
  updatePostController,
  getPostOfLoggedInUser,
  likesController,
  unLikesController,
} = require("../controllers/posts.controllers");
const upload = require("../config/multer");

const router = express.Router();

router.post(
  "/create-post",
  authMiddleware,
  upload.array("images", 5),
  createPostController
);

router.post("/update", authMiddleware, updatePostController);

router.get("/allPosts", authMiddleware, getAllPostsController);

router.get("/user-posts", authMiddleware, getPostOfLoggedInUser);

router.get("/delete/:post_id", authMiddleware, deletePostController);

router.get("/like/:post_id", authMiddleware, likesController);

router.get("/unlike/:post_id", authMiddleware, unLikesController);

module.exports = router;
