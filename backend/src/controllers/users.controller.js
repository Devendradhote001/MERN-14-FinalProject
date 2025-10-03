const UserModel = require("../models/user.model");

const followUserController = async (req, res) => {
  try {
    let user_id = req.params.user_id;

    if (!user_id)
      return res.status(404).json({
        message: "User id not found",
      });

    let currentUser = await UserModel.findById(req.user._id);
    currentUser.following.push(user_id);
    currentUser.save();

    let followedUser = await UserModel.findById(user_id);
    followedUser.followers.push(req.user._id);
    followedUser.save();

    return res.status(200).json({
      message: "Followed",
    });
  } catch (error) {
    return res.status(500).json({
      message: "internal server error",
      error: error,
    });
  }
};

const unfollowUserController = async (req, res) => {
  try {
    let user_id = req.params.user_id;

    if (!user_id)
      return res.status(404).json({
        message: "User id not found",
      });

    let currentUser = await UserModel.findById(req.user._id);
    currentUser.following.splice(user_id, 1);
    currentUser.save();

    let unfollowedUser = await UserModel.findById(user_id);
    unfollowedUser.followers.splice(req.user._id, 1);
    unfollowedUser.save();

    return res.status(200).json({
      message: "Unfollowed",
    });
  } catch (error) {
    return res.status(500).json({
      message: "internal server error",
      error: error,
    });
  }
};

const blockUserController = async (req, res) => {
  try {
    let user_id = req.params.user_id;

    if (!user_id)
      return res.status(404).json({
        message: "User id not found",
      });

    let currentUser = await UserModel.findById(req.user._id);
    currentUser.blockedUsers.push(user_id);
    currentUser.save();

    return res.status(200).json({
      message: "User Blocked",
    });
  } catch (error) {
    return res.status(500).json({
      message: "internal server error",
      error: error,
    });
  }
};

const getAllUsersController = async (req, res) => {
  try {
    let currentUser = req.user.id;

    let allUsers = await UserModel.find({ _id: { $ne: currentUser } });

    console.log(allUsers);

    return res.status(200).json({
      message: "fetched all users",
      allUsers: allUsers,
    });
  } catch (error) {
    return res.status(500).json({
      message: "internal server error",
      error: error,
    });
  }
};

module.exports = {
  followUserController,
  unfollowUserController,
  blockUserController,
  getAllUsersController,
};
