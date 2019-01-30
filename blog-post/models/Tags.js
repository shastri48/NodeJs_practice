var mongoose = require('mongoose');
var Schema = mongoose.Schema;




// schema for post
var tagsSchema = new Schema ({
  title: String,
}, { timestamps: { createdAt: 'created_at' } })

  

// model for post
var Tag = mongoose.model('Tag', tagsSchema);
module.exports = Tag;
