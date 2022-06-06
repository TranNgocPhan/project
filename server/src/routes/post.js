const express = require('express');
const router = express.Router();
const PostController = require('../controller/postController');

router.get('/:id', PostController.getPostByCategoryID);

module.exports = router;