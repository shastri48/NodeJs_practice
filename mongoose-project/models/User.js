var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var userSchema = new Schema ({
  name: String,
  password:String,
  email: {type:String, required:true},
  contact: Number,
  age: Number,
  description: String
});

// middleware to hash a password
// hashing a password before it is saved.
userSchema.pre('save', function(next){
  var user = this;
  // this.password = bcrypt.hashSync(this.password, 10);
  bcrypt.hash(user.password, 10, (err,hash) => {
    if(err)next(err);
    user.password = hash;
    next();
  });
});

// function to compare password
// UserSchema.methods.comparePassword = function(candidatePassword, cb) {
//   bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
//       if (err) return cb(err);
//       cb(null, isMatch);
//   });
// };

  //   // fetch user and test password verification
  //   User.findOne({ username: 'jmar777' }, function(err, user) {
  //     if (err) throw err;

  //     // test a matching password
  //     user.comparePassword('Password123', function(err, isMatch) {
  //         if (err) throw err;
  //         console.log('Password123:', isMatch); // -> Password123: true
  //     });

  //     // test a failing password
  //     user.comparePassword('123Password', function(err, isMatch) {
  //         if (err) throw err;
  //         console.log('123Password:', isMatch); // -> 123Password: false
  //     });
  // });

var User = mongoose.model('User', userSchema);
module.exports = User;