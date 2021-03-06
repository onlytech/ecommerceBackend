var mongoose = require('mongoose');
const product = require('./product');
const user = require('./user');
var Schema = mongoose.Schema;

var OrderSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  products:[
  {
    product:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product"
    },
    qte : {
      type: Number,
      default: 0
    }
}
],
  
 created_at: {
    type: Date,
    default: new Date()
  },
  updated_at: {
    type: Date,
    default: null
  },
  deleted_at: {
    type: Date,
    default: null
  },

});



module.exports = mongoose.model('Order', OrderSchema);



