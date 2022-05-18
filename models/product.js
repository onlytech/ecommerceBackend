var mongoose = require('mongoose');
const category = require('./category');
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
  title: {
    type: String,
    required: false,
    unique: true,
  },
    description: {
    type: String
  },
  price: {
    type: Number
  },
  picture: [{ 
    type: String
  }],
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category"
  },
  status: {
    type: String,
    default: "1"
  },
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



module.exports = mongoose.model('Product', ProductSchema);



