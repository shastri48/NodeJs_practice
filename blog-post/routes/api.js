var express = require('express');
var router = express.Router();



// router.use((req, res, next) => {



//   next()
// });

// var isAuthorized = (req, res, next() => {

// });

// router.get('/posts', isAuthorized,  )
// router.get('/post/:id/comments', )
router.get('/users', (req, res) => {
  console.log(req.session)
  res.send(req.session);
})
// router.get('/me', )


module.exports = router;

