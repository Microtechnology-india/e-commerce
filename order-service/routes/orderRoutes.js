const express = require("express");

const router = express.Router();

const {
    createOrder,
    getOrders,
    getSingleOrder,
    updateOrder,
    deleteOrder
} = require("../controllers/orderController");


// CREATE
router.post("/", createOrder);


// READ ALL
router.get("/", getOrders);


// READ SINGLE
router.get("/:id", getSingleOrder);


// UPDATE
router.put("/:id", updateOrder);


// DELETE
router.delete("/:id", deleteOrder);


module.exports = router;