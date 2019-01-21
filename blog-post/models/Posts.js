var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var slug = require('slug');




// schema for post
var postsSchema = new Schema ({
  title: String,
  description: String,
  likes: { type: [Schema.Types.ObjectId] },
  tags: [String],
  author: String,
  slug: {type:String, unique: true},
  comments:[{type: Schema.Types.ObjectId, ref: 'Comment'}]
}, { timestamps: { createdAt: 'created_at' } })


// pre hook for slug
postsSchema.pre('save', function (next) {
  this.slug = slug(this.title, {lower: true});
  next();
});

// model for post
var Posts = mongoose.model('Posts', postsSchema);
module.exports = Posts;
