const express = require('express');
const router = express.Router();
const CategoryController = require('../controller/categoryController');

router.get('/getCategoryByID/:id', CategoryController.getCategoryByID);
router.get('/getPostByCategoryID/:id', CategoryController.getPostByCategoryID);

module.exports = router;