var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');


// schema for post
var User = new Schema ({
  username: {type:String, unique:true },
  email: {type:String, unique:true },
  password: {type:String, minlength:6}
}, { timestamps: { createdAt: 'created_at' } })


// hashing of password

User.pre('save', function(next){
  var user = this;
  if(this.password){
    bcrypt.hash(user.password, 10, (err,hash) => {
      if(err)next(err);
      user.password = hash;
      next();
    });
  }
  else next();
});

// model for post
var User = mongoose.model('User', User);
module.exports = User;
