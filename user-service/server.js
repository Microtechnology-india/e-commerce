require('dotenv').config();
const express = require('express');
const cors = require('cors');
const config = require('./config/index')
const authRoutes = require('./routes/authRoutes');
const connectDB = require('./db/db');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => res.send('service running.'))
app.use('/', authRoutes);

connectDB();

app.listen(config.PORT, () => {
    console.log(`Auth Service Running on ${config.PORT}`);
});