const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({

  pname: {
    type: String
  },

  price: {
    type: Number
  },

  qty: {
    type: Number
  },

  company: {
    type: String
  },

  category: {
    type: String
  }

});

module.exports = mongoose.model('Product', productSchema);