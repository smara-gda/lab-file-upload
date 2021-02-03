const express = require('express');
const router = new express.Router();
const uploadMiddleware = require('./../middleware/file-upload');
const routeGuard = require('../configs/route-guard.config');

const Comment = require('../models/Comment.model');

module.exports = router;
