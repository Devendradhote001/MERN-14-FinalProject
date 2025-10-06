const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    imageUrl: {
      type: [String],
      required: true,
    },
    location: {
      type: String,
    },
    caption: {
      type: String,
    },
    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    expiresAt: {
      type: Date,
      default: () => Date.now() + 24 * 60 * 60 * 1000, // expires after 24 hrs
    },
  },
  {
    timestamps: true,
  }
);

postSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const PostModel = mongoose.model("posts", postSchema);
module.exports = PostModel;
