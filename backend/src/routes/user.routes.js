const express = require("express");
const {
  registerController,
  loginController,
  logoutController,
} = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/register", registerController);
// router.post("/forgot-password");
router.post("/login", loginController);
router.post("/logout", authMiddleware, logoutController);

module.exports = router;
