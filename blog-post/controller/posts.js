var Posts = require('../models/Posts');
var User = require('../models/User');
var Comment = require('../models/Comment');
var moment = require('moment');
var slug = require('slug');





// middleware for checking logged in 
var isUser = (req, res, next) => {
  if(req.session.userId){
    User.findById(req.session.userId, (err, user) => {
      res.locals.user = user;
      next();
    })
  } else{
    next();
  }
}

// individual post display
var getIndividualPost = function(req, res, next) {
  var userId = req.session.userId;
  var slug = req.params.slug;
  Posts.findOne({slug:slug}, (err, post) => {
    Posts.findOne({slug: slug}).populate({path:'comments author',populate: [{path:'author', model:'User'}] }).exec((err,data) => {
      if(post.author==userId){
        res.render('post', {post:data, moment:moment, editPost:1});
      } else{
        res.render('post', {post:data, moment:moment, editPost:0});
      }
    });
  })
}

// add individual comment
var addIndividualComment = function(req, res, next) {
  var userId = req.session.userId;
  var comment= new Comment(req.body);
  var id = req.params.id;
  comment.author = userId;
  comment.save((err) => {
    if(err) res.send(err);

    Posts.findByIdAndUpdate(id, {$push: {comments: comment.id}} ,(err, data) => {
      if(err) res.send(err);
      res.redirect(`/posts/${data.slug}`);
    });
  });
}



// delete individual comment
var deleteIndividualComment = (req,res) => {
  var userId = req.session.userId;
  var id = req.params.id;
  Comment.findByIdAndDelete(id, (err,data) => {
    var postId = data.post;
    Posts.findByIdAndUpdate(postId, {$pull:{comments:data.id}},{new:true},(err, data) => {
      res.redirect(`/posts/${data.slug}`);
    });
  });
}

// edit individual comment
var editIndividualComment = (req, res) => {
  var id = req.params.id;
  Comment.findById(id, (err, data) => {
    res.render('partials/commentEdit', {comment: data});
  });
}

// post method for editing individual post's comment
var editPostComment = (req, res) => {
  var id = req.params.id;
  Comment.findByIdAndUpdate(id, req.body,{new: true},(err, data) => {
    Posts.findById(data.post, (err, post) => {
      res.redirect(`/posts/${post.slug}`)
    })
  });
};


// edit individual post
var editIndividualPost = function(req, res, next) {
  var id = req.params.id;
  Posts.findById(id, (err, data) => {
    res.render('updatepost', {post:data});
  })
}

// post method for editing individual post
var editingIndividualPost = function(req, res, next) {
  var id = req.params.id;
  req.body.slug = slug(req.body.title);
  Posts.findOneAndUpdate({_id:id},req.body,{new:true},(err,data) => {
    res.redirect(`/posts/${data.slug}`);
  })
}


// delete individual post
var deleteIndividualPost = function(req, res, next) {
  var id = req.params.id;
  Posts.findByIdAndRemove(id, (err,data) => {
    Comment.deleteMany({post:id}, (err, data)=> {
      if(err)res.send(err);
      res.redirect('/');
    });
  });
}



module.exports = {
  getIndividualPost,
  addIndividualComment,
  deleteIndividualComment,
  editIndividualComment,
  editPostComment,
  editIndividualPost,
  editingIndividualPost,
  deleteIndividualPost,
  isUser
};
