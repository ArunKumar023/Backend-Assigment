const express = require('express');
const postController = require('../controllers/postController');
const jwtUtils = require('../utils/jwtUtils');

const router = express.Router();

router.post('/create-post', jwtUtils.verifyToken, postController.createPost);

module.exports = router;
