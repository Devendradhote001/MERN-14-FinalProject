const UserModel = require("../models/user.model");

const getAllFollowersForChatController = async (req, res) => {
  try {
    let allFollowersForChat = await UserModel.findOne({
      _id: req.user._id,
    }).populate("following");

    if (allFollowersForChat.following.length === 0) {
      return res.status(400).json({
        message: "No following found",
      });
    }

    return res.status(200).json({
      message: "Followings fetched",
      allFollowing: allFollowersForChat,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error,
    });
  }
};

module.exports = {
  getAllFollowersForChatController,
};
