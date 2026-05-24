const express = require("express");
const config = require('./config/index')
const cors = require("cors");
require("dotenv").config();

const app = express();


// IMPORT ROUTES
const orderRoutes = require("./routes/orderRoutes");


// MIDDLEWARE
app.use(cors());
app.use(express.json());


// ROUTES
app.use("/api/orders", orderRoutes);



// SERVER
app.listen(config.PORT, () => {
    console.log(`Server Running On Port ${config.PORT}`);
});