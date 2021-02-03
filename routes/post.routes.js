const express = require('express');
const router = new express.Router();

const bcryptjs = require('bcryptjs');
const saltRounds = 10;
const User = require('../models/User.model');

const mongoose = require('mongoose');

const uploadMiddleware = require('./../middleware/file-upload');
const routeGuard = require('../configs/route-guard.config');

const PostModel = require('../models/Post.model');

// the GET route to display the post-form
router.get('/create-post', routeGuard, (req, res, next) => {
  res.render('new-post');
});

// the POST route to actually create the post (this route should include file uploading),
router.post('/create-post', routeGuard, uploadMiddleware.single('picPath'), (req, res, next) => {
  const data = req.body;
  let picPath;
  if (req.file) {
    picPath = req.file.path;
  }
  console.log(req.file);
  PostModel.create({
    content: data.content,
    picName: data.picName,
    creatorId: req.session.currentUser._id,
    picPath
  })
    .then(post => {
      res.render('index', { post });
    })
    .catch(error => {
      next(error);
    });
});

// the GET route to display the posts

router.get('/posts', (req, res, next) => {
  PostModel.find()
    .populate('creatorId')
    .then(post => {
      console.log(post);
      res.render('posts', { post });
    })
    .catch(error => {
      next(error);
    });
});
// the GET route to display post-details.

router.get('/post/:id', (req, res, next) => {
  const id = req.params.id;
  PostModel.findById(id)
    .then(result => {
      res.render('posts/single-post', { result });
    })
    .catch(error => {
      next(error);
    });
});

module.exports = router;
