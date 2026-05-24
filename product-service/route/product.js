const express = require('express')


const { getProducts } = require('../controller/product')
const productRouter = express.Router()


productRouter.get("/product", getProducts)


module.exports = { productRouter }