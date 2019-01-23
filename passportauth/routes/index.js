var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../model/User')


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
