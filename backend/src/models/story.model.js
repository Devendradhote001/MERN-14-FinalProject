const mongoose = require("mongoose");

const storySchema = new mongoose.Schema(
  {
    image: [
      {
        type: String,
        required: true,
      },
    ],
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
    viewedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
  },
  {
    timestamps: true,
  }
);

storySchema.index({ expiresAt: 1 }, { expireAfterSeconds: 86400 });

const StoryModel = mongoose.model("Story", storySchema);
module.exports = StoryModel;
