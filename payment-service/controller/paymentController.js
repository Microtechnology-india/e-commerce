const Payment = require("../models/paymentModel");

// ------------------------
// CREATE PAYMENT
// ------------------------
exports.createPayment = async (req, res) => {
  try {
    const { userId, orderId, amount, currency, paymentMethod } = req.body;

    const payment = await Payment.create({
      userId,
      orderId,
      amount,
      currency,
      paymentMethod,
      status: "success",
      transactionId: "TXN" + Date.now(),
    });

    res.status(201).json({
      success: true,
      message: "Payment successful",
      data: payment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ------------------------
// GET PAYMENT BY ID
// ------------------------
exports.getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found",
      });
    }

    res.status(200).json({
      success: true,
      data: payment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ------------------------
// REFUND PAYMENT
// ------------------------
exports.refundPayment = async (req, res) => {
  try {
    const { transactionId } = req.body;

    const payment = await Payment.findOneAndUpdate(
      { transactionId },
      { status: "refunded" },
      { new: true }
    );

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Payment refunded",
      data: payment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};