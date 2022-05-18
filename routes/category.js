var express = require('express');
var router = express.Router();
var auth = require('../middleware/auth');
var categoryCtrl = require('../controllers/category');

// Add Category
router.post('/addCategory', auth, categoryCtrl.addCategory);

// Update category
router.put('/updateCategory/:id', auth, categoryCtrl.updateCategory);

// Get all Categories
router.get('/getAllCategories', categoryCtrl.getAllCategories);


module.exports = router;