var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// schema for post
var commentSchema = new Schema ({
  comment__description: String,
  author: String,
  post: {type:Schema.Types.ObjectId, ref:'Posts'}
}, { timestamps: { createdAt: 'created_at' } })

// model for post
var Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
