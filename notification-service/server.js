require('dotenv').config();
const config = require('./config/index')
const express = require('express');
const { sendEmail } = require('./controllers/emailController');
const connectDB = require('./models/db')
const app = express()
app.use(express.json())

// endpoint
app.post('/notify/email', sendEmail)
connectDB()

app.listen(config.PORT, () => {
    console.log(`Notification service is running on port ${config.PORT}`)
})