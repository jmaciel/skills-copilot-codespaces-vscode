// Create web server
// GET /comments
// GET /comments/new
// POST /comments
// GET /comments/:id
// GET /comments/:id/edit
// PUT /comments/:id
// DELETE /comments/:id
var express = require('express');
var router = express.Router();

var Comment = require('../models/comment');
var User = require('../models/user');
var Post = require('../models/post');

// GET /comments
router.get('/', function(req, res, next) {
  Comment.find({}, function(err, comments) {
    if (err) {
      return next(err);
    }
    res.render('comments/index', { comments: comments });
  });
});

// GET /comments/new
router.get('/new', function(req, res, next) {
  User.find({}, function(err, users) {
    if (err) {
      return next(err);
    }
    Post.find({}, function(err, posts) {
      if (err) {
        return next(err);
      }
      res.render('comments/new', { users: users, posts: posts });
    });
  });
});

// POST /comments
router.post('/', function(req, res, next) {
  var comment = new Comment({
    content: req.body.content,
    user: req.body.user,
    post: req.body.post
  });
  comment.save(function(err) {
    if (err) {
      return next(err);
    }
    res.redirect('/comments');
  });
});

// GET /comments/:id
router.get('/:id', function(req, res, next) {
  Comment.findById(req.params.id, function(err, comment) {
    if (err) {
      return next(err);
    }
    if (!comment) {
      return next(404);
    }
    res.render('comments/show', { comment: comment });
  });
});

// GET /comments/:id/edit
router.get('/:id/edit', function(req, res, next) {
  Comment.findById(req.params.id, function(err, comment) {
    if (err) {
      return next(err);
    }
    if (!comment) {
      return next(404);
    }
    User.find({}, function(err, users) {
      if (err) {
        return next(err);
      }
      Post.find({}, function(err, posts) {
        if (err) {
          return next(err);
        }
        res.render('comments/edit', { comment: comment, users: users, posts: posts