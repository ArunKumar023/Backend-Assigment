const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: String,
  price: String,
  description: String,
  reviews: Number,
  ratings: String,
  mediaCount: Number,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to the User model
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
