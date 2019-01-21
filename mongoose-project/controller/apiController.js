var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');


router.get('/users', (req,res) => {
  User.find({}, (err, data) => {
    res.json({users:data});
  });
});

router.get('/:id', (req,res) => {
  User.find(req.params.id, (err, data) => {
    res.json({user:data});
  });
});



module.exports = router;
