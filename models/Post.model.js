// models/User.model.js

const mongoose = require('mongoose');
const { Schema, model } = require('mongoose');

const postSchema = new Schema({
  content: {
    type: String
  },
  creatorId: {
    type: mongoose.Types.ObjectId,
    ref: 'User'
  },
  picPath: {
    type: String
  },
  picName: {
    type: String
  }
});

module.exports = model('Post', postSchema);
