const userModel = require("../models/user.model");

const registerController = async (req, res) => {
  try {
    let { fullName, username, email, password, mobile } = req.body;

    if (!fullName || !username || !email || !password || !mobile) {
      return res.status(422).json({
        message: "All fields are required",
      });
    }

    let existingUser = await userModel.findOne({
      $or: [{ email }, { mobile }, { username }],
    });

    if (existingUser) {
      return res.status(409).json({
        message: "User already exists",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error,
    });
  }
};
