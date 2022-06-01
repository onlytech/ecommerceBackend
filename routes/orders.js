var express = require('express');
var router = express.Router();
var auth = require('../middleware/auth');
var ordersCtrl = require('../controllers/order');


// Add Order
router.post('/addOrder', ordersCtrl.addOrder);
// edit Order
router.post('/updateOrder', ordersCtrl.updateOrder);
// Orders list
router.post('/ordersList', ordersCtrl.ordersList);


module.exports = router;