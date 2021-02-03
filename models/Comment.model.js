const mongoose = require('mongoose');

const { Schema, model } = require('mongoose');

const commentSchema = new Schema({
  content: {
    type: String
  },
  authorId: {
    type: mongoose.Types.ObjectId
  },
  imagePath: {
    type: String
  },
  imageName: {
    type: String
  }
});

module.exports = model('Comment', commentSchema);
