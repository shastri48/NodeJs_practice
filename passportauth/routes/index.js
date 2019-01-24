var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../model/User');
var jwt = require('jsonwebtoken');



/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.session);
  res.render('index', { title: 'Express' });
});

// get request to register
router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Express' });
});

// post request to register
router.post('/register', function(req, res, next) {
  console.log(req.body);
  console.log(req.session);

  var newUser = new User(req.body);
  newUser.save((err) => {
    if(err)console.log(err) 
    console.log('could not save')
  })
  res.render('register', { title: 'Express' });
});
// post request to register
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Express' });
});

// get random number between max and min number
router.get('/random/:num1/:num2', (req,res) => {
  var num1 = req.params.num1;
  var num2 = req.params.num2;
  var random;
    // if(num1==NaN)res.json({random:`${req.params.num1} is not number`})
    // if(num2==NaN)res.json({random:`${req.params.num2} is not number`})
    if(num1.match(/\d/g).length==num1.length){
      console.log('num1 is number')
    } else console.log('num1 is not number')

    if(num1==num2)res.json({random:'Both numbers are equal'})
    if(num1>num2){
      var random = (Math.random() * (num1-num2+1)) + num2;
      console.log(random);
    } else {
      var random = (Math.random() * (num2-num1+1)) + num1;
    }
    res.json({random:random})
})


// post request to register
router.get('/logout', (req,res) => {
  req.session.destroy();
  res.redirect('/')
})

router.post('/login', passport.authenticate('local', 
  { successRedirect: '/',
    failureRedirect: '/login',
  })
);

router.get('/auth/github',
  passport.authenticate('github'));

router.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    // success msg here
    res.redirect('/');
  });



module.exports = router;
