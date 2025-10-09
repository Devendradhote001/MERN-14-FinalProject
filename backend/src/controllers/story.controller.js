const StoryModel = require("../models/story.model");
const sendFiles = require("../services/storage.services");

const createStoryController = async (req, res) => {
  try {
    if (!req.files)
      return res.status(404).json({
        message: "Images must required",
      });

    let uploadedUrl = await Promise.all(
      req.files.map(
        async (elem) => await sendFiles(elem.buffer, elem.originalname)
      )
    );

    let newStory = await StoryModel.create({
      image: uploadedUrl.map((elem) => elem.url),
      user_id: req.user._id,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });

    return res.status(201).json({
      message: "Story uploaded",
      story: newStory,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error,
    });
  }
};

const viewsStoryController = async (req, res) => {
  try {
    let story_id = req.params.id;

    if (!story_id)
      return res.status(404).json({
        message: "Story id not found",
      });

    let story = await StoryModel.findOne({ _id: story_id });
    story.viewedBy.push(req.user._id);
    await story.save();

    return res.status(201).json({
      message: "Story uploaded",
      story: newStory,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error,
    });
  }
};

module.exports = {
  createStoryController,
  viewsStoryController,
};
