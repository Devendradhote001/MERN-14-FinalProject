const express = require("express");
const {
  createStoryController,
  viewsStoryController,
} = require("../controllers/story.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const upload = require("../config/multer");

const router = express.Router();

router.post(
  "/create",
  authMiddleware,
  upload.array("images", 5),
  createStoryController
);

router.get("/views/:id", authMiddleware, viewsStoryController);

module.exports = router;
