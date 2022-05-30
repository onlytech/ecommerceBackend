const jwt = require('jsonwebtoken');
const Product = require('../models/product');
const User = require('../models/user');
const Order = require('../models/order');
const mongojs = require('mongojs');
const ObjectId = mongojs.ObjectId;

const fs = require('fs');

// add order
exports.addOrder = (req, res, next) => {
  
  var newOrder = new Order({
    userId: req.body.userId,
    products: req.body.products
  });
  // save the order
    newOrder.save(function (err) {
    if (err) {
      return res.json({ success: false, msg: 'Problem occurs' }); //If product exists already
    }
    res.json({ success: true, msg: 'Successful created new order.', data: newOrder });  //creation successfull
  });
}
