const Order = require("../models/Order");


// CREATE ORDER
const createOrder = async (req, res) => {
    try {

        const newOrder = await Order.create(req.body);

        res.status(200).json({
            success: true,
            message: "Order Created",
            data: newOrder
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};



// GET ALL ORDERS
const getOrders = async (req, res) => {
    try {

        const orders = await Order.find();

        res.status(200).json({
            success: true,
            data: orders
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};



// GET SINGLE ORDER
const getSingleOrder = async (req, res) => {
    try {

        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order Not Found"
            });
        }

        res.status(200).json({
            success: true,
            data: order
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};



// UPDATE ORDER
const updateOrder = async (req, res) => {
    try {

        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: "Order Updated",
            data: updatedOrder
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};



// DELETE ORDER
const deleteOrder = async (req, res) => {
    try {

        await Order.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "Order Deleted"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};



module.exports = {
    createOrder,
    getOrders,
    getSingleOrder,
    updateOrder,
    deleteOrder
};