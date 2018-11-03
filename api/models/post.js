const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  title: {
    type: String,
    required: true
  },
  content: String,
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
},
{
  usePushEach: true
});

module.exports = mongoose.model('Post', PostSchema);
