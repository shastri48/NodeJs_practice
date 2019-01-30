var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var moment = require('moment');
var bcrypt = require('bcrypt');
var postsController = require('../controller/posts');
var jwt = require('jsonwebtoken');
 


var Posts = mongoose.model('Posts');
var Comment = mongoose.model('Comment');
var User = mongoose.model('User');
var posttag = mongoose.model('posttag');



/* GET home page. */
router.get('/', postsController.isUser , function(req, res, next) {
  // jwt.verify(req.headers.token, 'shhhhh', (err, decoded) => {
  //   if(err) return next(err);
    // User.findById(decoded._id, (err, user) => {
      Posts.find({}).populate('author').exec((err, post) => {
        posttag.find({}).populate('tag').exec((err, tagslist) => {
          res.render('index', {posts:post, tagslist:tagslist,  moment:moment, messages: req.flash('info') });
        })
      })
      //   , (err, data) => {
      //   console.log(data);
      //   res.render('index', {posts:data, moment:moment, messages: req.flash('info') });
      // });
    // })
  // })
});

// login
router.get('/login', (req,res) => {
  res.render('login');
})

// post method for login
router.post('/login', (req,res) => {
  var { username, password } = req.body;
  User.findOne({username: username}, (err, user) => {
    if(err) return res.send(err);
    if(!user) return res.send(err);
    if(!bcrypt.compareSync(password, user.password)) {
      return res.send(err);
    };
    req.session.userId = user._id;
    // var token = jwt.sign({ UserId: user._id }, 'shhhhh');
    // res.json({token: token}); 
    res.redirect('/')
  });
});


// logout
router.get('/logout', (req,res) => {
  req.session.destroy();
  res.redirect('/');
})


module.exports = router;
