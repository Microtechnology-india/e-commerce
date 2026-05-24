const express = require('express')
const cors = require('cors')
require('dotenv').config()
const config = require('./config/index')
const app = express()
// app.use(express.json())
app.use(cors())
const userRoutes = require('./routes/user-route')
const productRoutes = require('./routes/product-route')
const paymentRoutes = require('./routes/payment-route')
const orderRoutes = require('./routes/order-route')
const notificationRoutes = require('./routes/notification-route')

userRoutes(app)
productRoutes(app)
paymentRoutes(app)
orderRoutes(app)
notificationRoutes(app)


app.listen(config.PORT, () => {
    console.log(`server started on port ${config.PORT}`)
})