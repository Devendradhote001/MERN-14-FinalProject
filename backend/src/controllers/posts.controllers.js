const PostModel = require("../models/post.model");
const UserModel = require("../models/user.model");
const sendFiles = require("../services/storage.services");

const getAllPostsController = async (req, res) => {
  try {
    let posts = await PostModel.find({});

    if (!posts)
      return res.status(404).json({
        message: "Posts not found",
      });

    return res.status(200).json({
      message: "All posts",
      posts: posts,
    });
  } catch (error) {
    console.log("error in get all post->", error);

    return res.status(500).json({
      message: "Internal server error",
      error: error,
    });
  }
};

const getPostOfLoggedInUser = async (req, res) => {
  try {
    let user_id = req.user._id;

    if (!user_id)
      return res.status(404).json({
        message: "User Id not found",
      });

    // let loggedinUserPosts = await PostModel.find({
    //   _id: user_id,
    // });

    let loggedinUserPosts = await UserModel.findById(req.user._id).populate(
      "posts"
    );

    return res.status(200).json({
      message: "User posts found",
      userPosts: loggedinUserPosts,
    });
  } catch (error) {
    console.log("error in cLoggedin user post->", error);

    return res.status(500).json({
      message: "Internal server error",
      error: error,
    });
  }
};

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

    const user = await UserModel.findById(req.user._id);
    user.posts.push(newPost._id);
    await user.save();

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

const updatePostController = async (req, res) => {
  try {
    let { post_id, location, caption, url, tags } = req.body;

    let updatePost = await PostModel.findByIdAndUpdate(
      {
        _id: post_id,
      },
      {
        location,
        caption,
        imageUrl: url,
        tags,
      },
      {
        new: true,
      }
    );

    if (!updatePost)
      return res.status(400).json({
        message: "Bad request, failed to update post",
      });

    return res.status(200).json({
      message: "Post updated",
      updatedPost: updatePost,
    });
  } catch (error) {
    console.log("error in update post->", error);

    return res.status(500).json({
      message: "Internal server error",
      error: error,
    });
  }
};

const deletePostController = async (req, res) => {
  try {
    let post_id = req.params.post_id;

    if (!post_id)
      return res.status(404).json({
        message: "Post id not found",
      });

    await PostModel.findByIdAndDelete(post_id);

    return res.status(200).json({
      message: "Post deleted successfully",
    });
  } catch (error) {
    console.log("error in delete post->", error);

    return res.status(500).json({
      message: "Internal server error",
      error: error,
    });
  }
};

const likesController = async (req, res) => {
  try {
    let post_id = req.params.post_id;

    if (!post_id)
      return res.status(404).json({
        message: "PostId not found",
      });

    let currentPost = await PostModel.findById(post_id);
    currentPost.likes.push(req.user._id);
    currentPost.save();

    return res.status(200).json({
      message: "post liked",
    });
  } catch (error) {
    console.log("error in delete post->", error);

    return res.status(500).json({
      message: "Internal server error",
      error: error,
    });
  }
};

const unLikesController = async (req, res) => {
  try {
    let post_id = req.params.post_id;

    if (!post_id)
      return res.status(404).json({
        message: "PostId not found",
      });

    let currentPost = await PostModel.findById(post_id);
    currentPost.likes.splice(req.user._id, 1);
    currentPost.save();

    return res.status(200).json({
      message: "post Unliked",
    });
  } catch (error) {
    console.log("error in delete post->", error);

    return res.status(500).json({
      message: "Internal server error",
      error: error,
    });
  }
};

module.exports = {
  createPostController,
  getAllPostsController,
  getPostOfLoggedInUser,
  updatePostController,
  deletePostController,
  likesController,
  unLikesController,
};
