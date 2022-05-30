var express = require('express');
var router = express.Router();
var auth = require('../middleware/auth');
var productCtrl = require('../controllers/product');
var multer = require('../middleware/multer-config');


// Add Product
router.post('/addProduct', multer.array('files'), productCtrl.addProduct);

// Add Product and category in same time
router.post('/addProductCategory', auth, productCtrl.addProductAndCategroy);

// Update Product
router.put('/updateProduct/:id', auth, productCtrl.updateProduct);

// Get all Products
router.get('/getAllProducts', productCtrl.getAllProducts);

// Get Products By Category
router.get('/getProductsCategory/:id', productCtrl.getProductsByCategory);

// delete product
router.delete('/deleteProduct/:id', auth, productCtrl.deleteProduct);

module.exports = router;