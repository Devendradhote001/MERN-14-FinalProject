const express = require("express");
const {
  registerController,
  loginController,
  logoutController,
  forgotPasswordController,
} = require("../controllers/auth.controller");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/auth.middleware");

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

router.post("/update-password/:id", (req, res) => {
  let id = req.params.id;
  let password = req.body.password;

  console.log("user password", password, id);

  return res.send("ok");
});

router.post("/register", registerController);
router.post("/forgot-password", forgotPasswordController);
router.post("/login", loginController);
router.post("/logout", authMiddleware, logoutController);

module.exports = router;
