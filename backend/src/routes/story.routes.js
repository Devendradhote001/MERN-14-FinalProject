const express = require("express");
const {
  createStoryController,
  viewsStoryController,
  getAllStoriesController,
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
router.get("/stories", authMiddleware, getAllStoriesController);

module.exports = router;
