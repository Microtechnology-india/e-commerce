const mongoose = require("mongoose");
require("dotenv").config();
const config = require('../config/index')

// ================= DATABASE CONNECTION =================

mongoose.connect(config.MONGO_URI)
    .then(() => {
        console.log("MongoDB Connected");
    })
    .catch((error) => {
        console.log("Database Error:", error);
    });


// ================= ORDER SCHEMA =================

const orderSchema = new mongoose.Schema({

    productName: {
        type: String,
        required: true
    },

    quantity: {
        type: Number,
        required: true
    },

    price: {
        type: Number,
        required: true
    }

}, {
    timestamps: true
});


// ================= COLLECTION =================

// Collection Name = orders

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;