var express = require('express');
var router = express.Router();
var auth = require('../middleware/auth');
var ordersCtrl = require('../controllers/order');


// Add Order
router.post('/addOrder',auth, ordersCtrl.addOrder);


module.exports = router;