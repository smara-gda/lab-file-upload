const express = require('express');
const router = new express.Router();

const bcryptjs = require('bcryptjs');
const saltRounds = 10;
const User = require('../models/User.model');

const mongoose = require('mongoose');

const uploadMiddleware = require('./../middleware/file-upload');
const routeGuard = require('../configs/route-guard.config');
const postModel = require('../models/Post.model');

// the GET route to display the post-form
router.get('/create-post', routeGuard, (req, res, next) => {
  res.render('users/new-post');
});

// the POST route to actually create the post (this route should include file uploading),
router.post('/create-post', routeGuard, uploadMiddleware.single('picPath'), (req, res, next) => {
  const data = req.body;
  let image;
  if (req.file) {
    image = req.file.path;
  }
  postModel
    .create({
      content: data.content,
      picName: data.picName,
      picPath: image,
      /*creatorId does not get stored in dB, 
       below does not seem to work but also does not stop me from creating a post*/
      creatorId: req.session._id
    })
    .then(post => {
      res.render('index', { post });
    })
    .catch(error => {
      next(error);
    });
});

// the GET route to display the posts and

router.get('/posts', (req, res, next) => {
  postModel
    .find()
    .populate('creatorId')
    .then(posts => {
      console.log(posts);
      res.render('posts', { posts });
    })
    .catch(error => {
      next(error);
    });
});
// the GET route to display post-details.

module.exports = router;
