const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  author: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String, // This will store the URL/path to the image
  },
});

module.exports = mongoose.model("article", articleSchema);
