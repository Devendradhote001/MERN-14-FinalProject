const express = require("express");
const authRoutes = require("./routes/auth.routes");
const postroutes = require("./routes/posts.routes");
const usersRoutes = require("./routes/users.routes");
const chatRoutes = require("./routes/chat.routes");
const storyRoutes = require("./routes/story.routes");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const path = require("path");
const authMiddleware = require("./middlewares/auth.middleware");
const {
  getAllFollowersForChatController,
} = require("./controllers/chat.controller");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/post", postroutes);
app.use("/api/users", usersRoutes);
app.use("/api/chats", chatRoutes);
app.use("/api/story", storyRoutes);

module.exports = app;
