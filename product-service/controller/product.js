const Product = require('../model/productModel');

const getProducts = async (req, res) => {

  try {

    const data = await Product.find();

    res.status(200).json({
      success: true,
      products: data
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: 'Server Error'
    });

  }

};

module.exports = {
  getProducts
};