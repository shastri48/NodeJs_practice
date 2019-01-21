var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');


/* GET register page. */
router.get('/', function(req, res, next) {
  res.render('register');
});

// post request for new user
router.post('/new', function(req, res, next) {
  var newUser = new User(req.body);
  newUser.save((err) => {
    if(err) res.send(err);
    res.redirect('/login');
  });
});


module.exports = router;
