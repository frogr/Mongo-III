const mongoose = require('mongoose');
const CommentSchema = require('../models/commentModels');

const PostSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  comments: [CommentSchema]
});

module.exports = mongoose.model('Post', PostSchema);
