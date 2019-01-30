var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// schema for post
var posttagSchema = new Schema ({
  tag:{type: Schema.Types.ObjectId, ref: 'Tag'},
  post:{type: Schema.Types.ObjectId, ref: 'Posts'}
}, { timestamps: { createdAt: 'created_at' } })


// model for post
var posttag = mongoose.model('posttag', posttagSchema);
module.exports = posttag;
