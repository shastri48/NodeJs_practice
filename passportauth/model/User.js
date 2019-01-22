var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');


// schema for post
var User = new Schema ({
  username: {type:String, unique:true ,required:true},
  email: {type:String, unique:true ,required:true},
  password: {type:String, minlength:6, required:true}
}, { timestamps: { createdAt: 'created_at' } })


// hashing of password

User.pre('save', function(next){
  var user = this;
  bcrypt.hash(user.password, 10, (err,hash) => {
    if(err)next(err);
    user.password = hash;
    next();
  });
});

// model for post
var User = mongoose.model('User', User);
module.exports = User;
