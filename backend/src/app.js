const express = require("express");
const authRoutes = require("./routes/auth.routes");
const postroutes = require("./routes/posts.routes");
const usersRoutes = require("./routes/users.routes");
const chatRoutes = require("./routes/chat.routes");
const storyRoutes = require("./routes/story.routes");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
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

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log("your profile", profile);
        return done(null, profile);
      } catch (error) {
        console.log("error in google strategy", error);
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

app.use("/api/auth", authRoutes);
app.use("/api/post", postroutes);
app.use("/api/users", usersRoutes);
app.use("/api/chats", chatRoutes);
app.use("/api/story", storyRoutes);

module.exports = app;
