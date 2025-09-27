const PostModel = require("../models/post.model");
const UserModel = require("../models/user.model");
const sendFiles = require("../services/storage.services");

const createPostController = async (req, res) => {
  try {
    let { location, caption, tags } = req.body;

    if (!req.files)
      return req.status(404).json({
        message: "Image is required",
      });

    let uploadedUrlArr = await Promise.all(
      req.files.map(
        async (elem) => await sendFiles(elem.buffer, elem.originalname)
      )
    );

    let newPost = await PostModel.create({
      user_id: req.user._id,
      location,
      caption,
      imageUrl: uploadedUrlArr.map((file) => file.url),
      tags,
    });

    let updateUserPosts = await UserModel.findByIdAndUpdate(req.user._id, {
      posts: newPost._id,
    });

    if (!newPost)
      return res.status(400).json({
        message: "bad request",
      });

    return res.status(201).json({
      message: "Post created successfully",
      post: newPost,
    });
  } catch (error) {
    console.log("error in create post->", error);

    return res.status(500).json({
      message: "Internal server error",
      error: error,
    });
  }
};

module.exports = {
  createPostController,
};
