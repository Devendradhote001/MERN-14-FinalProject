const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const { createPostController } = require("../controllers/posts.controllers");
const upload = require("../config/multer");

const router = express.Router();

router.post(
  "/create-post",
  authMiddleware,
  upload.array("images", 5),
  createPostController
);

module.exports = router;
