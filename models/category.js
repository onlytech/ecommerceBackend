var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CategorySchema = new Schema({
  title: {
    type: String,
    required: false,
    unique: true,
  },
    description: {
    type: String
  },
  parentId: {
    type: Number,
    default: 0
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



module.exports = mongoose.model('Category', CategorySchema);

