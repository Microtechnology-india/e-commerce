const express = require('express');
const connectDB = require('./model/dbConnect')
const config = require('./config/index')
const app = express();
require('dotenv').config();
const port = 'process.env.PORT';
const { productRouter } = require('./route/product');


app.use(express.json())
app.use('/', productRouter);
app.get('/health', (req, res) => res.json({ message: 'running' }))

app.listen(config.PORT, () => console.log(`Server is running on ${config.PORT}`))