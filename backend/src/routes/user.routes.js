const express = require("express");
const {
  registerController,
  loginController,
  logoutController,
  forgotPasswordController,
} = require("../controllers/auth.controller");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/auth.middleware");
const UserModel = require("../models/user.model");

const router = express.Router();

router.get("/reset-password/:token", (req, res) => {
  let token = req.params.token;

  if (!token)
    return res.status(403).json({
      message: "Token not found, BAD request",
    });

  let decode = jwt.verify(token, process.env.JWT_RAW_SECRET);

  res.render("index.ejs", { user_id: decode.id });
});

router.post("/update-password/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let password = req.body.password;
    console.log(password);

    if (!id)
      return res.status(404).json({
        message: "Bad request",
      });

    let updateUser = await UserModel.findByIdAndUpdate(
      { _id: id },
      {
        password,
      }
    );

    return res.status(200).json({
      message: "Password updated",
      user: updateUser,
    });
  } catch (error) {
    console.log("error in update pass - >", error);
    return res.status(500).json({
      message: "internal server error",
      error: error,
    });
  }
});

router.post("/register", registerController);
router.post("/forgot-password", forgotPasswordController);
router.post("/login", loginController);
router.post("/logout", authMiddleware, logoutController);

module.exports = router;
