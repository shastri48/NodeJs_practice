var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var postsController = require('../controller/posts');
var Posts = mongoose.model('Posts');
var User = mongoose.model('User');




// crete one post
router.get('/create', postsController.isUser, function(req, res, next) {
  res.render('create');
});


// crate new post
router.post('/new',  ( req, res ) => {
  var id = req.session.userId;
  var newPost = new Posts(req.body);
  newPost.author  = id;
  newPost.save((err) => {
    if(err) res.send(err);
    res.redirect('/');
  });
});

// making likes on individual post likes
router.get('/likes/:slug', postsController.isUser,  function(req, res, next) {
  var userId = req.session.userId;
  var slug = req.params.slug;
  Posts.findOne({slug:slug}, (err, data) => {
    let flag = true;
    data.likes.forEach(element => {
      if(element.toString() == userId.toString()) flag = false;
    });
    if(flag){
      Posts.findOneAndUpdate({slug:slug}, {$push:{likes:userId}}, (err, data) => {
        res.redirect('/');
      });
    }else if(!flag){
      Posts.findOneAndUpdate({slug:slug}, {$pull:{likes:userId}}, (err, data) => {
        res.redirect('/');
      });    
    } else {
      res.redirect('/');
    }
  })
});

// individual post description
router.get('/:slug',  postsController.isUser, postsController.getIndividualPost);

// comments
router.post('/:id/comment', postsController.addIndividualComment);

// delete particular comment
router.get('/comment/:id/delete', postsController.deleteIndividualComment);

// edit particular comment
router.get('/comment/:id/edit', postsController.editIndividualComment);


// editform submit of post comment particular comment
router.post('/comment/:id/edit', postsController.editPostComment);

// edit individual post form
router.get('/edit/:id', postsController.editIndividualPost);

// send individual edit post 
router.post('/edit/:id', postsController.editingIndividualPost);

// delete individual post
router.get('/delete/:id', postsController.deleteIndividualPost);


module.exports = router;
