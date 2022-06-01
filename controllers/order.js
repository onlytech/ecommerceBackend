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



// order update data  
exports.updateOrder = async (req, res, next) => {

  const filter = { _id: req.body.orderId };
  const update = {
    userId: req.body.userId,
    products: req.body.products
  };

  Order.findOneAndUpdate(filter, update).then((order) => {

    res.status(200).json({ success: true, msg: 'Successful update order', dataBeforeUpdate: order, data: update });
  }
  ).catch((error,) => {
    res.status(400).json({ success: false, msg: 'Failed to update order', error: error });
  })

}

// 
exports.ordersList = (req, res, next) => {
  Order.find({userId: req.body.id}).populate('products').then(orders => {
    res.send(orders);
  }).catch(err => {
    console.log('ERROR', err)
    res.status(401).json({
      error: err
    });
  })
};



