var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
// var User = require('../models/User');

// checking database in console
// User.find({}, (err,data) => { 
//   console.log(data);
// })

/* GET users listing. */
router.get('/', function (req, res, next) {
  User.find((err, data) => {
    if (err) return err;
    res.render('users', {
      users: data
    });
  })
});





// register new user
router.get('/new', function (req, res, next) {
  res.render('form');
});

// show one user details
router.get('/:id', function (req, res, next) {
  var id = req.params.id;
  User.findById(id, (err, data) => {
    if (err) res.send(err);
    res.render('user', {
      user: data
    });
  })
});

// delete individual user
router.get('/delete/:id', function (req, res, next) {
  var id = req.params.id;
  User.remove({
    _id: id
  }, (err) => {
    if (err) return err;
    res.redirect('/users');
  })
});

// edit individual user
router.get('/edit/:id', function (req, res, next) {
  var id = req.params.id;
  User.findById(id, (err, data) => {
    if (err) res.send(err);
    res.render('editform', {
      user: data
    });
  })
});

// post individual edit data
router.post('/editdata/:id', function (req, res, next) {
  var id = req.params.id;
  User.findOneAndReplace({
    _id: id
  }, req.body, (err) => {
    if (err) res.send(err);
    res.redirect('/users');
  })
});


module.exports = router;