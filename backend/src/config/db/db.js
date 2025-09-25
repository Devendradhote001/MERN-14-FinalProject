const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    let res = await mongoose.connect("mongodb://0.0.0.0/insta-clone");
    if (res) {
      console.log("MongoDB connected");
    }
  } catch (error) {
    console.log("error in co0nnecting DB", error);
  }
};

module.exports = connectDB;
